'use strict';

import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

class EnterpriseMapComponent extends React.Component {

  render() {
    let enterprise = this.props.enterprise;
    if (enterprise.locations == null ||
        enterprise.locations.coordinates == null ||
        enterprise.locations.coordinates.length === 0) {
      return null;
    }

    let popupMarkers = this.generatePopupMarkers(enterprise);
    let tileLayer = this.generateTileLayer();

    if (enterprise.locations.coordinates.length === 1) {
      let latLng = [enterprise.locations.coordinates[0][1], enterprise.locations.coordinates[0][0]];
      return (
        <div className="enterprisemap-component">
          <Map center={latLng} zoom={15}>
            {tileLayer}
            {popupMarkers}
          </Map>
        </div>
      );
    }

    return (
      <div className="enterprisemap-component">
        <Map bounds={this.generateAllCoords(enterprise)}>
          {tileLayer}
          {popupMarkers}
        </Map>
      </div>
    );
  }

  generateTileLayer() {
    return (
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    );
  }

  generatePopupMarkers(enterprise) {
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

    enterprise.locations.coordinates.map(coordinates => {
      let latLng = [coordinates[1], coordinates[0]];
      let coordsStr = latLng[0] + ',' + latLng[1];
      jsx.push(
        <Marker key={coordsStr} position={latLng} icon={image}>
          <Popup>
            <span>{enterprise.name}</span>
          </Popup>
        </Marker>
      );
    });
    return jsx;
  }

  generateAllCoords(enterprise) {
    let allCoords = [];
    enterprise.locations.coordinates.map(coordinates => {
      let latLng = [coordinates[1], coordinates[0]];
      allCoords.push(latLng);
    });
    return allCoords;
  }
}

EnterpriseMapComponent.displayName = 'EnterpriseMapComponent';

// Uncomment properties you need
// EnterpriseMapComponent.propTypes = {};
// EnterpriseMapComponent.defaultProps = {};

export default EnterpriseMapComponent;
