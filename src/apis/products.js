import axios from "axios";
const { VITE_API_URL } = import.meta.env;

const products = {
    getData(currentPage, valuesPerPage) {
		return axios({
			method: 'get',
			url: `${VITE_API_URL}/api/admin/products`,
			params: {
				page: currentPage,
				per_page: valuesPerPage,
			},
		});
	},

    //path
    getSingleData(id) {
        return axios({
            method: 'get',
            url: `${VITE_API_URL}/api/admin/products/${id}`,
        });
    },
    
    //create new data
    // body
    create(body = {}) {
		return axios.post(`${VITE_API_URL}/api/admin/products`, body);
	},
    
    //update a data 
    //path
    putSingleData(id) {
        return axios({
            method: 'put',
            url: `{{base_url}}/api/admin/products/${id}`,
        });
    },

    //path
    deleteSingleData(id) {
        return axios({
            method: 'delete',
            url: `{{base_url}}/api/admin/products/${id}`,
        });
    }
}


export default products;