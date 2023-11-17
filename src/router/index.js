import { createRouter, createWebHistory } from "vue-router";
import TheLoginView from "../views/TheLoginView.vue";
import TheHomeView from "../views/TheHomeView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 로그인 화면
      path: "/",
      name: "login",
      component: TheLoginView,
    },
    {
      path: "/home",
      name: "Home",
      component: TheHomeView,
      redirect: { name: "boardView" },
      children: [
        {
          path: "/boardView",
          name: "boardView",
          component: () => import("../views/TheBoardView.vue"),
          redirect: { name: "boardPage" },
          children: [
            {
              path: "/boardPage",
              name: "boardPage",
              component: () => import("../components/boards/BoardPage.vue"),
            },
            {
              path: "/boardRegister",
              name: "boardRegister",
              component: () =>
                import("../components/boards/BoardRegisterPage.vue"),
            },
          ],
        },
        {
          path: "/myPage",
          name: "myPage",
          component: () => import("../components/mypage/MyPage.vue"),
        },
        {
          path: "/myPlans",
          name: "myPlans",
          component: () => import("../components/myplans/MyPlans.vue"),
        },
        {
          path: "/searchPage",
          name: "searchPage",
          component: () => import("../components/searchs/SearchPage.vue"),
        },
      ],
    },
  ],
});

export default router;
