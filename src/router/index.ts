import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "cover",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Cover/Cover.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Home/Home.vue"),
  },
  {
    path: "/PdfViewer",
    name: "PdfViewer",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/PdfViewer/PdfViewer.vue"),
  },
  {
    path: "/VideoViewer",
    name: "VideoViewer",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/VideoViewer/VideoViewer.vue"
      ),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
