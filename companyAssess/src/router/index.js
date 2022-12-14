import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/login",
      name:'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:()=>import("../views/LoginView.vue"),
    },
    {
      path:"/register",
      name:"register",
      component:()=>import("../views/RegisterView.vue")
    },
    {
      path:"/content",
      name:"content",
      component:()=>import("../views/ContentView.vue"),
      children:[
        {
          path:"homepage",
          component:()=>import("../components/HomePage.vue")
        },
        {
          path:'assestment',
          component:()=>import("../components/AssessObjGrid.vue")
        },
        {
          path:"manage",
          component:()=>import("../components/manage.vue")
        }
      ]
    },
    {
      path:"/result",
      component:()=>import("../components/result.vue")
    }
  ],
});

export default router;
