import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomePage from "../views/HomePage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 로그인 화면
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "Home",
      component: HomePage,
      redirect: { name: "boardList" },
      children: [
        {
          path: "/boardList",
          name: "boardList",
          component: () => import("../views/BoardView.vue"),
        },
      ],
    },
  ],
});

export default router;
