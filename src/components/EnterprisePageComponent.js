'use strict';

import React from 'react';
import i18n from 'i18next';

import Enterprise from './EnterpriseComponent';
import Loading from './LoadingComponent';

var slug = require('slug/slug-browser');
slug.defaults.mode = 'rfc3986';

class EnterprisePageComponent extends React.Component {
  /**
   * Set the default state
   */
  constructor(props) {
    super(props);

    this.state = {
      enterprise: null
    };
  }

  componentDidMount() {
    if (this.context.config.api_root) {
      this.fetchEnterprise(this.context.config.api_root);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newApiRoot = nextContext.config.api_root,
      currentApiRoot = this.context.config.api_root;

    if (newApiRoot !== currentApiRoot) {
      this.fetchEnterprise(newApiRoot);
    }
  }

  fetchEnterprise(apiRoot) {
    if (!apiRoot) {
      return;
    }

    let component = this,
      url  = apiRoot + '/enterprise/' + this.props.params.id + '?lang=' + i18n.language;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          Promise.reject(response.statusCode);
        }
      })
      .then(json => {
        component.setState({
          enterprise: json
        });
      })
      .catch(err => {
        // TODO: Handle error
        // eslint-disable-next-line no-console
        console.log('GOT ERROR fetching url ' + url + ' : ' + err);
      });
  }

  render() {
    var enterprise = this.state.enterprise,
      jsx = null;

    if (!this.state.enterprise) {
      jsx = <Loading />;
    } else {
      jsx = <Enterprise enterprise={enterprise} />;
    }

    return (
      <div className="enterprisepage-component page container">
        {jsx}
      </div>
    );
  }
}

EnterprisePageComponent.displayName = 'EnterprisePageComponent';

EnterprisePageComponent.contextTypes = {
  'config': React.PropTypes.object,
  'logger': React.PropTypes.object
};

export default EnterprisePageComponent;
