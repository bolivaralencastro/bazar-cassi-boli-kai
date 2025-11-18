export function showUserMessage(element, message, isError = true) {
  if (!element) return;
  element.innerHTML = message;
  if (isError) {
    element.classList.add('error-container');
  }
}
