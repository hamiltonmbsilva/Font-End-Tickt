<template>
    <div>
    <Header></Header>
        <div class="container-fluid divCadastroEmpresa">
            <b-form @submit="onSubmit" >
                <label class="textoCadastroEmpresa">Cadastrar Solicitações</label>
            </b-form>
        </div>        
    </div>
</template>
<script>
import Header from "../components/header";
export default {
    mounted() {
    Header;
    },
    components: {
    Header    
    },
}
</script>