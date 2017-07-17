'use strict';

import React from 'react';
import { Link, withRouter } from 'react-router';

import SearchForm from './SearchFormComponent.js';
import SearchResults from './SearchResultsComponent.js';

import { translate } from 'react-i18next';

class HomepageComponent extends React.Component {
  /**
   * Before the Component is rendered, check if we have a query
   * in the URL (direct link to a search results) and set the
   * state appropriately.
   */
  componentWillMount() {
    var query = this.props.location.query;

    let state = {
      'searchText': null,
      'searchLocationText': null,
      'searchCoords': null
    };

    if (query.q) {
      state.searchText = query.q;
    }
    if (query.at) {
      state.searchCoords = query.at;
    }
    if (query.near) {
      state.searchLocationText = query.near;
    }

    this.setState(state);
  }

  /**
   * Triggered when the search form is submitted
   *
   * @param {String} searchText The text in the search field input box
   * @param {String} searchLocationText The text in the search location input box
   */
  handleSearch(searchText, searchLocationText, searchCoords) {
    let state = {
      'searchText': null,
      'searchLocationText': null,
      'searchCoords': null
    };

    if (searchText) {
      state.searchText = searchText;
    }
    if (searchLocationText) {
      state.searchLocationText = searchLocationText;
    }
    if (searchCoords) {
      state.searchCoords = searchCoords[0] + ',' + searchCoords[1];
    }

    if (!searchText && !searchLocationText && !searchCoords) {
      // There is no form data entered but they clicked search anyway.
      // Let's search for empty string.
      state.searchText = ' ';
    }

    this.setState(state, () => {
      this.finishSearch();
    });
  }

  finishSearch() {
    let query = {};
    if (this.state.searchText) {
      query.q = this.state.searchText;
    }
    if (this.state.searchCoords) {
      query.at = this.state.searchCoords;
    }
    if (this.state.searchLocationText) {
      query.near = this.state.searchLocationText;
    }

    this.props.router.push({
      'pathname': '/',
      'query': query
    });
  }

  /**
   * When this component is about to receive new props, like when the URL changes,
   * check if we still have a search query in the URL. If not, show the intro.
   */
  componentWillReceiveProps(nextProps) {
    console.log('props');
    console.log(this.props);
    console.log(nextProps);
    if (this.props.location.search && !nextProps.location.search) {
      this.setState({
        'searchText': null,
        'searchLocationText': null,
        'searchCoords': null
      });
    } else if (nextProps.searchText) {
      this.setState({
        'searchText': nextProps.searchText
      });
    }
  }

  isLocationNotFound() {
    // If we have a location but no coords, it means the location was not found.
    return this.state.searchLocationText && !this.state.searchCoords;
  }

  shouldShowSearchResults() {
    if (!this.props.config.api_root) {
      // Don't try to get search results if we haven't parsed the config file yet
      return false;
    }

    if (this.isLocationNotFound()) {
      return false;
    }

    if (this.state.searchText || this.state.searchLocationText) {
      return true;
    }

    return false;
  }

  render() {
    var intro = null,
      privacy_policy = null,
      rhok = null,
      searchResults = null,
      powered_by = null,
      apply = null;

    const { t } = this.props;
console.log(this.state);
    if (this.state.searchText === null && this.state.searchLocationText === null) {
      intro = (
          <div>
            <div className="splash">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div className="tint">
                    <h1 className="splash__title">Rise to the Occasion</h1>

                    <SearchForm onSearch={this.handleSearch.bind(this)} searchText={this.state.searchText} />
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>

            <div className="highlight">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="highlight__title">
                      <span className="fa fa-question-circle-o fa-4x" aria-hidden="true"></span>

                      <h2>What is a social enterprise?</h2>
                    </div>

                    <div className="highligh__content">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
                        leo ligula, in sagittis felis rhoncus et. Aliquam erat volutpat. In pharetra
                        sit amet quam id maximus. Suspendisse vel porta nisi.
                      </p>

                      <p className="highlight__more">
                        <Link to="/what">Read more...</Link>
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="highlight__title">
                      <span className="fa fa-map-marker fa-4x" aria-hidden="true"></span>

                      <h2>Find nearby social enterprises</h2>
                    </div>

                    <div className="highligh__content">
                      <p>
                        Ut neque ipsum,
                        interdum ut sapien commodo, feugiat facilisis augue. Nam augue odio, eleifend
                        sed est eu, accumsan suscipit tortor. Praesent convallis ut velit in vehicula.
                        Nunc enim odio, pulvinar id turpis ac, condimentum feugiat purus. Donec nisl massa,
                        consequat sed gravida et, vestibulum ac dui.
                      </p>

                      <p className="highlight__more">
                        <Link to="/nearby" title="Find nearby social enterprises">Read more...</Link>
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="highlight__title">
                      <span className="fa fa-user-circle-o fa-4x" aria-hidden="true"></span>

                      <h2>Get involved</h2>
                    </div>

                    <div className="highligh__content">
                      <p>
                        In ac auctor tortor. Nunc convallis nisi in ex venenatis, sit amet suscipit nunc
                        dignissim. Suspendisse in faucibus dui, vitae eleifend leo. Mauris efficitur odio
                        lorem, at sodales ipsum porta at. Mauris hendrerit sed massa non consectetur.
                      </p>

                      <p className="highlight__more">
                        <Link to="/get-involved" title="Get involved">Read more...</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );

      apply = (
        <p className="apply">
          {t('homepage:apply')}&nbsp;
          <Link to="/apply">{t('homepage:applyLinkText')}</Link>.
        </p>
      );

      rhok = (
        <p className="rhok">
          {t('homepage:created')}&nbsp;

          <a href='https://rhok.ca/projects/ottawa-social-enterprise-marketplace'>
            {t('homepage:rhok')}
          </a>
        </p>
      );

      powered_by = (
        <p className="powered_by">
          {t('homepage:poweredBy')}&nbsp;
          <a href="http://csedottawa.ca/">CSED</a> |&nbsp;
          <a href="http://csedottawa.ca/">{t('homepage:connectLinkText')}</a> {t('homepage:connect')}
        </p>
      );

      privacy_policy = (
        <p className='privacy-policy'>
          <Link to='/privacy'>{t('homepage:privacyPolicy')}</Link>
          | {t('homepage:locationData')}
          <Link to='http://www.geonames.org/'>geonames.org</Link>
        </p>
      );
    } else if (this.shouldShowSearchResults()) {
      searchResults = (
        <div className='page'>
          <SearchResults searchText={this.state.searchText}
                         searchLocationText={this.state.searchLocationText}
                         searchCoords={this.state.searchCoords}/>
        </div>
      );
    } else if (this.isLocationNotFound()) {
      searchResults = (
        <div className="page">
          <p>{t('homepage:locationNotFound')} "{this.state.searchLocationText}"</p>
          <p>{t('homepage:trySearchAgain')}</p>
        </div>
      );
    }

    return (
      <div className='homepage-component'>
        {intro}

        {searchResults}
      </div>
    );
  }
}

HomepageComponent.displayName = 'HomepageComponent';

export { HomepageComponent };
export default translate('homepage')(withRouter(HomepageComponent));
