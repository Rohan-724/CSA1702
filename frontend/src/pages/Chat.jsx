import { useEffect, useRef, useState, useCallback } from "react";
import { api, formatApiErrorDetail } from "../lib/api";
import Navbar from "../components/Navbar";
import ChatMessage from "../components/ChatMessage";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Plus, Send, Trash2, MessageSquare, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const WELCOME = {
  id: "welcome",
  role: "assistant",
  created_at: new Date().toISOString(),
  content: `Hi, I'm MediSense 👋

I can help you understand your symptoms, identify possible causes, provide general self-care and OTC medication information, and help you decide what your next step should be.

I'm an educational AI assistant, not a doctor, and my medication suggestions are not prescriptions.

> ⚠️ If you're experiencing a medical emergency, contact your local emergency service or go to the nearest emergency department immediately.

Let's start — **what symptoms are you experiencing?**`,
};

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingConv, setLoadingConv] = useState(false);
  const scrollRef = useRef(null);

  const loadConversations = useCallback(async () => {
    try {
      const { data } = await api.get("/conversations");
      setConversations(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const openConversation = async (id) => {
    if (id === activeId) return;
    setLoadingConv(true);
    try {
      const { data } = await api.get(`/conversations/${id}`);
      setActiveId(id);
      setMessages(data.messages && data.messages.length ? data.messages : [WELCOME]);
    } catch (e) {
      toast.error("Could not load conversation");
    } finally {
      setLoadingConv(false);
    }
  };

  const newConversation = () => {
    setActiveId(null);
    setMessages([WELCOME]);
    setInput("");
  };

  const deleteConversation = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this conversation?")) return;
    try {
      await api.delete(`/conversations/${id}`);
      setConversations((cs) => cs.filter((c) => c.id !== id));
      if (activeId === id) newConversation();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const optimisticUser = {
      id: `tmp-${Date.now()}`,
      role: "user",
      content: text,
      created_at: new Date().toISOString(),
    };
    setMessages((m) => [...m.filter((x) => x.id !== "welcome" || activeId), optimisticUser]);
    setInput("");
    setSending(true);

    try {
      const { data } = await api.post("/chat", {
        content: text,
        conversation_id: activeId,
      });

      setMessages((m) => {
        const filtered = m.filter((x) => x.id !== optimisticUser.id && x.id !== "welcome");
        return [...filtered, data.user_message, data.assistant_message];
      });

      if (!activeId) {
        setActiveId(data.conversation_id);
      }
      loadConversations();
    } catch (e) {
      const detail = formatApiErrorDetail(e.response?.data?.detail) || e.message;
      toast.error(detail);
      setMessages((m) => m.filter((x) => x.id !== optimisticUser.id));
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto grid md:grid-cols-[280px_1fr] gap-6 px-4 md:px-6 py-6">
        {/* Sidebar */}
        <aside
          className="bg-white border border-stone-200 rounded-md p-4 flex flex-col h-[75vh] md:h-[calc(100vh-140px)]"
          data-testid="chat-sidebar"
        >
          <Button
            onClick={newConversation}
            className="bg-brand-forest hover:bg-brand-forest/90 text-brand-cream mb-4"
            data-testid="new-conversation-btn"
          >
            <Plus className="w-4 h-4 mr-2" /> New assessment
          </Button>
          <div className="text-xs tracking-[0.2em] uppercase text-brand-muted mb-2">History</div>
          <div className="flex-1 overflow-y-auto -mr-2 pr-2 space-y-1">
            {conversations.length === 0 && (
              <div className="text-sm text-brand-muted mt-4" data-testid="no-conversations">
                No past assessments yet.
              </div>
            )}
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => openConversation(c.id)}
                className={`group flex items-start gap-2 px-3 py-2 rounded-md cursor-pointer border ${
                  activeId === c.id
                    ? "bg-brand-cream border-brand-forest"
                    : "border-transparent hover:bg-stone-50"
                }`}
                data-testid={`conv-item-${c.id}`}
              >
                <MessageSquare className="w-4 h-4 text-brand-sage shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-brand-ink truncate">{c.title}</div>
                  <div className="text-[10px] text-brand-muted">
                    {new Date(c.updated_at).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={(e) => deleteConversation(c.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-brand-muted hover:text-brand-concerning transition-opacity"
                  data-testid={`conv-delete-${c.id}`}
                  aria-label="Delete conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat main */}
        <section
          className="bg-white border border-stone-200 rounded-md flex flex-col h-[75vh] md:h-[calc(100vh-140px)] overflow-hidden"
          data-testid="chat-main"
        >
          <div className="px-6 py-4 border-b border-stone-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-brand-forest flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-brand-cream" />
            </div>
            <div>
              <div className="font-heading font-semibold text-brand-ink text-sm" data-testid="chat-header-title">
                MediSense conversation
              </div>
              <div className="text-[11px] text-brand-muted">
                Educational assistant • Not a substitute for medical care
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-[#fbfaf7]"
            data-testid="chat-messages"
          >
            {loadingConv ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-brand-forest" />
              </div>
            ) : (
              messages.map((m) => <ChatMessage key={m.id} message={m} />)
            )}
            {sending && (
              <div className="flex justify-start" data-testid="typing-indicator">
                <div className="bg-white border border-stone-200 rounded-md px-4 py-3">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-stone-200 p-4 bg-white">
            <div className="flex items-end gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Describe what you're feeling..."
                className="min-h-[52px] max-h-[160px] resize-none border-stone-300 focus-visible:ring-brand-forest"
                data-testid="chat-input"
                disabled={sending}
              />
              <Button
                onClick={sendMessage}
                disabled={sending || !input.trim()}
                className="bg-brand-forest hover:bg-brand-forest/90 text-brand-cream h-[52px] px-5"
                data-testid="chat-send-btn"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-brand-muted">
              <AlertTriangle className="w-3 h-3 text-brand-concerning" />
              <span>
                MediSense is educational only and does not diagnose or prescribe. In an emergency, call your
                local emergency service.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
