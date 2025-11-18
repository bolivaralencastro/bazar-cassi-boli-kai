const isClarityAvailable = () => typeof window.clarity === 'function';

export const ClarityService = {
  setCustomTag(key, value) {
    if (!isClarityAvailable()) return;
    try {
      window.clarity('set', key, String(value));
    } catch (error) {
      console.warn(`Clarity: erro ao definir tag (${key}: ${String(value)})`, error);
    }
  },

  triggerEvent(eventName) {
    if (!isClarityAvailable()) return;
    try {
      window.clarity('event', eventName);
    } catch (error) {
      console.warn(`Clarity: erro ao disparar evento (${eventName})`, error);
    }
  },

  trackEventWithTags(eventName, tagsObject) {
    if (!isClarityAvailable()) return;
    if (tagsObject) {
      Object.entries(tagsObject).forEach(([key, value]) => {
        ClarityService.setCustomTag(key, value);
      });
    }
    ClarityService.triggerEvent(eventName);
  }
};
