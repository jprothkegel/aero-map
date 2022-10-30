import {callGetMapData} from '../services/mapService';
import osmtogeojson from 'osmtogeojson';

export const getAndParseMapData = async (bbox: string, limit: number) => {
  const { data } = await callGetMapData(bbox);
  const jsonData = osmtogeojson(data);
  const filteredArray = jsonData.features.filter((feature) => {
    if (feature.properties) {
      if ('name' in feature.properties && feature.geometry.type === 'Point') {
        return feature?.properties?.name.length > 0;
      }
    }
  });
  return filteredArray.slice(0, limit);
};

export const errorMapper = (limit: number) => {
  if (!limit || limit <= 0)
    throw new Error('Limit must be between 1 and 100');
  else if (limit > 100) throw new Error('Limit is maximum 100');
  else if (isNaN(limit)) throw new Error('Limit must be a number');
}
