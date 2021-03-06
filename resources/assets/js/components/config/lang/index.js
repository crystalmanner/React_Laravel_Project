import ar from "./ar";
import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import hr from "./hr";
import it from "./it";
import nl from "./nl";
import pt from "./pt";
import ro from "./ro";
import ru from "./ru";
import tr from "./tr";

const KEY = "SG_LANG";

const getMessages = () => {
  let selectedLanguage = localStorage.getItem(KEY);
  if (selectedLanguage === null) {
    let userLang = navigator.language || navigator.userLanguage;
    selectedLanguage = userLang.split('-')[0];
    localStorage.setItem(KEY, selectedLanguage);
    // return selectedLanguage;
  }

  switch ( selectedLanguage.toLocaleLowerCase() ) {
    case "ar":
      return ar;
    case "de":
      return de;
    case "en":
      return en;
    case "es":
      return es;
    case "fr":
      return fr;
    case "hr":
      return hr;
    case "it":
      return it;
    case "nl":
      return nl;
    case "pt":
      return pt;
    case "ro":
      return ro;
    case "ru":
      return ru;
    case "tr":
      return tr;
    default:
      return en;
  }
};

const setLanguage = language => {
  localStorage.setItem(KEY, language);
};

const getCurrentlySelectedLanguage = () => {
  return localStorage.getItem(KEY);
};

export { getMessages, setLanguage, getCurrentlySelectedLanguage };
