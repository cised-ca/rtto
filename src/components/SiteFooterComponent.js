'use strict';

import React from 'react';
import { Link } from 'react-router';
import { translate } from 'react-i18next';

class SiteFooterComponent extends React.Component {
  render() {
    return (
      <footer className="site__footer">
        <div className="site__footer-in">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h2>Contact</h2>

                <p>
                  The Centre for Social Enterprise Development<br />
                  7 Bayview Road<br />
                  Ottawa, ON  K1Y 2C5<br />
                  <a href="mailto:team@csedottawa.ca">team@csedottawa.ca</a><br />
                  <a href="https://twitter.com/csedottawa">@csedottawa</a>
                </p>
              </div>

              <div className="col-md-4">
                <h2>Terms</h2>

                <Link to="/privacy">Privacy policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

SiteFooterComponent.displayName = 'SiteNavigationComponent';

export { SiteFooterComponent };
export default translate('siteFooter')(SiteFooterComponent);

