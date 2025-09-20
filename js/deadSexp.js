document.addEventListener("DOMContentLoaded", () => {
  function startCountdown() {
    const controlBox = document.getElementById("control-box");
    const testBox = document.getElementById("test-box");

    
    [controlBox, testBox].forEach(box => {
      const syringe = box.querySelector(".syringe");
      if (syringe) syringe.remove();

      const mouse = box.querySelector(".mouse-img");
      if (mouse) mouse.remove();

      const label = box.querySelector(".injection-label");
      if (label) label.remove();
    });

    
    [controlBox, testBox].forEach(box => {
      const countdownLabel = document.createElement("div");
      countdownLabel.classList.add("countdown-label");
      countdownLabel.style.position = "absolute";
      countdownLabel.style.bottom = "70%";
      countdownLabel.style.left = "50%";
      countdownLabel.style.transform = "translateX(-50%)";
      countdownLabel.style.color = "rgba(252, 252, 252, 1)";
      countdownLabel.style.fontSize = "24px";
      countdownLabel.style.fontWeight = "bold";
      box.appendChild(countdownLabel);

      let timeLeft = 4;
      countdownLabel.textContent = timeLeft;

      const intervalId = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
          countdownLabel.textContent = timeLeft;
        } else {
          clearInterval(intervalId);
          countdownLabel.remove();

          
          addMouse(box, "img/mouserat.png", "Alive");
        }
      }, 1000);
    });
  }

  
  function addMouse(box, imgSrc, labelText) {
    const mouseImg = document.createElement("img");
    mouseImg.src = imgSrc;
    mouseImg.alt = labelText + " Mouse";
    mouseImg.classList.add("mouse-img");
    mouseImg.style.position = "absolute";
    mouseImg.style.top = "40%";
    mouseImg.style.left = "50%";
    mouseImg.style.transform = "translateX(-50%)";
    mouseImg.style.width = "120px";
    box.appendChild(mouseImg);

    const label = document.createElement("div");
    label.classList.add("injection-label");
    label.style.position = "absolute";
    label.style.bottom = "70%";
    label.style.left = "50%";
    label.style.transform = "translateX(-50%)";
    label.style.color = "rgba(252, 252, 252, 1)";
    label.style.fontSize = "18px";
    label.textContent = labelText;
    box.appendChild(label);
  }

  
  const heatKilledSBtn = document.querySelector(".bacteria-option.Heat-killed");
  if (heatKilledSBtn) {
    heatKilledSBtn.addEventListener("click", () => {
      const controlMouse = document.getElementById("control-box").querySelector(".mouse-img");
      const testMouse = document.getElementById("test-box").querySelector(".mouse-img");

      if (!controlMouse || !testMouse) {
        alert("Please place mice in both boxes before starting the experiment!");
        return; 
      }

      setTimeout(() => {
        startCountdown("Heat-killed S");
      }, 4000);
    });
  }
});
