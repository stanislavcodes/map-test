import axios, { AxiosResponse } from 'axios';

export const get = async <Response>(url: string): Promise<Response> => {
  try {
    const response: AxiosResponse<Response> = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`GET request to ${url} failed`);
  }
};

export const post = async <Payload, Response>(
  url: string,
  body: Payload,
): Promise<Response> => {
  try {
    const response: AxiosResponse<Response> = await axios.post(url, body);
    return response.data;
  } catch (error) {
    throw new Error(`POST request to ${url} failed`);
  }
};

export const patch = async <Payload, Response>(
  url: string,
  body: Payload,
): Promise<Response> => {
  try {
    const response: AxiosResponse<Response> = await axios.patch(url, body);
    return response.data;
  } catch (error) {
    throw new Error(`PATCH request to ${url} failed`);
  }
};

export const del = async <Response>(url: string): Promise<Response> => {
  try {
    const response: AxiosResponse<Response> = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(`DELETE request to ${url} failed`);
  }
};
