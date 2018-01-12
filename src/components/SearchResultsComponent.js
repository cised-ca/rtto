'use strict';

import React from 'react';
import EnterpriseSummary from './EnterpriseSummaryComponent';
import SearchResultsMap from './SearchResultsMapComponent';
import Loading from './LoadingComponent';

import { withRouter } from 'react-router';
import ReactPaginate from 'react-paginate';

import { translate } from 'react-i18next';
import i18n from 'i18next';

class SearchResultsComponent extends React.Component {
  /**
   * Set the default state
   */
  constructor(props) {
    super(props);

    this.state = {
      searchResults: null
    };
  }

  /**
   * Called by React after the initial render.
   */
  componentDidMount() {
    let loc = this.props.location,
      pageNumber;

    if ( loc ) {
      pageNumber = loc.query.page || 1;
    }

    this.search(this.context.config.api_root,
                this.props.searchText,
                this.props.searchLocationText,
                this.props.searchCoords,
                pageNumber);
  }

  /**
   * Called before receiving new props
   *
   * Ex: when the user performs a new search
   */
  componentWillReceiveProps(nextProps, nextContext) {
    let newSearchText = nextProps.searchText,
      newLocationText = nextProps.searchLocationText,
      newSearchCoords = nextProps.searchCoords,
      newPageNumber = nextProps.location.query.page,
      currentSearchText = this.props.searchText,
      currentSearchCoords = this.props.searchCoords,
      currentPageNumber = this.props.location.query.page,
      newApiRoot = nextContext.config.api_root,
      currentApiRoot = this.context.config.api_root;

    let doSearch = false;

    if (!currentApiRoot && newApiRoot) {
      // This part enables us to hit URLs directly in our browser like:
      //    http://.../directory
      // or http://.../?q=food
      // and still kick off a search instead of being stuck "loading..."
      doSearch = true;
    }

    if (newPageNumber !== currentPageNumber) {
      doSearch = true;
    }

    if (newSearchText || newSearchCoords) {
      if (newSearchText !== currentSearchText
          || newSearchCoords !== currentSearchCoords
          || newApiRoot !== currentApiRoot) {
        doSearch = true;
      }
    }

    if (doSearch) {
      this.search(newApiRoot, newSearchText, newLocationText, newSearchCoords, newPageNumber);
    }
  }

  /**
   * Triggered when changing pages
   */
  handlePageClick(data) {
    // react-paginate uses zero-based index for the pages (starts at page 0)
    // We use 1-based index (start at page 1). Add "1" to whatever the library gives us
    var selected = data.selected + 1;

    var query = {};
    var pathname = '/';

    if (this.state.searchText) {
      query.q = this.state.searchText;
    }

    if (this.state.searchCoords) {
      query.at = this.state.searchCoords;
    }

    if (this.state.searchLocationText) {
      query.near = this.state.searchLocationText;
    }

    query.page = selected;

    if (this.props.location.pathname) {
      pathname = this.props.location.pathname;
    }

    // Updating the URL will trigger a new search
    this.props.router.push({
      pathname: pathname,
      query: query
    });
  }

  /**
   * Fetch the search results from backend
   */
  search(apiRoot, searchText, searchLocationText, coords, page) {
    var component = this,
      endpoint;

    if (!apiRoot) {
      return (<Loading />);
    }

    // If pagination is undefined, return the first page of results
    if (!page) {
      page = 1;
    }

    endpoint = apiRoot + '/directory?lang=' + i18n.language + '&page=' + page + '&offset=0';
    if (searchText) {
      endpoint += '&q=' + searchText;
    }
    if (coords) {
      endpoint += '&at=' + coords;
    }

    fetch(endpoint)
      .then(function(response) {
        if (response.ok) {
          return response.json().then(function(json) {
            component.setState({
              searchResults: json,
              searchText: searchText,
              searchCoords: coords,
              searchLocationText: searchLocationText
            });
            window.scrollTo(0, 25);
          });
        }

        throw new Error('Network error while performing search');
      })
      .catch(function(error) {
        component.context.logger.notify(error);
      });
  }

  render() {
    const { t } = this.props;

    var component = this,
      jsx = [],
      results = component.state.searchResults,
      enterprises = [],
      pagination = null,
      initialPage,
      pageTitle = null,
      map = [];

    // We haven't received results from the backend yet
    if (!results) {
      return (
        <div className='searchresults-component container'>
          <Loading />
        </div>
      );
    }

    initialPage = this.state.searchResults.page - 1;
    enterprises = results.enterprises;

    // If we have no results, show a "no results" message
    if (enterprises.length === 0) {
      jsx.push(
        <li key='no-results' className='search-result'>
          {t('searchResults:noResults')}
        </li>
      );
    } else {
      if (this.state.searchLocationText) {
        map.push(
          <h2 key='results near label'>
            {t('searchResults:resultsNear')} "{this.state.searchLocationText}":
          </h2>
        );
      }
      map.push(<SearchResultsMap key='mapComponent'
                searchCoords={component.state.searchCoords}
                enterprises={enterprises}/>);
    }

    // Build list of enterprises
    enterprises.map(function(enterprise) {
      jsx.push(
        <li key={enterprise.id} className='search-result'>
          <EnterpriseSummary enterprise={enterprise} />
        </li>
      );
    });

    // Don't show pagination if we only have 1 page
    if (this.state.searchResults.pages > 1) {
      pagination = (
        <div className="pagination-container">
          <ReactPaginate breakClassName={'break-me'}
                       nextLabel={t('searchResults:next')}
                       previousLabel={t('searchResults:previous')}
                       pageCount={this.state.searchResults.pages}
                       initialPage={initialPage}
                       forcePage={initialPage}
                       disableInitialCallback={true}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick.bind(this)}
                       containerClassName={'pagination'}
                       subContainerClassName={'pages pagination'} />
        </div>
      );
    }

    if (this.props.searchText && this.props.searchText.trim()) {
      pageTitle = <h2>{t('searchResults:searchResults')}: "{this.props.searchText}"</h2>;
    }

    return (
      <div className='searchresults-component container'>
        {pageTitle}

        {map}

        <ol key='search-results' className='search-results fade-in'>
          {jsx}
        </ol>

        {pagination}
      </div>
    );
  }
}

SearchResultsComponent.displayName = 'SearchResultsComponent';

SearchResultsComponent.contextTypes = {
  'config': React.PropTypes.object,
  'logger': React.PropTypes.object
};

export { SearchResultsComponent };
export default translate('searchResults')(withRouter(SearchResultsComponent));
