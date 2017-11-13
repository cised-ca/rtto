'use strict';

// Pass context to <Link>s embedded into Leaflet's <Popup>s
// see: https://stackoverflow.com/a/43594791

import React from 'react';

function withContext(WrappedComponent, context){

  class ContextProvider extends React.Component {
    getChildContext() {
      return context;
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  ContextProvider.childContextTypes = {};
  Object.keys(context).forEach(key => {
    ContextProvider.childContextTypes[key] = React.PropTypes.any.isRequired;
  });

  return ContextProvider;
}

export default withContext;

