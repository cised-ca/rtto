'use strict';

import React from 'react';
import { Link } from 'react-router';
import { translate } from 'react-i18next';

class SiteFooterComponent extends React.Component {
  render() {
    const {t} = this.props;

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
                <h2>{t('siteFooter:terms')}</h2>

                <Link to="/privacy">{t('siteFooter:privacyPolicy')}</Link><br/>

                {t('siteFooter:locationData')} <Link to='http://www.geonames.org/'>geonames.org</Link>


                <h2>{t('siteFooter:languageTitle')}</h2>
                <Link to={t('siteFooter:otherLanguageLink')}>{t('siteFooter:otherLanguage')}</Link><br/>
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
