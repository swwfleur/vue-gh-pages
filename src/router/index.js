import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/FrontView.vue"),
    children: [
      {
        path: "products",
        name: "Products",
        component: () => import("../views/ProductsView.vue"),
      },
      {
        path: "product/:id", //單一產品
        name: "Product",
        component: () => import("../views/ProductView.vue"),
      },
      {
        path: "cart",
        name: "Cart",
        component: () => import("../views/CartView.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("../views/Login.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/DashboardView.vue"),
    children: [
      {
        path: "products",
        component: () => import("../views/AdminProducts.vue"),
      },
      {
        path: "order",
        component: () => import("../views/AdminOrder.vue"),
      },
      {
        path: "coupon",
        name: "Coupon",
        component: () => import("../views/CouponView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
