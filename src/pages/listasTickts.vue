<template>
    <div>
        <Header></Header>
        
        <!--Botão para cadastrar ir para nova tela-->
        <b-button class="p-3 mt-5 ml-4 mb-4 solitacao-botao" variant="success" :to="{name: 'cadastrarSolicitacao'}">
            Cadastrar nova Solicitação
        </b-button>

         <div class="lista">
      <b-table
        responsive
        :items="solitacoes"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        class="mt-4"
      >

      <template v-slot:cell(operacao)="row">
        <b-button size="sm" @click="Editar(solitacoes, row.item, row.index, $event.target)" class="botaoEditar">        
          Editar
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


    </div>    
</template>

<script>
import SolicitacaoClienteServe from "@/api/solicitacao/apiSolicitacao";
import Header from "../components/header";
export default {   
    components: {
    Header    
    },
    data() {
        return {
          solitacoes: [],
          fields: [
        
        {
          key: "solicitante",
          label: "Nome do Solicitante",
          sortable: true,
          tdClass: "tabela-td-nome",
        },
        {
          key: "dataCadastro",
          label: "Data de Cadastro",
          tdClass: "tabela-td-titulo",
        },
        {
          key: "textoSolicitacao",
          label: "Texto Informado",
          tdClass: "tabela-td-texto",
        },
        {
          key: "quantSolicitacao",
          label: "Quant. Andamentos",
          tdClass: "tabela-td-status",
        },
        {
          key: "status",
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
      // items,

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
      return this.solitacoes.length;
    },
    lists() {
      return this.solitacoes.length;
    },
    sortOptions() {
      //Criação das opções de lista
      return this.fields.map((f) => {
        return { text: f.label, value: f.key };
      });
    },
  },

  mounted() {
    Header;
    this.listar();    
  }, 

  methods: {
      listar() {
          //debugger;getAllSelectSolicitados
      //SolicitacaoClienteServe.getAllSelect()
      SolicitacaoClienteServe.getAllSelectSolicitados()
        .then((resposta) => {
          resposta.data.forEach((element) => {
              //debugger
              console.log(element) 
              element.dataCadastro = this.organizarData(element.dataCadastro, true);

              if (element.status == 0) {
              element.status = "Aberto";
            } else if (element.status == 1) {
              element.status = "Fechado";
            }        
          });

          this.solitacoes = resposta.data;
         
        })
        .catch((resposta) => {
          console.log(resposta);
        });
    },

    Editar(index, item){
      var id = item.id

      this.$router.replace({
        path: "/editarSolicitacao?id=" + id
      });
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


  }, 
        
}
</script>
<style >
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
</style>