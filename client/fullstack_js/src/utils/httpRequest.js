import axios from 'axios';

const httpRequest = axios.create({
   // baseURL: process.env.REACT_APP_BASE_URL,
});

const get = async (path, option = {}) => {
   const response = await httpRequest.get(path, option);
   return response.data;
};

const post = async (path, content = {}) => {
   const response = await httpRequest.post(path, content);
   return response.data;
};

const patch = async (path, content = {}) => {
   const response = await httpRequest.patch(path, content);
   return response.data;
};

const put = async (path, content = {}) => {
   const response = await httpRequest.put(path, content);
   return response.data;
};

const deleteAPI = async (path, option = {}) => {
   const response = await httpRequest.delete(path, option);
   return response.data;
};

export { get, post, deleteAPI, patch, put };
