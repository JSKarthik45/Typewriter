import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "@/LandingPage.vue";
import Typewriter from "@/Typewriter.vue";
import SpeedTest from "@/SpeedTest.vue";
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
      path: '/speedtest',
      name: 'SpeedTest',
      component: SpeedTest,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

const { posthog } = usePostHog()

export default router
