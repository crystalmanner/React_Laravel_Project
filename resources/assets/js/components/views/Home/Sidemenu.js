import React, { Fragment } from 'react';

import flagImage from '../../assets/images/tra.png';

import SideSubmenu from './SideSubmenu';

const Sidemenu = ({
  currentLanguage,
  languages,
  menuLinks,
  isSubmenuOpen,
  canShowSubmenu,
  setLanguage,
  onMenuSelect,
  toggleSubmenu,
  toggleCanShowSubmenu,
  messages
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
              {' '}
              {messages.change_language}{' '}
              <div
                width="30px"
                className={`${currentLanguage.className} flag-image`}
                alt=""
              />
            </a>{' '}
          </div>
          {menuLinks &&
            menuLinks.map(
              menuLink =>
                messages[menuLink] ? (
                  <Fragment key={menuLink}>
                    <hr />
                    <div onClick={e => onMenuSelect(menuLink)}>
                      <a>{messages[menuLink]}</a>
                    </div>
                  </Fragment>
                ) : (
                  ''
                )
            )}
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
