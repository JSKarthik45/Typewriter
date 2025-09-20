<script setup>
    import { onMounted, watch, ref, onUnmounted } from "vue";
    import {gsap} from "gsap";
    let canvas = null;
    let str = ref("");      // For display (with <br/> etc.)
    let rawStr = ref("");   // For plain text (no HTML)
    let maxLines = 12;
    let maxCharsPerLine = 52;

    // Typewriter sound
    let typewriterAudio = new Audio('/s3.wav');
    let returnAudio = new Audio('/s4.m4a');
    let bellAudio = new Audio('/s5.wav');
        function playTypewriterSound() {
            const audio = new Audio('/s3.wav');
              audio.play();
              audio.volume = 0.15; // Lower volume, set after play for best compatibility
        }
    function measureCaretX(currentLine) {
        // Always create a new span for measurement
        let tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'pre';
        tempSpan.style.fontFamily = "Special Elite, system-ui";
        tempSpan.style.fontSize = "large";
        tempSpan.style.fontWeight = "700";
        document.body.appendChild(tempSpan);

        // Replace HTML entities for measurement
        let text = currentLine.replace(/&emsp;&emsp;/g, '    ');
        tempSpan.textContent = text;
        let width = tempSpan.offsetWidth;

        // Remove the span after measuring
        document.body.removeChild(tempSpan);

        return width;
    }

    onMounted(() => {
        canvas = document.getElementById("canvas");
        if(returnAudio) {
            returnAudio.play();
        }
        gsap.to(document.documentElement, {
            duration: 0.5,
            "--x": "40%"
        });
    });

    onUnmounted(() => {
        gsap.to(document.documentElement, {
            duration: 0.6,
            "--x": "0%"
        });
    })
    

    watch(str, () => {
        if (canvas) {
            canvas.innerHTML = str.value;
        }
    });

    function getLines(text) {
        // Split by <br/> or <br>
        return text.split(/<br\/?>(?![^<]*>)/);
    }

    function updateCaret(currentLine) {
        const root = document.documentElement;
        let canvasWidth = canvas ? canvas.clientWidth : 0;
        // Measure width of current line plus a placeholder for the next character
        let nextCharWidth = measureCaretX(currentLine + 'M') - measureCaretX(currentLine);
        let xPx = measureCaretX(currentLine) + nextCharWidth;
        // Invert: caret starts at baseLeft and moves left as xPx increases
        let basePx = canvasWidth;
        let caretX = basePx - xPx;
        root.style.setProperty('--x', caretX + 'px');
    }

    document.addEventListener('keydown', function(event) {
        // Play typewriter sound for visible key presses
        if (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Tab') {
            playTypewriterSound();
            const root = document.documentElement;
            let lines = getLines(str.value);
            let currentLine = lines[lines.length - 1] || "";

            // Remove oldest line if maxLines exceeded
            if (lines.length > maxLines) {
                lines.shift();
                str.value = lines.join("<br/>");
                rawStr.value = lines.join("\n");
                returnAudio.play();
                lines = getLines(str.value);
                currentLine = lines[lines.length - 1] || "";
            }

            // Backspace
            if (event.key === "Backspace") {
                if (str.value.length > 0) {
                    // Remove last char or tag
                    if (str.value.endsWith("<br/>") || str.value.endsWith("<br>")) {
                        str.value = str.value.replace(/(<br\/>|<br>)$/, "");
                        rawStr.value = rawStr.value.replace(/(\n)$/, "");
                        lines = getLines(str.value);
                        currentLine = lines[lines.length - 1] || "";
                    } else {
                        str.value = str.value.slice(0, -1);
                        rawStr.value = rawStr.value.slice(0, -1);
                        currentLine = currentLine.slice(0, -1);
                    }
                    updateCaret(currentLine);
                }
                event.preventDefault();
                return;
            }

            // Enter
            if (event.key === "Enter") {
                str.value += "<br/>";
                rawStr.value += "\n";
                returnAudio.play();
                updateCaret("");
                event.preventDefault();
                return;
            }

            // Tab
            /*if (event.key === "Tab") {
                str.value += "&emsp;&emsp;";
                rawStr.value += "    ";
                currentLine += "    ";
                updateCaret(currentLine);
                event.preventDefault();
                return;
            }*/

            // Normal character
            if (event.key.length === 1) {
                // Check if current line is too long (pixel-based)
                let nextLine = currentLine + event.key;
                let xPx = measureCaretX(nextLine);
                let canvasWidth = canvas ? canvas.clientWidth : 0;
                if (canvasWidth && xPx > canvasWidth) {
                    str.value += "<br/>";
                    rawStr.value += "\n";
                    returnAudio.play();
                    currentLine = "";
                }
                str.value += event.key;
                rawStr.value += event.key;
                currentLine += event.key;
                updateCaret(currentLine);
                event.preventDefault();
            }
        }
    });
    function downloadTxtFile() {
    const blob = new Blob([rawStr.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typewriter.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function triggerUpload() {
    document.getElementById('uploadTxt').click();
}

function uploadTxtFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const text = evt.target.result;
        str.value = text.replace(/\r?\n/g, '<br/>');
        rawStr.value = text;
    };
    reader.readAsText(file);
}
function clearCanvas() {
    str.value = '';
    rawStr.value = '';
}
</script>

<template>
    <div style = "width: 100vw; height: 100vh; display:flex; align-items: end; justify-content: center;">
        <div class="typewriter-btn-bar-left">
            <button v-if="str && str.length > 0 && str.value !== ''" class="button-effect" @click="clearCanvas">Change Paper</button>
        </div>
        <div class="typewriter-btn-bar">
            <input type="file" id="uploadTxt" accept=".txt" style="display:none" @change="uploadTxtFile" />
            <button v-if="!str || str.length === 0 || str.value === ''" class="button-effect" @click="triggerUpload">Upload From Text File</button>
            <button v-else class="button-effect" @click="downloadTxtFile">Download As Text File</button>
        </div>
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
                <div style = "position: relative; width: 83%; height: 90%; font-family: 'Special Elite', system-ui; font-size: large; font-weight: 700; display: flex; align-items: end;" class = "mb-1" id = "canvas">
                    <div style = "position: absolute; bottom: 0; left: 0; width: 100%; height: 20%; background: linear-gradient(to top, #FFFFFF, rgba(255, 255, 255, 0)); pointer-events: none;">
                    </div>
                </div>
            </div>
            <div class="rect10 colour2"></div>
            <div class="rect12 colour5"></div>
            <div class="tri1"></div>
            <div class="rect13 colour0"></div>
            <div class="rect14 colour3"></div>
        </div>
    </div>
</template>

<style scoped>
    @media (max-width: 575px) {
        .typewriter-btn-bar-left {
            position: absolute;
            top: 95px;
            left: 0px;
            width: 100vw;
            justify-content: flex-start;
            padding: 8px 0 0 8px;
        }
        .typewriter-btn-bar {
            position: absolute;
            top: 60px;
            right: 0px;
            width: 100vw;
            justify-content: flex-end;
            padding: 8px 8px 0 0;
        }
    }
    @media (min-width: 576px) {
        .typewriter-btn-bar-left {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10001;
            display: flex;
            gap: 12px;
            padding: 18px 0 0 24px;
            background: none;
        }
        .typewriter-btn-bar {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 10001;
            display: flex;
            gap: 12px;
            padding: 18px 24px 0 0;
            background: none;
        }
    }
    .button-effect {
        position: relative;
        box-shadow: 0 0 10px black;
        font-weight: 300;
        font-size: small;
        background-color: #FAE4E4;
        color: black;
        border: none;
        padding: 5px 15px;
        margin: 5px;
        border-radius: 10px;
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
        border-radius: 10px;
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
    .colour5 {
        background-color: #a37f7f;
    }
    .rect1 {
        width: 60%; 
        height: 22%; 
        z-index: 1; 
        position: absolute; 
        top: 50%; 
        left: var(--x); 
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
        left: calc(var(--x) + 60.5%);
        top: 53%;
        border-radius: 12px;
        z-index: 5;
    }
    .rect5 {
        width: 0.5%;
        height: 6%;
        position: absolute;
        left: calc(var(--x) + 60%);
        top: 56.5%;
        z-index: 4;
    }
    .rect6 {
        width: 3%;
        height: 14%;
        position: absolute;
        left: calc(var(--x) - 3.5%);
        top: 53%;
        border-radius: 12px;
        z-index: 7;
    }
    .rect7 {
        width: 0.5%;
        height: 6%;
        position: absolute;
        left: calc(var(--x) - 0.5%);
        top: 58%;
        z-index: 6;
    }
    .rect8 {
        height: 3%;
        width: 8%;
        position: absolute;
        left: calc(var(--x) - 8.5%);
        top: 53%;
        border-radius: 12px;
        z-index: 8;
    }
    .rect9 {
        height: 9%;
        width: 3%;
        position: absolute;
        left: calc(var(--x) - 8.5%);
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
        height: 60%;
        position: absolute;
        bottom: 35%;
        left: calc(var(--x) + 5%);
        border-radius: 16px 16px 0px 0px;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: end;
    }
    .rect12 {
        width: 30%;
        height: 3%;
        position: absolute;
        bottom: 32%;
        left: 35%;
        border-radius: 0px 0px 12px 12px;
        z-index: 12;
    }
    .tri1 {
        width: 0;
        height: 0;
        position: absolute;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 30px solid #4C4545;
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