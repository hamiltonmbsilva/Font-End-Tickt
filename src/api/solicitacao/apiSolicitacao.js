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

    // async seach(seach){
    //     var response = await apiUtils.get(`cliente/search/${seach}`);

    //     return response;
    // },

    // async seacheCodigo(codigo){
    //     var response = await apiUtils.get(`cliente/seacheCodigo/${codigo}`);

    //     return response;
    // },

    // async search(search){
    //     var response = await apiUtils.get(`voucherCliente/search/${search}`);

    //     return response;
    // }
};