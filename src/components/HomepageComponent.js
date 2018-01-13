'use strict';

import React from 'react';
import { withRouter } from 'react-router';

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
      'searchCoords': null,
      'searchPurpose': null
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
    if (query.purpose) {
      state.searchPurpose = query.purpose;
    }

    this.setState(state);
  }

  /**
   * Triggered when the search form is submitted
   *
   * @param {String} searchText The text in the search field input box
   * @param {String} searchPurpose The selection from the purpose field input box (may be empty)
   * @param {String} searchLocationText The text in the search location input box
   */
  handleSearch(searchText, searchPurpose, searchLocationText, searchCoords) {
    let state = {
      'searchText': null,
      'searchPurpose': null,
      'searchLocationText': null,
      'searchCoords': null
    };

    if (searchText) {
      state.searchText = searchText;
    }
    if (searchPurpose) {
      state.searchPurpose = searchPurpose;
    }
    if (searchLocationText) {
      state.searchLocationText = searchLocationText;
    }
    if (searchCoords) {
      state.searchCoords = searchCoords[0] + ',' + searchCoords[1];
    }

    if (!searchText && !searchPurpose && !searchLocationText && !searchCoords) {
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
    if (this.state.searchPurpose) {
      query.purpose = this.state.searchPurpose;
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
    if (!nextProps.location.query.purpose) {
      this.setState({
        'searchPurpose': null
      });
    }
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

    if (this.state.searchText || this.state.searchLocationText || this.state.searchPurpose) {
      return true;
    }

    return false;
  }

  render() {
    var intro = null,
      searchResults = null;

    const { t } = this.props;

    if (this.state.searchText === null &&
      this.state.searchLocationText === null &&
      this.state.searchPurpose === null) {
      intro = (
          <div>
            <div className="splash">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div className="tint">
                    <h1 className="splash__title">{t('homepage:title')}</h1>

                    <SearchForm onSearch={this.handleSearch.bind(this)} searchText={this.state.searchText} />
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
      );
    } else if (this.shouldShowSearchResults()) {
      searchResults = (
        <div className='page'>
          <SearchResults searchText={this.state.searchText}
                         searchPurpose={this.state.searchPurpose}
                         location={this.props.location}
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
