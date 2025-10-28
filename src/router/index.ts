import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import DashboardView from "../views/DashboardView.vue";
import TicketsView from "../views/TicketsView.vue";
import { getSession } from "../composables/useAuth";

const routes = [
  { path: "/", name: "Home", component: LandingView },
  { path: "/auth/login", name: "Login", component: LoginView },
  { path: "/auth/signup", name: "Signup", component: SignupView },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: TicketsView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Auth guard syncs perfectly with React’s ProtectedRoute
router.beforeEach((to, _, next) => {
  const requires = to.meta.requiresAuth;
  const session = getSession();
  if (requires && !session) return next({ path: "/auth/login" });
  next();
});

export default router;
