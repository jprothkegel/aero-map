import { Request, Response } from 'express';
import { errorMapper, getAndParseMapData } from '../helpers';

export const getMapData = async (req: Request, res: Response) => {
  try {
    const bbox = req.query.bbox;
    const limit = Number(req.query.limit);

    errorMapper(limit);
    const mapData = await getAndParseMapData(bbox as string, limit);

    res.status(200).json({
      featureData: mapData,
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
