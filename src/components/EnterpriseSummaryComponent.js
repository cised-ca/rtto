'use strict';

import React from 'react';
import { Link } from 'react-router';

import { translate } from 'react-i18next';

var slug = require('slug/slug-browser');
slug.defaults.mode = 'rfc3986';

class EnterpriseSummaryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logoError: false
    };
  }

  onError() {
    this.setState({
      logoError: true
    });
  }

  render() {
    const { t } = this.props;

    var enterprise = this.props.enterprise,
      enterpriseDescription = enterprise.short_description,
      enterpriseLogo = null,
      enterpriseLink = <Link to={'/enterprise/' + enterprise.id + '/' + slug(enterprise.name)}>{enterprise.name}</Link>,
      moreInfo = (
          <div className="enterprise__website">
            <Link to={'/enterprise/' + enterprise.id}>{t('enterpriseSummary:moreInfo')}</Link>
          </div>
      );

    if (this.props.linkto === 'external') {
      enterpriseLink = <a href={enterprise.website}>{enterprise.name}</a>;
      enterpriseDescription = enterprise.description;
      moreInfo = null;
    }

    if (!this.state.logoError) {
      enterpriseLogo = (
        <img onError={this.onError.bind(this)}
          src={this.context.config.api_root + '/enterprise/' + enterprise.id + '/logo'}
          alt={enterprise.name + ' logo'} title={enterprise.name + ' logo'} />
      );
    }

    return (
      <div className="enterprise-summary enterprisesummary-component">
        <div className="enterprise__logo">
          {enterpriseLogo}
        </div>
        <div className="enterprise__details">
          <h2 className="enterprise__title">
            {enterpriseLink}
          </h2>
          <div className="enterprise__description">{enterpriseDescription}</div>
          {moreInfo}

          {this.props.children}
        </div>
      </div>
    );
  }
}

EnterpriseSummaryComponent.displayName = 'EnterpriseSummaryComponent';

EnterpriseSummaryComponent.contextTypes = {
  'config': React.PropTypes.object
};

export { EnterpriseSummaryComponent };
export default translate('enterpriseSummary')(EnterpriseSummaryComponent);
