import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue";
import WorkInProgress from "./pages/WorkInProgress.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/work-in-progress", component: WorkInProgress },
  ],
});

export default router;
