<script setup>
    import { ref, onMounted } from "vue";

    const props = defineProps({
        items: Array,
        isNavOpen: Boolean,
    })

    let navbar = ref(null);

</script>
<template>
    <div class="d-flex justify-content-center">
        <nav class = "navbar navbar-expand-lg" ref = "navbar" style = "background: rgba(255, 255, 255, 0.7);">   
            <button class="navbar-toggler border-0 shadow-none w-100" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <div class = "center" >
                    <RouterLink to = "/" style = "text-decoration: none;" class = "center">
                        <img src = "/images/Logo.svg" style = "width: 50px;"/>
                        &nbsp;
                        <h1 style = "display: inline; color: black;" class = "center">
                            WriterType
                        </h1>
                    </RouterLink>
                    &nbsp;
                    <span class = "navbar-toggler-icon"></span>
                </div>    
            </button>
            <div :class="['collapse', 'navbar-collapse', { show: props.isNavOpen }]" id="navbarSupportedContent">
                <ul class = "navbar-nav center">
                    <li class = "nav-item center">
                        <RouterLink to="/" class="desktop-logo d-none d-sm-flex align-items-center nav-link m-1 p-1">
                            <h4 class = "center pt-2">
                                WriterType
                            </h4>
                            &nbsp;
                            <img src="/images/Logo.svg" alt="WriterType Logo" style = "width: 40px; height: 40px;"/>
                        </RouterLink>
                    </li>
                </ul>
                <ul class = "navbar-nav center">
                    <li class = "nav-item center" v-for = "item in props.items">
                        <RouterLink class = "nav-link" :to = "item.link" :class = "{activeBorder: item.active}">
                            <!--<img :src = "`/images/${item.label}.svg`"/>-->
                            <h5>
                                {{ item.label }}
                            </h5>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<style scoped>
@media(min-width: 576px) {
  .desktop-logo {
    display: flex !important;
  }
}
    .navbar {
        padding: 0px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);
        border: 2px solid black;
        z-index: 10000;
        box-shadow: 0 0 10px black;
        pointer-events: auto;
    }
    @media(max-width: 575px) {
        .navbar {
            width: 100%;
            border-radius: 0px;
            margin-bottom: 5px;
        }
        img {
            height: 30px;
            width: 30px;
        }
        .navbar-nav {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap;   /* Allow wrapping to next line on overflow */
            column-gap: 10px;
        }
        .nav-item {
            flex: 0 1 auto;  /* Allow items to shrink if needed */
        }
        .nav-link {
            /* add these lines or override */
            display: flex;
            align-items: center;
            padding: 1px 10px;
            padding-top: 3px;
            margin-bottom: 5px;
        }
    }
    @media(min-width: 576px) {
        .navbar {
            width: fit-content;
            margin-top: 10px;
        }
        img {
            height: 20px;
            width: 20px;
        }
        .navbar-nav{
            margin-left: auto;
            margin-right: auto;
            padding: 5px;
        }
        .nav-link {
            padding:2px;
            margin: 2px;
            padding-top: 8px;
        }
    }
    ul { 
        list-style-type: none;
        padding: 0px;
    }
    .activeBorder {
        box-shadow: inset 0 0 5px black;
        border-radius: 10px;
    }
    .nav-link {
        position: relative;
        border-radius: 15px;
        z-index: 1;
    }
    .nav-link:hover {
        color: white;
    }
    .nav-link::before {
        content: "";
        position: absolute;
        color: white;
        background-color: transparent;
        border-radius: 15px;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: all 0.5s linear;
        z-index: -1;
    }
    .nav-link:hover::before {
        background-color: black;
    }
    .nav-link:hover img {
    filter: invert(100%);
}
</style>
