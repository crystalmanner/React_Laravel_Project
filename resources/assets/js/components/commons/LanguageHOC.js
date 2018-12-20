import React, { PureComponent } from "react";

import { getMessages, setLanguage } from "../config/lang";

const localize = WrappedComponent => {
  return class extends PureComponent {
    constructor() {
      super();

      this.state = {
        messages: getMessages()
      };
    }

    componentDidMount() {
      window.addEventListener(
        "languageChanged",
        e => {
          setLanguage(e.detail.language);
          this.setState({ messages: getMessages() });
        },
        false
      );
    }

    render() {
      return (
        <WrappedComponent messages={this.state.messages} {...this.props} />
      );
    }
  };
};

export default localize;
