<template>
    <div>
    <Header></Header>
        <div class="container-fluid divCadastroSolicitacao">           
                <label class="textoCadastroSolicitacao">Editar Solicitações</label>            
        </div>        

        <div class="row formDiv1">
                <div class="col-md">
                  <label class="textoCadastroSolicitacaoFiltro">Nome do Solicitacao</label>
                    <div class=" remover-spaco"> 
                      <b-form-input
                        required             
                        class="filtroSolicitacao" 
                        type="text"
                        v-model="nomeSolicitacao" 
                        placeholder="Ex:Teste"  
                       ></b-form-input> 
                    </div>
                </div>
                
          </div>         

          <div class="row formDiv2">
                <div class="col-md">
                  <label class="textoCadastroSolicitacaoFiltro">Problema Ocorrido</label>
                    <div class=" remover-spaco">
                        <b-form-textarea
                        class="filtroSolicitacao "
                        id="textarea-state"
                        v-model="text"  
                        rows="5"
                        ></b-form-textarea>                      
                    </div>
                </div>               

          </div>

          <b-col class="botaoCadastroSolicitacao">
            <b-button class="botaoCadastroSolicitacaoEnviar" @click="onSubmit" type="reset">               
                Editar Solicitação
            </b-button>
          </b-col>

          <br>

            <div class="container-fluid divCadastroSolicitacao">
                <label class="textoCadastroSolicitacao">Andamentos do Chamados</label>
            </div> 

            <b-button class="p-3 mt-5 ml-4 mb-4 solitacao-botao" variant="success" @click="SalvarAndamento()">
                Cadastrar novo Andamento
            </b-button>   

          <div class="lista">
            <b-table
                responsive
                :items="andamentos"
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage"
                class="mt-4"
            >

            <template v-slot:cell(operacao)="row">
                <b-button size="sm" @click="Editar(andamentos, row.item, row.index, $event.target)" class="botaoEditar">        
                Editar
                </b-button>
                <b-button size="sm" @click="Excluir(andamentos, row.item, row.index, $event.target)" class="botaoExcluir">        
                Excluir
                </b-button>          
            </template>
                
            </b-table>

            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
                align="center"
            ></b-pagination>
            </div>

          <!--Inicio do Modal de Sucesso-->
    <b-modal id="modal-PopPap" ref="modalConfirmacao" size="sm" class="modalPopPap">                  
                 
      <b-col class="modalContentPopPap">
        <label class="modalContentPopPapText">{{mensagemSucesso}}</label> 
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
            <b-button class="modalBotaoContinuar">
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
import SolicitacaoClienteServe from "@/api/solicitacao/apiSolicitacao";
import AndamentoClienteServe from"@/api/andamento/apiAndamento";

export default {
    mounted() {
        Header;
        this.pegarSolicitacao();
        this.listar(); 
    },
    components: {       
        
        Header , 
    },

    data() {
        return {
            andamentos:[],
            nomeSolicitacao:"",
            text:"",
            idsolicitacao:"",
            mensagemErro:"",
            mensagemSucesso:"",

            fields: [        
                {
                key: "solicitacao.solicitante",
                label: "Nome do Solicitante",
                sortable: true,
                tdClass: "tabela-td-nome",
                },
                {
                key: "dataAndamento",
                label: "Data do Andamento",
                tdClass: "tabela-td-titulo",
                },
                {
                key: "descricao",
                label: "Texto Informado",
                tdClass: "tabela-td-texto",
                },               
                {
                key: "solicitacao.status",
                label: "Status",
                tdClass: "tabela-td-status",
                },
                {
                key: "operacao",
                label: "operacao",          
                tdClass: "tabela-td-oprecao",
                thClass: "tabela-th-oprecao"
                },
            ],        

            sortBy: "",
            sortDesc: false,
            sortDirection: "asc",
            perPage: 20,
            currentPage: 1,
            perPageList: 5,
            currentPageList: 1,
        };
            
    },

    computed: {
        rows() {
        return this.andamentos.length;
        },
        lists() {
        return this.andamentos.length;
        },
        sortOptions() {
        //Criação das opções de lista
        return this.fields.map((f) => {
            return { text: f.label, value: f.key };
        });
        },
    },

    methods: {
        listar() {
            var id = this.idsolicitacao;
            AndamentoClienteServe.getAllSelectId(id)
            .then((resposta) => {
            resposta.data.forEach((element) => {
                //debugger
                console.log(element) 

                element.dataAndamento = this.organizarData(element.dataAndamento, true);

                if (element.solicitacao.status == 0) {
                element.solicitacao.status = "Aberto";
                } else if (element.solicitacao.status == 1) {
                element.solicitacao.status = "Fechado";
                }        
            });

            this.andamentos = resposta.data;
            
            })
            .catch((resposta) => {
            console.log(resposta);
            });
        },

        pegarSolicitacao(){      
            this.idsolicitacao = this.$route.query.id;
            console.log(this.idsolicitacao);

            SolicitacaoClienteServe.getIdSelect(this.idsolicitacao)
            .then(resposta => {        

                console.log(resposta);            
                
                this.nomeSolicitacao = resposta.data.solicitante;
                this.text = resposta.data.textoSolicitacao;
            })
            .catch(resposta => {
            console.log(resposta);            
            })

        },

        async onSubmit(){            
            
            if( this.nomeSolicitacao === null && this.text === null){
            //Chamando o modal de erro
                this.mensagemErro = "Não foi selecionado nenhum campo!"
                this.$refs['modalConfirmacaoErro'].show()
                return;
            }  

            var dataAtual = new Date();
             

            var solicitacao = {
               Solicitante: this.nomeSolicitacao,
               DataCadastro: dataAtual.getFullYear()+'-'+(dataAtual.getMonth()+1)+'-'+dataAtual.getDate(),
               Status: 0,
               TextoSolicitacao: this.text
            }          

            //debugger
            SolicitacaoClienteServe.Editar(this.idsolicitacao, solicitacao)
            .then(resposta => { 
            console.log(resposta); 
                if(resposta.error === true){
                    this.mensagemErro = "Não foi possivel salvar a Solicitação!"
                    this.$refs['modalConfirmacaoErro'].show()
                    return;
                }           
            //Chamando o modal de Sucesso
                this.mensagemSucesso = "Foi editado com sucesso"            
                this.$refs['modalConfirmacao'].show()

            })
            .catch(resposta => {
            console.log(resposta);
            //Chamando o modal de erro
            
            this.mensagemErro = "Não foi possivel salvar a Solicitação!"
            this.$refs['modalConfirmacaoErro'].show()
            
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
            } else {
                var hora = String(time).split(":")[0];
                var minuto = String(time).split(":")[1];

                return `${hora}:${minuto}`;
            }
        },

        Editar(index, item){            
            var id = item.id
            this.$router.replace({
                path: "/editarAndamento?id=" + id
            });
        },

        Excluir(index, item){
            var id = item.id;
               console.log(id); 
             AndamentoClienteServe.Excluir(id)
             .then(resposta => { 
                console.log(resposta);
                if(resposta.error === true){
                    this.mensagemErro = "Não foi possivel salvar a Solicitação!"
                    this.$refs['modalConfirmacaoErro'].show()
                    return;
                }
                //Chamando o modal de Sucesso 
                this.mensagemSucesso = "O andamento foi excluido com Sucesso";         
                this.$refs['modalConfirmacao'].show()

                })
            .catch(resposta => {
                console.log(resposta);

                //Chamando o modal de erro                
                this.mensagemErro = "Não foi possivel salvar a Solicitação!"
                this.$refs['modalConfirmacaoErro'].show()
            
            }) 
        },

        SalvarAndamento(){         

          this.$router.replace({
            path: "/cadastrarAndamento?id=" + this.idsolicitacao
          });
        },



    },


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
  margin-top: 50px;
 
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
.table {
  border-collapse: separate;
  border-spacing: 20px;
}

.table > thead > tr > th {
  font: bold 16px/20px Helvetica;
  color: #3b3b3b;
  border: none;
  padding-bottom: 05px;
}

.table > tbody {
  margin-top: 20px;
}

.table > tbody > tr {
  background-color: #3b3b3b00;
  border: none;
  box-shadow: 5px 15px 50px #00000029;
  border-radius: 15px;
  padding-top: 10px;
  height: 60px;
}

.table td {
  border-top: none;
}

.tabela-td-texto{
    width: 600px !important;
}

.tabela-td-oprecao{
    width: 300px;
}

.solitacao-botao {
  width: 250px !important;
  height: 50px !important;
  padding: 10px !important;

  border: 4px solid  !important;
  background: #59AA72 0% 0% no-repeat padding-box !important;
  
  border-radius: 17px !important;
  opacity: 1 !important;

  margin-top: 50px !important;
  margin-right: 50px !important;

  float: right !important;

  border-color:#59AA72 !important;

}

.solitacao-botao:hover { 
  background: #59AA72 !important;  
  
  border-color:#59AA72 !important;
}


.botaoEditar{
  background: #17a2b8 0% 0% no-repeat padding-box !important;
  box-shadow: 0px 3px 6px #00000029 !important;
  border-radius: 14px !important;
  opacity: 1 !important;

  margin-right: 20px !important;

  font: Bold 16px/18px Helvetica !important;
  letter-spacing: 0px !important;
  color: #fff !important;
  opacity: 1 !important;

  height: 40px !important;
  width: 110px !important;
}

.botaoEditar:hover{
  background: #17a2b8 0% 0% no-repeat padding-box !important;  
  color: #fff !important;  
}

.botaoExcluir{
  background: #F0351E 0% 0% no-repeat padding-box !important;
  box-shadow: 0px 3px 6px #00000029 !important;
  border-radius: 14px !important;
  opacity: 1 !important;

  margin-right: 20px !important;

  font: Bold 16px/18px Helvetica !important;
  letter-spacing: 0px !important;
  color: #fff !important;
  opacity: 1 !important;

  height: 40px !important;
  width: 110px !important;
}

.botaoExcluir:hover{
  background: #F0351E 0% 0% no-repeat padding-box !important;  
  color: #fff !important;  
}

.solitacao-botao {
  width: 250px !important;
  height: 50px !important;
  padding: 10px !important;

  border: 4px solid  !important;
  background: #59AA72 0% 0% no-repeat padding-box !important;
  
  border-radius: 17px !important;
  opacity: 1 !important;

  margin-top: 50px !important;
  margin-right: 50px !important;

  float: right !important;

  border-color:#59AA72 !important;

}

.solitacao-botao:hover { 
  background: #59AA72 !important;  
  
  border-color:#59AA72 !important;
}

</style>