import React, { Fragment } from "react";

import flagImage from "../../../../images/tra.png";

import SideSubmenu from "./SideSubmenu";

const Sidemenu = ({
  languages,
  menuLinks,
  isSubmenuOpen,
  canShowSubmenu,
  setLanguage,
  onMenuSelect,
  toggleSubmenu,
  toggleCanShowSubmenu
}) => {
  return (
    <Fragment>
      <div
        id="smallMenu"
        className="small-menu"
        onMouseEnter={toggleCanShowSubmenu}
        onMouseLeave={toggleCanShowSubmenu}
      >
        <div className="arrow-up" />
        <div className="testmenu">
          <div onClick={toggleSubmenu}>
            <a className="select-language">
              {" "}
              Change language <img width="30px" className="bg-en" alt="" />
            </a>{" "}
          </div>
          {menuLinks &&
            menuLinks.map(menuLink => (
              <Fragment key={menuLink}>
                <hr />
                <div onClick={e => onMenuSelect(menuLink)}>
                  <a>{menuLink}</a>
                </div>
              </Fragment>
            ))}
        </div>
        <SideSubmenu
          languages={languages}
          flagImage={flagImage}
          isOpen={isSubmenuOpen}
          canOpen={canShowSubmenu}
          setLanguage={setLanguage}
        />
      </div>
    </Fragment>
  );
};

export default Sidemenu;
