import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        name: 'pageInicial',
        path: "/",
        component: () => import("./pages/listasTickts.vue"),
        meta: {
          rule: "public",
        },
      },
      {
        name: 'cadastrarSolicitacao',
        path: "/cadastrar",
        component: () => import("./pages/cadastrarSolicitacao.vue"),
        meta: {
          rule: "public",
        },

      },
      {
        name: 'editarSolicitacao',
        path: "/editar",
        component: () => import("./pages/editarSolicitacao.vue"),
        meta: {
          rule: "public",
        },
      },

      {
        name: 'editarAndamento',
        path: "/editarAndamento",
        component: () => import("./pages/editarAndamento.vue"),
        meta: {
          rule: "public",
        },
      },

      {
        name: 'cadastrarAndamento',
        path: "/cadastrarAndamento",
        component: () => import("./pages/cadastrarAndamento.vue"),
        meta: {
          rule: "public",
        },
      },
  
    ]       
  });

  export default router;