<script setup>
  import { RouterView, RouterLink } from "vue-router";
  import LandingPage from '@/LandingPage.vue';
  import Typewriter from '@/Typewriter.vue';
  import SpeedTest from '@/SpeedTest.vue';
  import Navbar from "@/Navbar.vue";  
  import { ref, watch } from "vue";
  import { useRoute } from "vue-router";
  import {gsap} from "gsap";
  const route = useRoute();
  import 'bootstrap/dist/css/bootstrap.min.css';
  import * as bootstrap from 'bootstrap';
  const isNavOpen = ref(false);
  watch(() => route.path, (newPath) => {
    for (let i of items.value) {
      i.active = (i.link === newPath);
    }
    isNavOpen.value = (newPath === "/");
  });
  const items = ref([
    { label: "Typewriter", link: "/app", active: false },
    { label: "Speed Test", link: "/speedtest", active: false },
  ]);
</script>

<template>
  <div style = "width: 100vw; height: fit-content; background-color: #FAE4E4; margin: 0px;" class = "scroll">
    <div style = "position: fixed; width: 100%; top: 0; left: 0; z-index: 10000;">
      <Navbar :items = "items" :key="route.path" :isNavOpen="isNavOpen"/>
    </div>
    <div style = "width: 100%;">
      <RouterView  :key="route.path"> </RouterView>
    </div>
  </div>
</template>

<style scoped>

</style>
