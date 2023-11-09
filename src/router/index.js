import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
      redirect: { name: "boardList" },
      children: [
        {
          path: "boardList",
          name: "boardList",
          component: () => import("../components/boards/TheBoardView.vue"),
        },
      ],
    },
  ],
});

export default router;
