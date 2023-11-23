import { createRouter, createWebHistory } from "vue-router";
import TheLoginView from "../views/TheLoginView.vue";
import TheHomeView from "../views/TheHomeView.vue";

import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";

const onlyAuthUser = async (to, from, next) => {
  console.log("토큰 유효 확인");
  const memberStore = useMemberStore();
  const { userInfo, isValidToken } = storeToRefs(memberStore);
  const { getUserInfo } = memberStore;

  let token = sessionStorage.getItem("accessToken");

  if (userInfo.value != null && token) {
    await getUserInfo(token);
  }
  if (!isValidToken.value || userInfo.value === null) {
    next({ name: "login" });
  } else {
    next();
  }
};

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
      name: "home",
      component: TheHomeView,
      redirect: { name: "boardView" },
      children: [
        {
          path: "/boardView",
          name: "boardView",
          beforeEnter: onlyAuthUser,
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
          beforeEnter: onlyAuthUser,
          component: () => import("../components/mypage/MyPage.vue"),
        },
        {
          path: "/planView",
          name: "planView",
          beforeEnter: onlyAuthUser,
          component: () => import("../views/ThePlanView.vue"),
          redirect: { name: "myPlans" },
          children: [
            {
              path: "/myPlans",
              name: "myPlans",
              component: () => import("../components/myplans/MyPlans.vue"),
            },
            {
              path: "/planPage",
              name: "planPage",
              component: () => import("../components/myplans/PlanPage.vue"),
            },
          ],
        },
        {
          path: "/searchPage",
          name: "searchPage",
          beforeEnter: onlyAuthUser,
          component: () => import("../components/searchs/SearchPage.vue"),
        },
      ],
    },
  ],
});

export default router;
