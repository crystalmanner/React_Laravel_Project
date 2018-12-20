import React from "react";

const SideSubmenu = ({
  isOpen,
  canOpen,
  flagImage,
  languages,
  setLanguage
}) => {
  function onLanguageSelect(language) {
    setLanguage(language);
  }

  return (
    <div
      className="menuContent"
      style={{ display: canOpen && isOpen ? "block" : "none" }}
    >
      <p>Select your prefered language:</p>
      <ul className="languages">
        {languages &&
          languages.map(language => (
            <li
              className="language"
              title={language.title}
              onClick={() => onLanguageSelect(language)}
              key={language.title}
            >
              <a title={language.title}>
                <div>
                  <img
                    className={language.className}
                    src={flagImage}
                    alt={language.title}
                  />
                  {language.title}
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SideSubmenu;
