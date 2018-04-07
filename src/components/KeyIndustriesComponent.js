'use strict';

import React from 'react';
import { Link } from 'react-router';

import { translate } from 'react-i18next';

class KeyIndustriesComponent extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="key-industries-component">
        <h1>{t('keyIndustries:keyIndustries')}</h1>
        <div className="row">
          <div className="col-md-6">
            <ul>
              <li><Link to={'/?q=' + t('keyIndustries:eventManagement')}>{t('keyIndustries:eventManagement')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:eventSpace')}>{t('keyIndustries:eventSpace')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:eventWorkshops')}>{t('keyIndustries:eventWorkshops')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:emptyBottlePickup')}>{t('keyIndustries:emptyBottlePickup')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:eventCatering')}>{t('keyIndustries:eventCatering')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:digitalVideoProduction')}>{t('keyIndustries:digitalVideoProduction')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:conferenceBags')}>{t('keyIndustries:conferenceBags')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:eventGifts')}>{t('keyIndustries:eventGifts')}</Link></li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul>
              <li><Link to={'/?q=' + t('keyIndustries:eventPlanning')}>{t('keyIndustries:eventPlanning')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:interiorExteriorVenueMaintenance')}>{t('keyIndustries:interiorExteriorVenueMaintenance')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:interpretationServices')}>{t('keyIndustries:interpretationServices')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:eventDecor')}>{t('keyIndustries:eventDecor')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:internet')}>{t('keyIndustries:internet')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:recycling')}>{t('keyIndustries:recycling')}</Link></li>
              <li><Link to={'/?q=' + t('keyIndustries:printing')}>{t('keyIndustries:printing')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

KeyIndustriesComponent.displayName = 'KeyIndustriesComponent';

// Uncomment properties you need
// BannerComponent.propTypes = {};
// BannerComponent.defaultProps = {};

export { KeyIndustriesComponent };
export default translate('keyIndustries')(KeyIndustriesComponent);
