const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"), //use the template called MainLayout
    children: [
      { path: "/", component: () => import("pages/IndexPage.vue") },
      { path: "login", component: () => import("src/pages/loginPage.vue") },
      {
        path: "change_avatar",
        component: () => import("pages/change_avatar.vue"),
      },
      {
        path: "bank_a_reward_code",
        component: () => import("pages/bank_a_reward_code.vue"),
        meta: { transitionx: "slide-up" },
      },
      {
        path: "lucky_spinner",
        component: () => import("pages/lucky_spinner.vue"),
      },
      { path: "rewards", component: () => import("pages/_rewards.vue") },
      { path: "messages", component: () => import("pages/_messages.vue") },
      {
        path: "change_password",
        component: () => import("pages/change_password.vue"),
      },
      { path: "log_out", component: () => import("pages/log_out.vue") },
      {
        path: "reward_events",
        component: () => import("src/pages/reward_events.vue"),
      },
      {
        // fallback page
        path: "/:pathMatch(.*)*",
        component: () => {
          import("pages/IndexPage.vue");
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
