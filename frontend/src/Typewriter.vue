<script setup>
</script>

<template>
    <div style = "width: 100vw; height: 100vh; display:flex; align-items: end; justify-content: center;">
        <div style = "width: 95%; height: 85%; position: relative">
            <div class = "rect1 colour2">
                <div class = "rect2 colour3">
                    <div class = "rect3 colour4">

                    </div>
                </div>
            </div>
            <div class="rect4 colour2"></div>
            <div class="rect5 colour4"></div>
            <div class="rect6 colour2"></div>
            <div class="rect7 colour4"></div>
            <div class="rect8 colour2"></div>
            <div class="rect9 colour2"></div>
            <div class="rect11 colour0">
                <input type = "text" style = "width: 90%; border: none; outline: none; background-color: transparent; font-size: 24px; font-weight: 600;"/>
            </div>
            <div class="rect10 colour2"></div>
            <div class="rect12 colour0"></div>
            <div class="tri1"></div>
            <div class="rect13 colour0"></div>
            <div class="rect14 colour3"></div>
        </div>
    </div>
</template>

<style scoped>
    .colour0 {
        background-color: #FFFFFF;
    }
    .colour1 {
        background-color: #FAE4E4;
    }
    .colour2 {
        background-color: #EBC2C2;
    }
    .colour3 {
        background-color: #E2B6B6;
    }
    .colour4 {
        background-color: #CEA0A0;
    }
    .rect1 {
        width: 68%; 
        height: 22%; 
        z-index: 1; 
        position: absolute; 
        top: 50%; 
        left: 16%; 
        display: flex; 
        justify-content: center; 
        align-items: center;
        border-radius: 16px;
    }
    .rect2 {
        width: 90%; 
        height: 75%; 
        z-index: 2; 
        position: absolute;
        display: flex; 
        justify-content: center; 
        align-items: center;
        border-radius: 16px;
    }
    .rect3 {
        width: 98%;
        height: 88%;
        z-index: 3;
        border-radius: 16px;
    }
    .rect4 {
        width: 2.5%;
        height: 13%;
        position: absolute;
        left: 84.5%;
        top: 53%;
        border-radius: 12px;
        z-index: 5;
    }
    .rect5 {
        width: 0.5%;
        height: 6%;
        position: absolute;
        left: 84%;
        top: 56.5%;
        z-index: 4;
    }
    .rect6 {
        width: 3%;
        height: 14%;
        position: absolute;
        left: 12.5%;
        top: 53%;
        border-radius: 12px;
        z-index: 7;
    }
    .rect7 {
        width: 0.5%;
        height: 6%;
        position: absolute;
        left: 15.5%;
        top: 58%;
        z-index: 6;
    }
    .rect8 {
        height: 3%;
        width: 8%;
        position: absolute;
        left: 7.5%;
        top: 53%;
        border-radius: 12px;
        z-index: 8;
    }
    .rect9 {
        height: 9%;
        width: 3%;
        position: absolute;
        left: 7.5%;
        top: 47%;
        border-radius: 12px;
        z-index: 9;
    }
    .rect10 {
        width: 85%;
        height: 35%;
        position: absolute;
        bottom: 0px;
        left: 7.5%;
        border-radius: 26px 26px 0px 0px;
        z-index: 10;
    }
    .rect11 {
        width: 50%;
        height: 50%;
        position: absolute;
        bottom: 35%;
        left: 25%;
        border-radius: 16px;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: end;
    }
    .rect12 {
        width: 30%;
        height: 8%;
        position: absolute;
        bottom: 32%;
        left: 35%;
        border-radius: 12px;
        z-index: 12;
    }
    .tri1 {
        width: 0;
        height: 0;
        position: absolute;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 30px solid #111111;
        bottom: 32%;
        left: 48.5%;
        z-index: 13;
    }
    .rect14 {
        width: 85%;
        height: 25%;
        position: absolute;
        bottom: 0px;
        left: 7.5%;
        z-index: 15;
    }
</style>