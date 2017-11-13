'use strict';

import React from 'react';

import SearchResults from './SearchResultsComponent';
import Back from './BackComponent';

class DirectoryComponent extends React.Component {
  render() {
    return (
      <div className="directory-component page">
        <div className="container">
          <Back />

          <SearchResults location={this.props.location} searchText="" />
        </div>
      </div>
    );
  }
}

DirectoryComponent.displayName = 'DirectoryComponent';

export default DirectoryComponent;
