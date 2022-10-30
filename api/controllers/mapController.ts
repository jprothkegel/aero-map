import { callGetMapData } from '../services/mapService';
import { Request, Response } from 'express';
import osmtogeojson from 'osmtogeojson';

export const getMapData = async (req: Request, res: Response) => {
  try {
    const bbox = req.query.bbox;
    const limit = Number(req.query.limit);
    if (!limit || limit <= 0)
      throw new Error('Limit must be between 1 and 100');
    else if (limit > 100) throw new Error('Limit is maximum 100');
    else if (isNaN(limit)) throw new Error('Limit must be a number');
    const { data } = await callGetMapData(bbox as string);
    const jsonData = osmtogeojson(data);
    const filteredArray = jsonData.features.filter((feature) => {
      if (feature.properties) {
        if ('name' in feature?.properties && feature.geometry.type === 'Point')
          return feature?.properties?.name.length > 0;
      }
    });
    const limitedArray = filteredArray.slice(0, limit);
    res.status(200).json({
      featureData: limitedArray,
    });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    res.status(500).json({
      message: `Something went wrong: ${message}`,
    });
  }
};
