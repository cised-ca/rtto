'use strict';

import React from 'react';

import { translate } from 'react-i18next';

import Back from './BackComponent';

class AboutPageComponent extends React.Component {
  render() {

    return (
      <div className="page placeholderpage-component container">
        <Back />

        <h2>About the Directory</h2>

        <p>TODO</p>
      </div>
    );
  }
}

AboutPageComponent.displayName = 'AboutPageComponent';

export { AboutPageComponent };
export default translate('placeholder')(AboutPageComponent);
