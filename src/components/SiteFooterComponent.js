'use strict';

import React from 'react';

import { translate } from 'react-i18next';

class SiteNavigationComponent extends React.Component {
  render() {
    return (
      <footer className="site__footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Contact</h2>

              <p>
                111 Wellington St,<br />
                Ottawa, ON<br />
                K1A 0A9
              </p>

              <p>613-555-1212</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

SiteNavigationComponent.displayName = 'SiteNavigationComponent';

export { SiteNavigationComponent };
export default translate('siteNavigation')(SiteNavigationComponent);

