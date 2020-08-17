import apiUtils from "../apiUtils";

export default {  

    async getAllSelectId(id){
        //debugger
        var response = await apiUtils.get(`andamento/getAll/${id}`);

        return response;
    },

    async getSelectId(id){
        //debugger
        var response = await apiUtils.get(`andamento/${id}`);

        return response;
    },
    

    async Salvar(andamento){
        //debugger
        var response = await apiUtils.post(`andamento`, andamento);

        return response;
    },

    async Excluir(id){
        //debugger
        var response = await apiUtils.deletar(`andamento`, id);

        return response;
    },

    async Editar(id,andamento){
        //debugger
        var response = await apiUtils.put(`andamento`, id, andamento);

        return response;
    },
    
};