import { loadData, photosynthesisData } from './data-loader.js';

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stoptBtn");
const resetBtn = document.getElementById("resetBtn");

const bubbleCounter = document.getElementById("bubbleCount");
const timerDisplay = document.getElementById("timer");

const plantWater = document.querySelector(".plantwater");

let bubbleInterval;
let timerInterval;
let bubbles = 0;
let time = 0;
let maxBubbles = 0;

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  const maxWidth = plantWater.offsetWidth - 10;
  const randomX = Math.floor(Math.random() * maxWidth);
  bubble.style.left = `${randomX}px`;

  plantWater.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 3000);
}

function getBubblesCount(temp, light, co2) {
  const key = `${temp}-${light}-${co2}`;
  return photosynthesisData[key] ?? 0;
}

function startSimulation() {
  if (!bubbleInterval && !timerInterval) {
    const temperature = parseInt(document.getElementById("temperature").value);
    const light = parseInt(document.getElementById("light").value);
    const co2 = parseInt(document.getElementById("co2").value);

    maxBubbles = getBubblesCount(temperature, light, co2);
    console.log("საწყისი ბუშტების რაოდენობა:", maxBubbles);

    bubbles = 0;
    time = 0;
    bubbleCounter.textContent = "0";
    timerDisplay.textContent = "0";

    
    timerInterval = setInterval(() => {
      time++;
      timerDisplay.textContent = time;

      if (time >= 30) {
        stopSimulation();
      }
    }, 1000);

    
    bubbleInterval = setInterval(() => {
      if (bubbles < maxBubbles) {
        createBubble();
        bubbles++;
        bubbleCounter.textContent = bubbles;
      } else {
        
        clearInterval(bubbleInterval);

        
        const slowRate = Math.min(5000, Math.max(1200, 7000 - maxBubbles * 400));
        

        bubbleInterval = setInterval(() => {
          createBubble();
          bubbles++;
          bubbleCounter.textContent = bubbles;
        }, slowRate);
      }
    }, 1000); 
  }
}

function stopSimulation() {
  clearInterval(bubbleInterval);
  clearInterval(timerInterval);
  bubbleInterval = null;
  timerInterval = null;
}

function resetSimulation() {
  stopSimulation();
  bubbles = 0;
  time = 0;
  bubbleCounter.textContent = "0";
  timerDisplay.textContent = "0";

  const allBubbles = document.querySelectorAll(".bubble");
  allBubbles.forEach(b => b.remove());

  document.getElementById("temperature").value = "0";
  document.getElementById("light").value = "50";
  document.getElementById("co2").value = "100";

  document.getElementById("lampGlow").style.opacity = 0.1;
  document.querySelector(".mercury").style.height = "10%";
  document.getElementById("bubbleAmount").innerText = "0";
  document.getElementById("bubbleContainer").innerHTML = "";
}

window.addEventListener("DOMContentLoaded", () => {
  loadData().then(() => {
    startBtn.addEventListener("click", startSimulation);
    stopBtn.addEventListener("click", stopSimulation);
    resetBtn.addEventListener("click", resetSimulation);
  });
});
