import axios from 'axios';
const baseUrl = 'https://www.openstreetmap.org/api/0.6/map';

export const callGetMapData = (bbox: string) => {
  return axios({
    method: 'get',
    url: `${baseUrl}?bbox=${bbox}`,
  });
};
