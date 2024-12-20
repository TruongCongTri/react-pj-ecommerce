import axios from "axios";
const { VITE_API_URL } = import.meta.env;

const categories = {
    getData(currentPage, valuesPerPage) {
		return axios({
			method: 'get',
			url: `${VITE_API_URL}/api/admin/categories`,
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
            url: `${VITE_API_URL}/api/admin/categories/${id}`,
        });
    },
    
    //create new data
    // body
    postSingleData() {
        return axios({
            method: 'post',
            url: '{{base_url}}/api/admin/categories',
            headers: {}, 
            data: {
              name: 'name', // This is the body part
              description: 'desc',
              image: 'link'
            }
          });
    },

    create(body = {}) {
		return axios.post(`${VITE_API_URL}/api/admin/categories`, body);
	},
    update(id, body = {}) {
		return axios.post(`${VITE_API_URL}/api/admin/categories/${id}`, body);
	},
    //update a data 
    //path
    putSingleData(id) {
        return axios({
            method: 'put',
            url: `{{base_url}}/api/admin/categories/${id}`,
        });
    },

    //path
    deleteSingleData(id) {
        return axios({
            method: 'delete',
            url: `{{base_url}}/api/admin/categories/${id}`,
        });
    }
}


export default categories;