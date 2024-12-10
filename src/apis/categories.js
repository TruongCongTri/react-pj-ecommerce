import axios from "axios";

const categories = {
    getData(currentPage, valuesPerPage) {
        return axios({
            method: 'get',
            url: '{{base_url}}/api/admin/categories',
            params: {
                page: currentPage,
                per_page: valuesPerPage
            }
        });
    }, 

    // getData(currentPage, valuesPerPage) {axios.get('{{base_url}}/api/admin/categories', { params: { page: currentPage, per_page: valuesPerPage} })}
    

    //path
    getSingleData(id) {
        return axios({
            method: 'get',
            url: `{{base_url}}/api/admin/categories/${id}`,
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