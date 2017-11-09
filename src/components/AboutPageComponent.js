'use strict';

import React from 'react';

import { translate } from 'react-i18next';

import Back from './BackComponent';

class AboutPageComponent extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="page aboutpage-component container">
        <Back />

        <h2>{t('about:aboutTheDirectoryHeading')}</h2>
        <p>{t('about:aboutTheDirectoryBody')}</p>

        <h2>{t('about:whatIsSocialEnterpriseHeading')}</h2>
        <p>{t('about:whatIsSocialEnterpriseBody')} <i>({t('about:province')})</i></p>

        <h2>{t('about:whyHeading')}</h2>
        <p>{t('about:whyBody')}</p>

        <h2>{t('about:partnersInvolvedHeading')}</h2>

        <div className="aboutpage-partners">
          <ul>
          <li>
            <h4>Just Add Salt Communications (Salt)</h4>
            <p>{t('about:partnersSalt')}</p>
          </li>

          <li>
            <h4>Chad & Stéphane</h4>
            <p>{t('about:partnersChad')}</p>
            <p>{t('about:partnersStephane')}</p>
          </li>

          <li>
            <h4>mécènESS</h4>
          </li>

          <li>
            <h4>{t('about:partnersParoName')}</h4>
            <p>{t('about:partnersParo')}</p>
          </li>

          <li>
            <h4>Pillar Nonprofit Network</h4>
            <p>{t('about:partnersPillar')}</p>
          </li>

          <li>
            <h4>Social Purchasing Project</h4>
          </li>
          </ul>
        </div>

        <h2>{t('about:contactHeading')}</h2>
        <p>{t('about:contactBody')}</p>
        <p>The Centre for Social Enterprise Development<br/>
        7 Bayview Road<br/>
        Ottawa, ON  K1Y 2C5<br/>
        <a href="mailto:team@csedottawa.ca">team@csedottawa.ca</a><br/>
        <a href="https://twitter.com/csedottawa">@csedottawa</a><br/>
        </p>
      </div>
    );
  }
}

AboutPageComponent.displayName = 'AboutPageComponent';

export { AboutPageComponent };
export default translate('about')(AboutPageComponent);
