import axiosdefault from 'axios';

import { errorHandler, successHandler } from './handlers';
import { API } from './types';

export const API_URL = "http://node-1.local:3000";
export const MS_API_URL = "http://node-1.local:8000/live";

const axios = axiosdefault.create({
  baseURL: API_URL,
  withCredentials: true,
});

const api: API = {
  async create({ entity, jsonData }) {
    try {
      const response = await axios.post(entity + "/create", jsonData);
      successHandler({
        response,
        options: {
          notifyOnSuccess: true,
          notifyOnFailed: true,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },
  async createAndUpload({ entity, jsonData }) {
    try {
      const response = await axios.post(entity + "/create", jsonData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successHandler({
        response,
        options: {
          notifyOnSuccess: true,
          notifyOnFailed: true,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },
  async exists({ entity, id }) {
    try {
      const response = await axios.get(entity + "/exists/" + id);
      successHandler({
        response,
        options: {
          notifyOnSuccess: false,
          notifyOnFailed: false,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },
  async read({ entity, id }) {
    try {
      const response = await axios.get(entity + "/read/" + id);
      successHandler({
        response,
        options: {
          notifyOnSuccess: false,
          notifyOnFailed: true,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },
  async update({ entity, id, jsonData }) {
    try {
      const response = await axios.patch(entity + "/update/" + id, jsonData);
      successHandler({
        response,
        options: {
          notifyOnSuccess: true,
          notifyOnFailed: true,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },
  async updateAndUpload({ entity, id, jsonData }) {
    try {
      const response = await axios.patch(entity + "/update/" + id, jsonData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successHandler({
        response,
        options: {
          notifyOnSuccess: true,
          notifyOnFailed: true,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },

  async delete({ entity, id }) {
    try {
      const response = await axios.delete(entity + "/delete/" + id);
      successHandler({
        response,
        options: {
          notifyOnSuccess: true,
          notifyOnFailed: true,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },

  async filter({ entity, options = {} }) {
    try {
      let filter = options.filter ? "filter=" + options.filter : "";
      let equal = options.equal ? "&equal=" + options.equal : "";
      let query = `?${filter}${equal}`;

      const response = await axios.get(entity + "/filter" + query);
      successHandler({
        response,
        options: {
          notifyOnSuccess: false,
          notifyOnFailed: false,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },

  async search({ entity, options = {} }) {
    try {
      let query = "?";
      for (var key in options) {
        query += key + "=" + options[key] + "&";
      }
      query = query.slice(0, -1);
      // headersInstance.cancelToken = source.token;
      const response = await axios.get(entity + "/search" + query);

      successHandler({
        response,
        options: {
          notifyOnSuccess: false,
          notifyOnFailed: false,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },

  async list({ entity, options = {} }) {
    try {
      let query = "?";
      for (const key in options) {
        query += key + "=" + options[key] + "&";
      }
      query = query.slice(0, -1);

      const response = await axios.get(entity + "/list" + query);

      successHandler({
        response,
        options: {
          notifyOnSuccess: false,
          notifyOnFailed: false,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },
  async listAll({ entity }) {
    try {
      const response = await axios.get(entity + "/listAll");

      successHandler({
        response,
        options: {
          notifyOnSuccess: false,
          notifyOnFailed: false,
        },
      });
      return response.data;
    } catch (error) {
      throw errorHandler(error);
    }
  },
  async get({ entity }) {
    try {
      const response = await axios.get(entity);
      return response.data;
    } catch (error: any) {
      throw errorHandler(error);
    }
  },
  async post({ entity, data, options = {} }) {
    try {
      const response = await axios.post(entity, data, options);
      console.log(response.headers);
      return response.data;
    } catch (error: any) {
      throw errorHandler(error);
    }
  },
  async patch({ entity, data }) {
    try {
      const response = await axios.patch(entity, data);
      successHandler({
        response,
        options: {
          notifyOnSuccess: true,
          notifyOnFailed: true,
        },
      });
      return response.data;
    } catch (error: any) {
      throw errorHandler(error);
    }
  },
};

export default api;
