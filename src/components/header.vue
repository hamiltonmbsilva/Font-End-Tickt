<template>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand :to="{name: 'pageInicial'}">Tickts</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :to="{name: 'cadastrarSolicitacao'}">Cadastrar Tickts</b-nav-item>        
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form class="mr-4">
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Pesquisar</b-button>
                </b-nav-form>        

                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em>User</em>
                </template>
                <b-dropdown-item href="#">Usuario</b-dropdown-item>
                <b-dropdown-item href="#">Sair</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        
    </div>
</template>
<script>
export default {
    name: "Header",
}
</script>

<style>
    
</style>