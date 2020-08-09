import axios from 'axios';

axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

interface ArgumentTypes {
  method: any;
  path?: string;
  data?: any;
  url?: string;
  headers?: object;
  params?: object;
}

export async function callApi(args: ArgumentTypes): Promise<any[]> {
  const { method, path, data, url, headers, params } = args;
  const baseURL = url || process.env.REACT_APP_API_URL;

  const res = await axios({
    url: path,
    method,
    data: JSON.stringify(data),
    baseURL,
    headers,
    params,
  });
  return res.data;
}
