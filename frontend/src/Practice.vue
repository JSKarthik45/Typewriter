<script setup>
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

import { onMounted, nextTick, ref } from 'vue';

let keyboard = null;
const inputValue = ref('');
const currentFinger = ref('');

let typewriterAudio = new Audio('/s3.wav');
let returnAudio = new Audio('/s4.m4a');
let bellAudio = new Audio('/s5.wav');

// Custom keyboard layout to separate left and right shift
const layout = {
  default: [
    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w e r t y u i o p [ ] \\",
    "{lock} a s d f g h j k l ; ' {enter}",
    "{shift} z x c v b n m , . / {shiftRight}",
    "{space}"
  ]
};

// Finger mapping for each key (including numbers, punctuation, and special keys)
const fingerMapping = {
  // Numbers row
  '1': { finger: 'left-pinky', hand: 'left' },
  '2': { finger: 'left-ring', hand: 'left' },
  '3': { finger: 'left-middle', hand: 'left' },
  '4': { finger: 'left-index', hand: 'left' },
  '5': { finger: 'left-index', hand: 'left' },
  '6': { finger: 'right-index', hand: 'right' },
  '7': { finger: 'right-index', hand: 'right' },
  '8': { finger: 'right-middle', hand: 'right' },
  '9': { finger: 'right-ring', hand: 'right' },
  '0': { finger: 'right-pinky', hand: 'right' },
  
  // Left hand letters
  'q': { finger: 'left-pinky', hand: 'left' },
  'w': { finger: 'left-ring', hand: 'left' },
  'e': { finger: 'left-middle', hand: 'left' },
  'r': { finger: 'left-index', hand: 'left' },
  't': { finger: 'left-index', hand: 'left' },
  'a': { finger: 'left-pinky', hand: 'left' },
  's': { finger: 'left-ring', hand: 'left' },
  'd': { finger: 'left-middle', hand: 'left' },
  'f': { finger: 'left-index', hand: 'left' },
  'g': { finger: 'left-index', hand: 'left' },
  'z': { finger: 'left-pinky', hand: 'left' },
  'x': { finger: 'left-ring', hand: 'left' },
  'c': { finger: 'left-middle', hand: 'left' },
  'v': { finger: 'left-index', hand: 'left' },
  'b': { finger: 'left-index', hand: 'left' },
  
  // Right hand letters
  'y': { finger: 'right-index', hand: 'right' },
  'u': { finger: 'right-index', hand: 'right' },
  'i': { finger: 'right-middle', hand: 'right' },
  'o': { finger: 'right-ring', hand: 'right' },
  'p': { finger: 'right-pinky', hand: 'right' },
  'h': { finger: 'right-index', hand: 'right' },
  'j': { finger: 'right-index', hand: 'right' },
  'k': { finger: 'right-middle', hand: 'right' },
  'l': { finger: 'right-ring', hand: 'right' },
  'n': { finger: 'right-index', hand: 'right' },
  'm': { finger: 'right-index', hand: 'right' },
  
  // Punctuation and special characters
  ';': { finger: 'right-pinky', hand: 'right' },
  ':': { finger: 'right-pinky', hand: 'right' },
  ',': { finger: 'right-middle', hand: 'right' },
  '<': { finger: 'right-middle', hand: 'right' },
  '.': { finger: 'right-ring', hand: 'right' },
  '>': { finger: 'right-ring', hand: 'right' },
  '/': { finger: 'right-pinky', hand: 'right' },
  "'": { finger: 'right-pinky', hand: 'right' },
  '[': { finger: 'right-pinky', hand: 'right' },
  ']': { finger: 'right-pinky', hand: 'right' },
  '\\': { finger: 'right-pinky', hand: 'right' },
  '|': { finger: 'right-pinky', hand: 'right' },
  '-': { finger: 'right-pinky', hand: 'right' },
  '_': { finger: 'right-pinky', hand: 'right' },
  '=': { finger: 'right-pinky', hand: 'right' },
  '`': { finger: 'left-pinky', hand: 'left' },
  
  // Special keys with multiple possible identifiers
  '{space}': { finger: 'thumb', hand: 'both' },
  'Space': { finger: 'thumb', hand: 'both' },
  '{bksp}': { finger: 'right-pinky', hand: 'right' },
  'Backspace': { finger: 'right-pinky', hand: 'right' },
  '{enter}': { finger: 'right-pinky', hand: 'right' },
  'Enter': { finger: 'right-pinky', hand: 'right' },
  '{tab}': { finger: 'left-pinky', hand: 'left' },
  'Tab': { finger: 'left-pinky', hand: 'left' },
  '{shift}': { finger: 'left-pinky', hand: 'left' },
  '{shiftRight}': { finger: 'right-pinky', hand: 'right' },
  'Shift': { finger: 'left-pinky', hand: 'left' },
  '{lock}': { finger: 'left-pinky', hand: 'left' },
  'CapsLock': { finger: 'left-pinky', hand: 'left' },
  '{ctrl}': { finger: 'left-pinky', hand: 'left' },
  'Control': { finger: 'left-pinky', hand: 'left' },
  '{alt}': { finger: 'thumb', hand: 'left' },
  'Alt': { finger: 'thumb', hand: 'left' }
};

function playTypewriterSound() {
    const audio = new Audio('/s3.wav');
    audio.play();
    audio.volume = 0.15;
}

function getFingerForKey(key) {
  return fingerMapping[key.toLowerCase()] || fingerMapping[key] || { finger: 'unknown', hand: 'unknown' };
}

function highlightFingerForKey(key) {
  const fingerInfo = getFingerForKey(key);
  currentFinger.value = fingerInfo.finger;
}

onMounted(() => {
  nextTick(() => {
    keyboard = new Keyboard({
      onChange: input => onChange(input),
      onKeyPress: button => onKeyPress(button),
      layout: layout, // Add custom layout
      display: {
        '{bksp}': 'Backspace',
        '{enter}': 'Enter',
        '{shift}': 'Shift',
        '{shiftRight}': 'Shift',
        '{tab}': 'Tab',
        '{lock}': 'Caps',
        '{ctrl}': 'Ctrl',
        '{alt}': 'Alt',
        '{space}': 'Space'
      }
    });

    // Add physical keyboard event listener
    document.addEventListener('keydown', handlePhysicalKeyboard);
    
    // Color code all keys initially
    setTimeout(() => {
      colorCodeAllKeys();
    }, 100);
  });
  if(returnAudio) {
    returnAudio.play();
  }
});

function colorCodeAllKeys() {
  // First, get all buttons and try to map them
  const allButtons = document.querySelectorAll('.hg-button');
  
  Object.keys(fingerMapping).forEach(key => {
    const fingerInfo = fingerMapping[key];
    const keyElement = document.querySelector(`[data-skbtn="${key}"]`);
    if (keyElement) {
      keyElement.classList.add(`finger-${fingerInfo.finger}`);
    }
  });
  
  // Also try to color keys by their text content for special cases
  allButtons.forEach(button => {
    const buttonText = button.textContent.trim();
    const buttonData = button.getAttribute('data-skbtn');
    
    // Special handling for specific keys
    if (buttonText === 'Space' || buttonData === '{space}') {
      button.classList.add('finger-thumb');
    }
    if (buttonText === 'Backspace' || buttonData === '{bksp}') {
      button.classList.add('finger-right-pinky');
    }
    if (buttonText === '-' || buttonData === '-') {
      button.classList.add('finger-right-pinky');
    }
    if (buttonText === '=' || buttonData === '=') {
      button.classList.add('finger-right-pinky');
    }
    if (buttonText === '[' || buttonData === '[') {
      button.classList.add('finger-right-pinky');
    }
    if (buttonText === ']' || buttonData === ']') {
      button.classList.add('finger-right-pinky');
    }
    if (buttonText === '\\' || buttonData === '\\') {
      button.classList.add('finger-right-pinky');
    }
    // Handle both shift keys
    if (buttonData === '{shift}') {
      button.classList.add('finger-left-pinky');
    }
    if (buttonData === '{shiftRight}') {
      button.classList.add('finger-right-pinky');
    }
  });
}

function onChange(input){
  const inputElement = document.querySelector(".input");
  inputElement.value = input;
  inputValue.value = input;
  
  // Scroll to end of input to keep cursor visible
  inputElement.scrollLeft = inputElement.scrollWidth;
}

function onKeyPress(button){
  // Highlight finger for virtual keyboard press
  highlightFingerForKey(button);
  
  // Add visual feedback when virtual key is pressed
  const pressedKey = document.querySelector(`[data-skbtn="${button}"]`);
  if (pressedKey) {
    pressedKey.classList.add('key-pressed');
    setTimeout(() => {
      pressedKey.classList.remove('key-pressed');
    }, 150);
  }
}

function handlePhysicalKeyboard(event) {
  const key = event.key;
  let keyboardButton = key;

  // Map special keys to simple-keyboard format
  const keyMap = {
    'Backspace': '{bksp}',
    'Enter': '{enter}',
    'Tab': '{tab}',
    'Shift': event.location === 1 ? '{shift}' : '{shiftRight}', // Detect left vs right shift
    'CapsLock': '{lock}',
    ' ': '{space}',
    'Control': '{ctrl}',
    'Alt': '{alt}'
  };

  if (keyMap[key]) {
    keyboardButton = keyMap[key];
  }
  
  if(key != "Enter") {
    playTypewriterSound();
  }
  
  // Highlight finger for physical keyboard press
  highlightFingerForKey(keyboardButton);
  
  // Update input value
  if (key === 'Backspace') {
    inputValue.value = inputValue.value.slice(0, -1);
  } else if (key.length === 1) { // Only add printable characters
    inputValue.value += key;
  }

  // Update virtual keyboard display
  if (keyboard) {
    keyboard.setInput(inputValue.value);
  }

  // Update input field and scroll to end
  const inputElement = document.querySelector(".input");
  inputElement.value = inputValue.value;
  inputElement.scrollLeft = inputElement.scrollWidth;
  
  // Add visual feedback for physical keyboard press
  const pressedKey = document.querySelector(`[data-skbtn="${keyboardButton}"]`);
  if (pressedKey) {
    pressedKey.classList.add('key-pressed');
    setTimeout(() => {
      pressedKey.classList.remove('key-pressed');
    }, 150);
  }
}
</script>

<template>
    <div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px;">
        <!-- Hand visualization -->
        <div class="hands-display">
          <div class="hand left-hand">
            <div class="finger-label">Left Hand</div>
            <div class="fingers">
              <div class="finger pinky finger-left-pinky" :class="{ active: currentFinger === 'left-pinky' }">
                <div class="finger-name">Pinky</div>
              </div>
              <div class="finger ring finger-left-ring" :class="{ active: currentFinger === 'left-ring' }">
                <div class="finger-name">Ring</div>
              </div>
              <div class="finger middle finger-left-middle" :class="{ active: currentFinger === 'left-middle' }">
                <div class="finger-name">Middle</div>
              </div>
              <div class="finger index finger-left-index" :class="{ active: currentFinger === 'left-index' }">
                <div class="finger-name">Index</div>
              </div>
              <div class="finger thumb finger-thumb" :class="{ active: currentFinger === 'thumb' }">
                <div class="finger-name">Thumb</div>
              </div>
            </div>
          </div>
          <div class="hand right-hand">
            <div class="finger-label">Right Hand</div>
            <div class="fingers">
              <div class="finger thumb finger-thumb" :class="{ active: currentFinger === 'thumb' }">
                <div class="finger-name">Thumb</div>
              </div>
              <div class="finger index finger-right-index" :class="{ active: currentFinger === 'right-index' }">
                <div class="finger-name">Index</div>
              </div>
              <div class="finger middle finger-right-middle" :class="{ active: currentFinger === 'right-middle' }">
                <div class="finger-name">Middle</div>
              </div>
              <div class="finger ring finger-right-ring" :class="{ active: currentFinger === 'right-ring' }">
                <div class="finger-name">Ring</div>
              </div>
              <div class="finger pinky finger-right-pinky" :class="{ active: currentFinger === 'right-pinky' }">
                <div class="finger-name">Pinky</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Input field -->
        <div style="width: 80vw; display: flex; justify-content: center;">
            <input class="input form-control scrollable-input" readonly/>
        </div>
        
        <!-- Virtual keyboard -->
        <div style="width: 80vw; display: flex; justify-content: center;">
            <div class="simple-keyboard"></div>
        </div>
    </div>
</template>

<style scoped>
/* Hand visualization styles */
.hands-display {
  display: flex;
  gap: 40px;
}

.hand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.finger-label {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.fingers {
  display: flex;
  gap: 8px;
}

.finger {
  width: 40px;
  height: 80px;
  border: 2px solid #ccc;
  border-radius: 15px;
  display: flex;
  align-items: end;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  padding: 10px;
}

.finger.thumb {
  width: 35px;
  height: 60px;
  padding: 2px;
}

/* Light colored fingers */
.finger-left-pinky { background-color: #ffcccb; }
.finger-left-ring { background-color: #ccf2f0; }
.finger-left-middle { background-color: #cce7f0; }
.finger-left-index { background-color: #d4f1e4; }
.finger-thumb { background-color: #fff5cc; }
.finger-right-index { background-color: #fce4d6; }
.finger-right-middle { background-color: #f4d1c7; }
.finger-right-ring { background-color: #e0d9fe; }
.finger-right-pinky { background-color: #feddf4; }

.finger.active {
  border-color: #000000;
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(58, 58, 58, 0.7);
  border-width: 1px;
}

.finger-name {
  font-size: 10px;
  color: #666;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  padding: 2px;
}

.finger.active .finger-name {
  color: #494949;
  font-weight: bold;
}

/* Input styling with proper scrolling */
.scrollable-input {
  width: 600px !important;
  height: 50px !important;
  font-size: 18px !important;
  background-color: white !important;
  padding: 10px 15px !important;
  border: 2px solid #ccc !important;
  border-radius: 8px !important;
  overflow-x: auto !important;
  white-space: nowrap !important;
  text-overflow: clip !important;
  cursor: text !important;
  font-family: 'Special Elite', system-ui;
}

.scrollable-input:focus {
  outline: 2px solid #007bff !important;
  border-color: #007bff !important;
}

/* Make keyboard container background black */
:deep(.simple-keyboard) {
  background-color: #000000 !important;
  border-radius: 8px !important;
  padding: 15px !important;
}

/* Finger color coding for virtual keyboard - always colored */
:deep(.finger-left-pinky) { background-color: #E2B6B6 !important; color: black !important; font-weight: bold !important; }
:deep(.finger-left-ring) { background-color: #a37f7f !important; color: black !important; font-weight: bold !important; }
:deep(.finger-left-middle) { background-color: #FAE4E4 !important; color: black !important; font-weight: bold !important; }
:deep(.finger-left-index) { background-color: #CEA0A0 !important; color: black !important; font-weight: bold !important; }
:deep(.finger-thumb) { background-color: #EBC2C2 !important; color: black !important; font-weight: bold !important; }
:deep(.finger-right-index) { background-color: #a37f7f !important; color: black !important; font-weight: bold !important; }
:deep(.finger-right-middle) { background-color: #E2B6B6 !important; color: black !important; font-weight: bold !important; }
:deep(.finger-right-ring) { background-color: #FAE4E4 !important; color: black !important; font-weight: bold !important; }
:deep(.finger-right-pinky) { background-color: #CEA0A0 !important; color: black !important; font-weight: bold !important; }



/* Make virtual keyboard keys with button-effect styling */
:deep(.hg-button) {
  border: 1px solid #333333 !important;
  position: relative !important;
  margin: 5px !important;
  border-radius: 15px !important;
  z-index: 1 !important;
  transition: all 0.3s ease !important;
}

:deep(.hg-button::before) {
  content: "" !important;
  position: absolute !important;
  background-color: transparent !important;
  border-radius: 15px !important;
  bottom: 0 !important;
  left: 0 !important;
  height: 100% !important;
  width: 100% !important;
  transition: all 0.5s linear !important;
  z-index: -1 !important;
}

:deep(.hg-button:hover) {
  transform: translateY(-2px) !important;
}

:deep(.hg-button:hover::before) {
  background-color: rgba(0, 0, 0, 0.3) !important;
}

:deep(.hg-button:active) {
  transform: scale(0.95) !important;
}

/* Key pressed effect for visual feedback */
:deep(.hg-button.key-pressed) {
  transform: scale(0.95) !important;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8) !important;
  border: 3px solid white !important;
  filter: brightness(0.1) !important;
}

/* Enhanced button effect */
:deep(.hg-button) {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
}

:deep(.hg-button:hover) {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4) !important;
}
</style>
