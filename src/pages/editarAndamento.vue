<template>
    <div>
    <Header></Header>
        <div class="container-fluid divCadastroSolicitacao">
            <b-form @submit="onSubmit" >
                <label class="textoCadastroSolicitacao">Editar Andamento</label>
            </b-form>
        </div>
        <div class="row formDiv1">
                <div class="col-md">
                  <label class="textoCadastroSolicitacaoFiltro">Data do Andamento</label>
                    <div class=" remover-spaco"> 
                      <b-form-input
                        required             
                        class="filtroSolicitacao" 
                        type="date"
                        v-model="dataAndamento"                         
                       ></b-form-input> 
                    </div>
                </div>
                
          </div>         

          <div class="row formDiv2">
                <div class="col-md">
                  <label class="textoCadastroSolicitacaoFiltro">Correção</label>
                    <div class=" remover-spaco">
                        <b-form-textarea
                        class="filtroSolicitacao "
                        id="textarea-state"
                        v-model="text"  
                        rows="05"
                        ></b-form-textarea>                      
                    </div>
                </div>               

          </div>

          <b-col class="botaoCadastroSolicitacao">
            <b-button class="botaoCadastroSolicitacaoEnviar" @click="onSubmit" type="reset">               
                Cadastrar Solicitação
            </b-button>
          </b-col>

          <!--Inicio do Modal de Sucesso-->
    <b-modal id="modal-PopPap" ref="modalConfirmacao" size="sm" class="modalPopPap">                  
                 
      <b-col class="modalContentPopPap">
        <label class="modalContentPopPapText">Andamento Editado com Sucesso!</label> 
      </b-col>
      <template v-slot:modal-footer="{ ok }" class="footerModalPopPap">
        <b-col class="divModalBotaoContinuar" @click="ok()">
            <b-button class="modalBotaoContinuar" :to="{name: 'pageInicial'}">
              Continuar
            </b-button>                    
        </b-col>
      </template>                  
    </b-modal>
    <!--Fim do Modal de Sucesso-->

    <!--Inicio do Modal de Erro-->
    <b-modal id="modal-PopPap" ref="modalConfirmacaoErro" size="sm" class="modalPopPap">                  
                 
      <b-col class="modalContentPopPap">
        <label class="modalContentPopPapTextErro">{{mensagemErro}}</label> 
      </b-col>
      <template v-slot:modal-footer="{ ok }" class="footerModalPopPap">
        <b-col class="divModalBotaoContinuar" @click="ok()">
            <b-button class="modalBotaoContinuar" >
              Continuar
            </b-button>                    
        </b-col>
      </template>                  
    </b-modal>
    <!--Fim do Modal de Erro-->

    </div>
</template>
<script>
import Header from "../components/header";
import AndamentoClienteServe from"@/api/andamento/apiAndamento";
export default {
    mounted() {
        Header;
        this.pegarSolicitacao();
    },
    components: {
    Header    
    },

    data() {
        return {
            dataAndamento: null,
            text: null,
            mensagemErro:"",
            idAndamento:"",
            IdSolicitacao:""
        }
    },

    methods:{
        
        async onSubmit(){ 

            var andamento = {
               DataAndamento: this.dataAndamento,               
               Descricao: this.text,
               SolicitacaoId: this.IdSolicitacao
            }
            //debugger
            AndamentoClienteServe.Editar(this.idAndamento, andamento)
            .then(resposta => { 
            console.log(resposta);
            
            //Chamando o modal de Sucesso           
                this.$refs['modalConfirmacao'].show()

            })
            .catch(resposta => {
            console.log(resposta);
            //Chamando o modal de erro
            this.onReset()
            this.mensagemErro = "Não foi possivel salvar a Solicitação!"
            this.$refs['modalConfirmacaoErro'].show()
            
            })
        },

        pegarSolicitacao(){      
            this.idAndamento = this.$route.query.id;
            console.log(this.idAndamento);

            AndamentoClienteServe.getSelectId(this.idAndamento)
            .then(resposta => {        

                console.log(resposta); 

                this.IdSolicitacao = resposta.data.solicitacao.id           
                
                this.dataAndamento = this.organizarData(resposta.data.dataAndamento, true);
                this.text = resposta.data.descricao;
            })
            .catch(resposta => {
            console.log(resposta);            
            })

        },

        organizarData(d, isData) {
            var dataSplit = String(d).split("T");
            var data = dataSplit[0];
            var time = dataSplit[1];

            if (isData) {
                var ano = String(data).split("-")[0];
                var mes = String(data).split("-")[1];
                var dia = String(data).split("-")[2];

                return `${dia}/${mes}/${ano}`;
                //return `${ano}/${mes}/${dia}`;
            } else {
                var hora = String(time).split(":")[0];
                var minuto = String(time).split(":")[1];

                return `${hora}:${minuto}`;
            }
        },


    }
}
</script>

<style>
.divCadastroSolicitacao{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 5px 15px 50px #00000029;
  border-radius: 48px;
  opacity: 1;
  padding: 10px;
  margin-top: 30px;
  text-align: center;
  width: 20%;
}

.filtroSolicitacao{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 15px;
  opacity: 1;
  
}

.textoCadastroSolicitacao{
  font: bold 18px/20px Helvetica;
  letter-spacing: 0px;
  color: #3B3B3B;
  opacity: 1;
}

.textoCadastroSolicitacaoFiltro{
  font: 16px/18px Helvetica;
  letter-spacing: 0px;
  color: #525252;
  opacity: 1;
  margin-left: 10px;
}

.formDiv1{
  padding-top: 50px;
  text-align: center;
  width: 50%;
  margin: 0 auto;
}

.formDiv2{
  padding-top: 50px;
  text-align: center;
  width: 50%;
  margin: 0 auto;
}

.botaoCadastroSolicitacao{
  text-align: center;
  margin-top: 100px;
 
}

.botaoCadastroSolicitacaoEnviar{
  background: #17a2b8 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;

  font: Bold 18px/20px Helvetica;
  letter-spacing: 0px;
  color: #fff;
  opacity: 1;

  height: 50px;
}

.botaoCadastroSolicitacaoEnviar:hover{
  background: #17a2b8 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;

  font: Bold 18px/20px Helvetica;
  letter-spacing: 0px;
  color: #fff;
  opacity: 1;

  height: 50px;
}

/*-------------Configuração do modal de Sucesso--------------*/

#modal-PopPap___BV_modal_content_.modal-content{
  top: 130px !important;
  margin-left: 60px !important;
  width: 400px !important;
  height: 250px !important;

  background: #FFFFFF 0% 0% no-repeat padding-box !important;
  box-shadow: 0px 3px 6px #00000029 !important;
  border-radius: 29px !important;
  opacity: 1 !important;
}

#modal-PopPap___BV_modal_header_.modal-header{
  border-bottom: none !important;
}

.modalContentPopPapText{
  font: Bold 22px/24px Helvetica !important;
  letter-spacing: 0px !important;
  color: #14554B !important;
  opacity: 1 !important;
  text-align: center !important;
}

.modalContentPopPapTextErro{
  font: Bold 22px/24px Helvetica !important;
  letter-spacing: 0px !important;
  color: #ff0000 !important;
  opacity: 1 !important;
  text-align: center;
  margin-bottom: 30px !important;
}

#modal-PopPap___BV_modal_footer_.modal-footer{
  text-align: center !important;
  border-top: none !important;
  margin-top: -150px !important;
}

.divModalBotaoContinuar{
  margin-top: -100px !important;
}

.modalBotaoContinuar{
  background: var(--unnamed-color-14554b) 0% 0% no-repeat padding-box;
  background: #14554B 0% 0% no-repeat padding-box !important;
  border-radius: 12px !important;
  opacity: 1 !important;
  border-color: #14554B !important;

  font: Bold 20px/22px Helvetica !important;
  letter-spacing: 0px !important;
  color: #FFFFFF !important;
  opacity: 1 !important;

  height: 40px !important;

}

.modalBotaoContinuar:hover{
  background: var(--unnamed-color-14554b) 0% 0% no-repeat padding-box !important;
  background: #14554B 0% 0% no-repeat padding-box !important;
  border-radius: 12px !important;
  opacity: 1 !important;
  border-color: #14554B !important;

  font: Bold 20px/22px Helvetica !important;
  letter-spacing: 0px !important;
  color: #FFFFFF !important;
  opacity: 1 !important;

  height: 40px !important;

}

.modalBotaoContinuar .btn-secondary{
  border-color: #14554B !important;
} 
</style>