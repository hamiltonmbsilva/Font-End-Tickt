import axios from "axios"
import config from "../../config.js";
const urlApi = config.apiUrl;

axios.defaults.withCredentials = true;

export default {
    call() {
        return axios.create({})
    },

    async get(path) {
        var promise = this.call().get(`${urlApi}/${path}`)

        return await this.retorno(promise);
    },

    async post(path, data) {
        var promise = this.call().post(`${urlApi}/${path}`, data)

        return await this.retorno(promise);
    },

    async put(path, id, data) {
        var promise = this.call().put(`${urlApi}/${path}/${id}`, data);

        return await this.retorno(promise);
    },

    async deletar(path, id) {
        var promise = this.call().delete(`${urlApi}/${path}/${id}`);

        return await this.retorno(promise);
    },

    async retorno(promise) {
        return await promise
            .then(response => {
                return { error: false, data: response.data }
            })
            .catch(error => {
                return { error: true, errorMessage: error.response.data }
            });
    }
}
