<script setup>

</script>

<template>
    <div class = "d-flex justify-content-center align-items-center" style = "width: 100vw; height: fit-content">
        <div style = "width: 80%;" class = "text-center margintop">
            <img src = "/public/images/Logo.svg" style = "width: 20%;"/>
            <h1 style = "font-weight: 900;">WriterType</h1>
            <br/>
            <h3>Typewriter Nostalgia, Digital Precision</h3>
            <br/>
            <h5>
                Experience the charm of classic typing with real typewriter sounds and animations.
                <br/>
                Test your typing speed, all in your browser.
            </h5>
            <br/>
            <h5>
                <RouterLink to="/app" class="btn button-effect center" style = "box-shadow: 0 0 10px black;">
                    <h5 class = "mt-1 buttonsize">
                        Start Typing
                    </h5>
                </RouterLink>
            </h5>
            <br/>
            <div class="embed-responsive">
                <video class="embed-responsive-item videowidth" autoplay muted>
                    <source src="/public/images/ClutchessDemo.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <br/>
        </div>
    </div>
</template>

<style scoped>
    .button-effect {
    position: relative;
    margin: 5px;
    border-radius: 15px;
    z-index: 1;
    }
    .button-effect:hover {
    color: white;
    }
    .button-effect::before {
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
    .button-effect:hover::before {
    background-color: black;
    }
    .button-effect:hover img {
    filter: invert(100%);
    }

    @media (min-width: 576px) {
        .videowidth {
            width: 80%
        }
        .margintop {
            margin-top: 8%;
        }
        
    }
    @media (max-width: 575px) {
        .videowidth {
            width: 100%
        }
        .margintop {
            margin-top: 22%;
        }
        .buttonsize {
            width: auto;
            height: 20px;
            font-size: medium;
            padding-top: 2px;
        }
    }
</style>