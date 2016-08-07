'use strict';

import React from 'react';
import EnterpriseSummary from './EnterpriseSummaryComponent.js';

class SearchResultsComponent extends React.Component {
  componentDidMount() {
    var search_results = document.querySelector('.js-search-results');

    // If this is a direct link to a search, don't fade, just show
    if (this.props.directSearch === true) {
      search_results.classList.remove('hidden');
    } else {
      window.setTimeout(function() {
        search_results.classList.add('fade-in');
        search_results.classList.remove('hidden');
      }, 1000);
    }
  }

  render() {
    var _this = this,
      directory = _this.props.directory,
      query = _this.props.searchText,
      lunr_index = _this.props.lunr_index,
      jsx = [],
      enterprises = [],
      searchIsReady = (lunr_index !== null && directory.length !== 0);

    /*
     * If we search for nothing, return everything.
     * In this case we don't need to check "searchIsReady" since we just
     * return the entire directory
     */
    if (query === '') {
      enterprises = directory;
    } else if (searchIsReady) {
      enterprises = lunr_index.search(query).map(function(result) {
        return directory.filter(function(enterprise) {
          return enterprise.id === result.ref;
        })[0];
      });
    }

    // If we have no results, show a "no results" message
    if (enterprises.length === 0) {
      // TODO: This string should be translatable
      jsx.push(<li key='no-results' className='search-result'>No results.</li>);
    }

    enterprises.map(function(enterprise, index) {
      jsx.push(
        <li key={index} className='search-result'>
          <EnterpriseSummary enterprise={enterprise} />
        </li>
      );
    });

    return (
      <ol className='search-results js-search-results searchresults-component page hidden'>
        {jsx}
      </ol>
    );
  }
}

SearchResultsComponent.displayName = 'SearchResultsComponent';

// Uncomment properties you need
// SearchResultsComponent.propTypes = {};
// SearchResultsComponent.defaultProps = {};

export default SearchResultsComponent;
