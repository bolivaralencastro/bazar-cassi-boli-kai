export function getWhatsAppBaseUrl() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile ? 'https://wa.me/' : 'https://web.whatsapp.com/send?phone=';
}
