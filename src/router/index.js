import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue"
import MyPageView from "../views/MyPageView.vue";

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
      // 마이 페이지
      path: "/mypage",
      name: "mypage",
      component: MyPageView,
    },
    {
      path: "/home",
      name: "Home",
      component: HomeView,
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
