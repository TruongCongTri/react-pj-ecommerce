import axios from "axios";
const { VITE_API_URL } = import.meta.env;

const token = JSON.parse(localStorage.getItem('token'));

const categories = {
    getData(currentPage, valuesPerPage) {
		return axios({
			method: 'get',
			url: `${VITE_API_URL}/api/admin/categories`,
			params: {
				page: currentPage,
				per_page: valuesPerPage,
			},
            headers: { Authorization: `Bearer ${token}` },
		});
	},
    //path
    getSingleData(id) {
        return axios({
            method: 'get',
            url: `${VITE_API_URL}/api/admin/categories/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    create(body = {}) {
		// return axios.post(`${VITE_API_URL}/api/admin/categories`, body);
        return axios({
			method: 'post',
			url: `${VITE_API_URL}/api/admin/categories`,
            body,
            headers: { Authorization: `Bearer ${token}` },
		});
	},

    update(id, body = {}) {
		// return axios.post(`${VITE_API_URL}/api/admin/categories/${id}`, body);
        return axios({
			method: 'post',
			url: `${VITE_API_URL}/api/admin/categories/${id}`,
            body,
            headers: { Authorization: `Bearer ${token}` },
		});
	},

    deleteSingleData(id) {
        return axios({
			method: 'delete',
			url: `${VITE_API_URL}/api/admin/categories/${id}`,
            headers: { Authorization: `Bearer ${token}` },
		});
    }
}


export default categories;