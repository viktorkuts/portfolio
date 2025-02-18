import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/home.vue";
import About from "@/views/about.vue";
import Blog from "@/views/blog.vue";
import BlogForm from "@/views/blog-form.vue";
import Admin from "@/views/admin.vue";
import UserRegister from "@/views/user-register.vue";
import TestimonialAdd from "@/views/testimonial-add.vue";
import TestimonialList from "@/views/testimonial-list.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  { path: "/blog", name: "blog", component: Blog },
  { path: "/blog/add", name: "blog-create", component: BlogForm },
  { path: "/admin", name: "admin", component: Admin },
  { path: "/register", name: "user register", component: UserRegister },
  {
    path: "/submit-testimonial",
    name: "submit testimonial",
    component: TestimonialAdd,
  },
  {
    path: "/list-testimonials",
    name: "list testimonials",
    component: TestimonialList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
