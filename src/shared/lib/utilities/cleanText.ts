export const cleanText = (html: string) => {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s*\[\+\d+\s+chars\]\s*/g, '')
    .replace(/…+/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
};
