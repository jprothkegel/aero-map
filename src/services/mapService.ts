import axiosInstance from "./Axios";
const baseUrl = '/map';

export const callGetMapData = (bbox: string) => {
  return axiosInstance({
    method: 'get',
    url: `${baseUrl}?limit=20&bbox=${bbox}`,
  });
};