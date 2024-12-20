import axios from "axios";
const { VITE_API_URL } = import.meta.env;

const customers = {
  getData() {
    return axios({
      method: "get",
      url: `${VITE_API_URL}/api/admin/customers`,
    });
  },
  //path
  view(id) {
    return axios({
      method: "get",
      url: `${VITE_API_URL}/api/admin/customers/${id}`,
    });
  },

  //create new data
  create(body = {}) {
    return axios.post(`${VITE_API_URL}/api/admin/customers`, body);
  },

  //update a data
  update(id, body = {}) {
    return axios.post(`${VITE_API_URL}/api/admin/customers/${id}`, body);
  },

  //path
  delete(id) {
    return axios({
      method: "delete",
      url: `{{base_url}}/api/admin/customers/${id}`,
    });
  },
};

export default customers;
