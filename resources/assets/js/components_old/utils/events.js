const emitLanguageChangeEvent = language => {
  let event = new CustomEvent("languageChanged", {
    detail: { language }
  });
  window.dispatchEvent(event);
};

export default emitLanguageChangeEvent;
