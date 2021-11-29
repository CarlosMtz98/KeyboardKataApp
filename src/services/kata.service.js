import config from "../config";
import axios from 'axios'

export const kataService = {
    getRandom
};

function getRandom(type) {
    return axios
      .get(`${config.api.baseURL}/users/login`)
      .then(response => {
          console.log(response.data)
        if (response.data) {

        }

        return response.data;
      });
  }
