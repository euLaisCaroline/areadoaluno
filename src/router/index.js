import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/pages/Login";
import Area from "@/pages/Area";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/area",
    name: "Area",
    component: Area,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
