// Minimal safe markdown renderer for chat messages.
// Escapes HTML, then applies limited formatting.

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderMarkdown(input) {
  if (!input) return "";
  let text = escapeHtml(input);

  // Code inline
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headings
  text = text.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  text = text.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  text = text.replace(/^#\s+(.+)$/gm, "<h2>$1</h2>");

  // Bold
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Italic (single *)
  text = text.replace(/(^|[\s(])\*(?!\s)([^*\n]+?)\*(?=[\s.,!?)]|$)/g, "$1<em>$2</em>");

  // Blockquotes: consecutive lines starting with "> "
  text = text.replace(/(^|\n)((?:>\s?.*(?:\n|$))+)/g, (m, p1, block) => {
    const inner = block
      .split("\n")
      .filter((l) => l.trim().length)
      .map((l) => l.replace(/^>\s?/, ""))
      .join("<br/>");
    return `${p1}<blockquote>${inner}</blockquote>`;
  });

  // Unordered lists
  text = text.replace(/(^|\n)((?:-\s.*(?:\n|$))+)/g, (m, p1, block) => {
    const items = block
      .split("\n")
      .filter((l) => /^-\s/.test(l))
      .map((l) => `<li>${l.replace(/^-\s+/, "")}</li>`)
      .join("");
    return `${p1}<ul>${items}</ul>`;
  });

  // Ordered lists
  text = text.replace(/(^|\n)((?:\d+\.\s.*(?:\n|$))+)/g, (m, p1, block) => {
    const items = block
      .split("\n")
      .filter((l) => /^\d+\.\s/.test(l))
      .map((l) => `<li>${l.replace(/^\d+\.\s+/, "")}</li>`)
      .join("");
    return `${p1}<ol>${items}</ol>`;
  });

  // Paragraphs from remaining plain lines (split by blank lines)
  const blocks = text.split(/\n{2,}/).map((b) => {
    if (/^\s*<(h2|h3|ul|ol|blockquote|p)/.test(b.trim())) return b;
    return `<p>${b.replace(/\n/g, "<br/>")}</p>`;
  });

  return blocks.join("\n");
}
