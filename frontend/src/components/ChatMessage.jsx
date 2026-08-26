import { renderMarkdown } from "../lib/markdown";
import { AlertTriangle } from "lucide-react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const content = message.content || "";
  const isEmergency = !isUser && /##\s*⚠️\s*EMERGENCY/i.test(content);
  const time = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isUser) {
    return (
      <div className="flex justify-end" data-testid={`msg-user-${message.id}`}>
        <div className="max-w-[85%]">
          <div className="bg-brand-sage text-white rounded-md rounded-tr-sm px-4 py-3 shadow-sm">
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{content}</p>
          </div>
          <div className="text-[10px] text-brand-muted mt-1 text-right">{time}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start" data-testid={`msg-ai-${message.id}`}>
      <div className="max-w-[92%] w-full">
        <div
          className={`bg-white border rounded-md px-5 py-4 ${
            isEmergency
              ? "border-brand-concerning/50 ring-2 ring-brand-concerning/20"
              : "border-stone-200"
          }`}
          data-testid={isEmergency ? "emergency-alert" : undefined}
        >
          {isEmergency && (
            <div className="flex items-center gap-2 text-brand-concerning font-heading font-semibold mb-3 pb-3 border-b border-brand-concerning/20">
              <AlertTriangle className="w-5 h-5" />
              <span>Possible medical emergency</span>
            </div>
          )}
          <div
            className="md-content text-brand-ink text-[15px]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </div>
        <div className="text-[10px] text-brand-muted mt-1">MediSense • {time}</div>
      </div>
    </div>
  );
}
