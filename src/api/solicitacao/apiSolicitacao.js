import apiUtils from "../apiUtils";

export default {  

    async getAllSelect(){
        //debugger
        var response = await apiUtils.get(`solicitacao`);

        return response;
    },

    async getAllSelectSolicitados(){
        //debugger
        var response = await apiUtils.get(`solicitacao/solicitados`);

        return response;
    },

    async Salvar(solicitacao){
        //debugger
        var response = await apiUtils.post(`solicitacao`, solicitacao);

        return response;
    },

    async getIdSelect(id){
        //debugger
        var response = await apiUtils.get(`solicitacao/${id}`);

        return response;
    },

    async Editar(id,solicitacao){
        //debugger
        var response = await apiUtils.put(`solicitacao`, id, solicitacao);

        return response;
    },
    
};