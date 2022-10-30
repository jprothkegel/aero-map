import React from 'react';
import { MapContainer, TileLayer, Tooltip } from 'react-leaflet';
import { useMapStore } from '../../store/useMapStore';
import { SearchField } from '../SearchField';
import { BoundControl } from '../BoundControl';
import { LatLngExpression } from 'leaflet';
import { GeoJsonWithUpdates } from '../GeoJsonWithUpdates';
import { Loader } from '../Loader';

export const Map = () => {
  const { featureData, status } = useMapStore((state) => ({
    featureData: state.mapData.featureData,
    status: state.mapStatus,
  }));

  const berlinCenter: LatLngExpression = [52.520008, 13.404954];

  return (
    <MapContainer className="map" center={berlinCenter} zoom={15}>
      <SearchField />
      {status === 'loading' && <Loader />}
      <BoundControl />
      {featureData.length > 0 &&
        featureData.map((feature, index) => (
          <GeoJsonWithUpdates key={index} data={feature}>
            <Tooltip data-cy="tooltip">{feature?.properties?.name}</Tooltip>
          </GeoJsonWithUpdates>
        ))}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};
