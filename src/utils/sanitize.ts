/**
 * A utility to sanitize user input by escaping potentially dangerous HTML characters.
 * This prevents basic Cross-Site Scripting (XSS) attacks by converting special characters
 * to their corresponding HTML entities.
 */
export const sanitizeInput = (input: string | null | undefined): string => {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};
