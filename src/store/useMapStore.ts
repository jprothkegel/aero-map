import create from 'zustand';
import { callGetMapData } from '../services/mapService';
import { GeoJSON } from 'react-leaflet';

interface MapState {
  mapData: {
    featureData: GeoJSON.Feature[];
  };
  mapStatus: string;
  getMapData: (bbox: string) => void;
}

export const useMapStore = create<MapState>((set) => ({
  mapData: {
    featureData: [],
  },
  mapStatus: 'idle',
  getMapData: async (bbox: string) => {
    set({ mapStatus: 'loading' });
    console.log(bbox, 'bbox');
    const response = await callGetMapData(bbox);
    set({
      mapData: response.data,
      mapStatus: 'succeeded',
    });
  },
}));
