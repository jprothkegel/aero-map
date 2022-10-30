import { useMap } from 'react-leaflet';
import { useMapStore } from '../../store/useMapStore';
import { useRef } from 'react';
import debounce from 'lodash.debounce';

export const BoundControl = () => {
  const map = useMap();
  const { getMapData } = useMapStore((state) => ({
    getMapData: state.getMapData,
  }));
  const debouncedFetch = useRef(
    debounce(
      () =>
        getMapData(
          `${map.getBounds().getWest()},${map.getBounds().getSouth()},${map
            .getBounds()
            .getEast()},${map.getBounds().getNorth()}`,
        ),
      250,
      { leading: true },
    ),
  ).current;

  map.on('moveend', () => {
    if (map.getZoom() >= 17) {
      debouncedFetch();
    }
  });
  return null;
};
