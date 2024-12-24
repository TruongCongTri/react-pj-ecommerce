import axios from "axios";
const { VITE_API_URL } = import.meta.env;

const token = JSON.parse(localStorage.getItem('token'));

const products = {
    getData(currentPage, valuesPerPage) {
		return axios({
			method: 'get',
			url: `${VITE_API_URL}/api/admin/products`,
            // url: `https://learning.sonthanh.net.vn/api/products`,
			params: {
				page: currentPage,  
				per_page: valuesPerPage,
			},
            headers: { Authorization: `Bearer ${token}` },
		});
	},

    //path
    getSingleData(id) {
        // return axios.get(`${VITE_API_URL}/api/admin/products/${id}`);
        return axios({
			method: 'get',
			url: `${VITE_API_URL}/api/admin/products/${id}`,
            headers: { Authorization: `Bearer ${token}` },
		});
    },
    
    //create new data
    // body
    create(body = {}) {
		// return axios.post(`${VITE_API_URL}/api/admin/products`, body);
        return axios({
			method: 'post',
			url: `${VITE_API_URL}/api/admin/products`,
            body,
            headers: { Authorization: `Bearer ${token}` },
		});
	},
    //update a data 
    update(id, body = {}) {
		// return axios.post(`${VITE_API_URL}/api/admin/products/${id}`, body);
        return axios({
			method: 'post',
			url: `${VITE_API_URL}/api/admin/products/${id}`,
            body,
            headers: { Authorization: `Bearer ${token}` },
		});
	},
    
    delete(id) {
        // return axios.delete(`${VITE_API_URL}/api/admin/products/${id}`);
        return axios({
			method: 'delete',
			url: `${VITE_API_URL}/api/admin/products/${id}`,
            headers: { Authorization: `Bearer ${token}` },
		});
    }
}


export default products;