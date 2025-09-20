import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "@/LandingPage.vue";
import Typewriter from "@/Typewriter.vue";
import Practice from "@/Practice.vue";
import { usePostHog } from '@/composables/usePostHog'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage,
    },
    {
      path: '/app',
      name: 'Typewriter',
      component: Typewriter,
    },
    {
      path: '/practice',
      name: 'Practice',
      component: Practice,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

const { posthog } = usePostHog()

export default router
