'use strict';

import React from 'react';
import { Link } from 'react-router';

import { translate } from 'react-i18next';

class SiteNavigationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationDisambiguation: null,
      searchText: null,
      searchLocationText: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      searchText: this.refs.searchTextInput.value
    }, this.handleSearch);
  }

  handleSearch() {
    this.props.onSearch(this.state.searchText);
  }

  render() {
    const {t} = this.props;

    var searchText = '';

    if (this.props.searchText) {
      searchText = this.props.searchText;
    }

    return (
      <header className="header sitenavigation-component">
        <nav className="navbar site__nav">
          <div className="container-fluid">
            <div className="navbar-header">
               <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="nav__link navbar-brand" to="/">
                <span className="fa fa-home" aria-hidden="true"></span>
                <span className="sr-only">{t('siteNavigation:home')}</span>
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active">
                  <Link to="/about">{t('siteNavigation:about')}</Link>
                </li>
                <li className="active">
                  <a href={t('siteNavigation:brochureLink')}>Brochure</a>
                </li>
                <li className="active">
                  <a href="https://goo.gl/forms/nfArxz3Iq3yMOSxp1">{t('siteNavigation:register')}</a>
                </li>
              </ul>
              <form className="navbar-form navbar-right" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <input type="text" className="form-control query" placeholder={t('siteNavigation:search')}
                    ref="searchTextInput" defaultValue={searchText} />
                </div>
                <button type="submit" className="btn btn-default search-form__button">{t('siteNavigation:search')}</button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

SiteNavigationComponent.displayName = 'SiteNavigationComponent';

// Uncomment properties you need
// SiteNavigationComponent.propTypes = {};
// SiteNavigationComponent.defaultProps = {};

export { SiteNavigationComponent };
export default translate('siteNavigation')(SiteNavigationComponent);
