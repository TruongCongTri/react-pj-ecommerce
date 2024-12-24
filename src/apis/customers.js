import axios from "axios";
const { VITE_API_URL } = import.meta.env;

const token = JSON.parse(localStorage.getItem("token"));

const customers = {
  getData(currentPage, valuesPerPage) {
    return axios({
      method: "get",
      url: `${VITE_API_URL}/api/admin/customers`,
      params: {
        page: currentPage,
        per_page: valuesPerPage,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  view(id) {
    return axios({
      method: "get",
      url: `${VITE_API_URL}/api/admin/customers/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  //create new data
  create(body = {}) {
    // return axios.post(`${VITE_API_URL}/api/admin/customers`, body);
    return axios({
      method: "post",
      url: `${VITE_API_URL}/api/admin/customers`,
      body,
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  //update a data
  update(id, body = {}) {
    // return axios.post(`${VITE_API_URL}/api/admin/customers/${id}`, body);
    return axios({
      method: "post",
      url: `${VITE_API_URL}/api/admin/customers/${id}`,
      body,
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  //path
  delete(id) {
    return axios({
      method: "delete",
      url: `{{base_url}}/api/admin/customers/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default customers;
