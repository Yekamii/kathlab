document.addEventListener("DOMContentLoaded", () => {
  const cage = document.getElementById("cage-mice");
  const controlBox = document.getElementById("control-box");
  const testBox = document.getElementById("test-box");

  const selectControlBtn = document.getElementById("select-control");
  const selectTestBtn = document.getElementById("select-test");

  const sStrainBtn = document.querySelector(".bacteria-option.virulent"); // აქ S strain

  selectControlBtn.addEventListener("click", () => {
    moveMouseTo(controlBox);
  });

  selectTestBtn.addEventListener("click", () => {
    moveMouseTo(testBox);
  });

  sStrainBtn.addEventListener("click", () => {
    injectSStrain();
  });

  function moveMouseTo(targetBox) {
    if (targetBox.querySelector(".mouse-img")) {
      return;
    }

    const mice = cage.querySelectorAll(".mouse-img");
    if (mice.length > 0) {
      const mouse = mice[0]; 
      targetBox.appendChild(mouse);

      mouse.style.position = "absolute";
      mouse.style.top = "40%"; 
      mouse.style.left = "50%";
      mouse.style.transform = "translateX(-50%)";
      mouse.style.width = "120px"; 
      mouse.style.transition = "all 0.3s ease";
    } else {
      alert("No more mice in the cage!");
    }
  }

  function injectSStrain() {
    const controlMouse = controlBox.querySelector(".mouse-img");
    const testMouse = testBox.querySelector(".mouse-img");

    if (!controlMouse || !testMouse) {
      alert("Both mice must be selected first!");
      return;
    }

    if (controlBox.querySelector(".syringe") || testBox.querySelector(".syringe")) {
      alert("Injection already done!");
      return;
    }

    [controlBox, testBox].forEach(box => {
      const syringe = document.createElement("img");
      syringe.src = "img/syringe.gif";
      syringe.alt = "Syringe Injection";
      syringe.classList.add("syringe");
      syringe.style.position = "absolute";
      syringe.style.top = "40%";
      syringe.style.right = "20%";
      syringe.style.width = "50px";
      box.appendChild(syringe);
      syringe.style.transform = "rotate(-80deg)";
    });

    addOrUpdateLabel(controlBox, "Physiological solution");
    addOrUpdateLabel(testBox, "S strain"); 
  }

  function addOrUpdateLabel(box, text) {
    let label = box.querySelector(".injection-label");
    if (!label) {
      label = document.createElement("div");
      label.classList.add("injection-label");
      label.style.position = "absolute";
      label.style.bottom = "70%";
      label.style.left = "50%";
      label.style.transform = "translateX(-50%)";
      label.style.color = "rgba(252, 252, 252, 1)";
      label.style.fontSize = "18px";
      box.appendChild(label);
    }
    label.textContent = text;
  }
});
