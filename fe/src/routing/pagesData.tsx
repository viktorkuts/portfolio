import { routerType } from "@/types/router.types";
import { Home } from "@/pages/home/home";
import { HomeRenderer } from "@/pages/home/homerenderer";
import { Contact } from "@/pages/contact/contact";
import { AuthHandler } from "@/pages/auth/authhandler";
import { ProfileRegister } from "@/pages/forms/profileregister";
import { AdminDashboard } from "@/pages/admin/admindashboard";
import { TestimonialForm } from "@/pages/forms/testimonialform";

const pagesData: routerType[] = [
  {
    title: "Home",
    path: "/",
    element: (
      <Home>
        <HomeRenderer />
      </Home>
    ),
  },
  {
    title: "Contact",
    path: "/contact",
    element: (
      <Home>
        <Contact />
      </Home>
    ),
  },
  {
    title: "Auth",
    path: "/auth",
    element: <AuthHandler />,
  },
  {
    title: "Register",
    path: "/profile-registration",
    element: (
      <Home>
        <ProfileRegister />
      </Home>
    ),
  },
  {
    title: "Admin",
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    title: "Testimonial",
    path: "/testimonial",
    element: (
      <Home>
        <TestimonialForm />
      </Home>
    ),
  },
];

export default pagesData;
