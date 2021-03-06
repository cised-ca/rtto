'use strict';

import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router';

import Leaflet from 'leaflet';

import withContext from './withContext';

var slug = require('slug/slug-browser');
slug.defaults.mode = 'rfc3986';

class SearchResultsMapComponent extends React.Component {

  enterpriseHasCoords(enterprise) {
    if (enterprise.locations == null ||
        enterprise.locations.coordinates == null ||
        enterprise.locations.coordinates.length === 0) {
      return false;
    }
    return true;
  }

  renderSearchNearCoords(tileLayer, popupMarkers) {
    // get search coords in lat/long order
    let coords = this.props.searchCoords.split(',').map(parseFloat);
    let latLng = [coords[1], coords[0]];
    return (
      <div className="searchresultsmap-component">
        <Map center={latLng} zoom={11}>
          {tileLayer}
          {popupMarkers}
        </Map>
      </div>
    );
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    let enterprises = this.props.enterprises;
    let allCoords = this.generateCoords(enterprises);
    let popupMarkers = this.generatePopupMarkers(enterprises);
    let tileLayer = this.generateTileLayer();

    if (allCoords == null || allCoords.length == 0) {
      return null;
    }

    if (this.props.searchCoords) {
      return this.renderSearchNearCoords(tileLayer, popupMarkers);
    }

    if (allCoords.length === 1) {
      return (
        <div className="searchresultsmap-component">
          <Map center={allCoords[0]} zoom={15}>
            {tileLayer}
            {popupMarkers}
          </Map>
        </div>
      );
    }

    return (
      <div className="searchresultsmap-component">
        <Map bounds={allCoords}>
          {tileLayer}
          {popupMarkers}
        </Map>
      </div>
    );
  }

  generateCoords(enterprises) {
    let allCoords = [];
    enterprises.map(enterprise => {
      if (!this.enterpriseHasCoords(enterprise)) {
        return;
      }
      enterprise.locations.coordinates.map(coordinates => {
        let latLng = [coordinates[1], coordinates[0]];
        allCoords.push(latLng);
      });
    });
    return allCoords;
  }

  generateTileLayer() {
    return (
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    );
  }

  generatePopupMarkers(enterprises) {
    let jsx = [];

    const image = new Leaflet.Icon({
      iconUrl: require('../extlib/leaflet/images/marker-icon.png'),
      shadowUrl: require('../extlib/leaflet/images/marker-shadow.png'),
      iconSize: [25, 41],
      shadowSize: [41, 41],
      iconAnchor: [12, 41],
      shadowAnchor: [12, 41],
      popupAnchor: [0, -41]
    });

    enterprises.map(enterprise => {
      if (!this.enterpriseHasCoords(enterprise)) {
        return;
      }

      let enterpriseRoute = '/enterprise/' + enterprise.id + '/' + slug(enterprise.name);
      let LinkWithContext = withContext(Link, this.context);

      enterprise.locations.coordinates.map(coordinates => {
        let latLng = [coordinates[1], coordinates[0]];

        jsx.push(
          <Marker key={enterprise.name + latLng.toString()} position={latLng} icon={image}>
            <Popup>
              <span><LinkWithContext to={enterpriseRoute}>{enterprise.name}</LinkWithContext></span>
            </Popup>
          </Marker>
        );
      });
    });
    return jsx;
  }
}

SearchResultsMapComponent.displayName = 'SearchResultsMapComponent';

// Uncomment properties you need
// SearchResultsMapComponent.propTypes = {};
// SearchResultsMapComponent.defaultProps = {};

export default SearchResultsMapComponent;
