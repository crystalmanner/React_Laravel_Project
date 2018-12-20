import WebFont from "webfontloader";

/**
 * Load self-hosted fonts through APIs.
 *
 * @returns {void}
 */
const loadFonts = () => {
  WebFont.load({
    google: {
      families: [
        "Varela Round:300,400,700",
        "Raleway",
        "Open Sans",
        "sans-serif"
      ]
    }
  });
};

export default loadFonts;
