import Vue from "vue";
import Router from "vue-router";

import RouterComponent from "./components/RouterComponent.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "start" */ "./views/main/Start.vue"),
      children: [
        {
          path: "register",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("./views/Register.vue"),
        },
        {
          path: "login",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("./views/Login.vue"),
        },
        {
          path: "recover-password",
          component: () => import("./views/PasswordRecovery.vue"),
        },
        {
          path: "reset-password",
          component: () => import("./views/ResetPassword.vue"),
        },
        {
          path: "main",
          component: () => import("./views/main/Main.vue"),
          children: [
            {
              path: "dashboard",
              component: () => import("./views/main/Dashboard.vue"),
            },
            {
              path: "profile",
              component: RouterComponent,
              redirect: "profile/view",
              children: [
                {
                  path: "view",
                  component: () =>
                    import("./views/main/profile/UserProfile.vue"),
                },
                {
                  path: "edit",
                  component: () =>
                    import("./views/main/profile/UserProfileEdit.vue"),
                },
                {
                  path: "password",
                  component: () =>
                    import("./views/main/profile/UserProfileEditPassword.vue"),
                },
              ],
            },
            {
              path: "investments",
              redirect: "investments/all",
            },
            {
              path: "investments/all",
              component: () => import("./views/main/Investments.vue"),
            },
            {
              path: "investments/:id",
              name: "main-investments-invest",
              component: () => import("./views/main/Invest.vue"),
            },
            {
              path: "wallet/top-up",
              component: () => import("./views/main/TopUp.vue"),
            },
            {
              path: "admin",
              component: () => import("./views/main/admin/Admin.vue"),
              redirect: "admin/users/all",
              children: [
                {
                  path: "users",
                  redirect: "users/all",
                },
                {
                  path: "users/all",
                  component: () => import("./views/main/admin/AdminUsers.vue"),
                },
                {
                  path: "users/edit/:id",
                  name: "main-admin-users-edit",
                  component: () => import("./views/main/admin/EditUser.vue"),
                },
                {
                  path: "investments",
                  redirect: "investments/all",
                },
                {
                  path: "investments/all",
                  component: () => import("./views/main/admin/AdminInvestments.vue"),
                },
                {
                  path: "investments/create",
                  name: "main-admin-investments-create",
                  component: () =>
                    import("./views/main/admin/CreateInvestment.vue"),
                },
                // {
                //   path: "investments/edit/:id",
                //   name: "main-admin-investments-edit",
                //   component: () =>
                //     import("./views/main/admin/EditInvestment.vue"),
                // },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/*",
      redirect: "/",
    },
  ],
});
