export function buildWhatsAppLink(number: string | undefined, message: string) {
  const digits = (number || '').replace(/[^\d]/g, '');
  const encoded = encodeURIComponent(message);
  return digits ? `https://wa.me/${digits}?text=${encoded}` : '#';
}
