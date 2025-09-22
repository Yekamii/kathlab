document.addEventListener("DOMContentLoaded", () => {
  let experimentStarted = false; 
  let bothMicePlaced = false; 

  const bacteriaButtons = document.querySelectorAll(".bacteria-option");
  const resetBtn = document.querySelector(".Reset"); 
  const cage = document.getElementById("cage-mice");
  const controlBox = document.getElementById("control-box");
  const testBox = document.getElementById("test-box");

  function checkMicePlaced() {
    const controlMouse = controlBox.querySelector(".mouse-img");
    const testMouse = testBox.querySelector(".mouse-img");
    bothMicePlaced = !!(controlMouse && testMouse);
  }

  document.getElementById("select-control").addEventListener("click", checkMicePlaced);
  document.getElementById("select-test").addEventListener("click", checkMicePlaced);

  bacteriaButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      checkMicePlaced();

      if (bothMicePlaced && experimentStarted) {
        alert("Experiment already started! Please press Reset before trying another strain.");
        e.stopImmediatePropagation();
        return;
      }

      if (bothMicePlaced) {
        experimentStarted = true;
      } else {
        alert("Please place mice in both boxes before starting the experiment!");
      }
    }, true); 
  });

  resetBtn.addEventListener("click", () => {
    [controlBox, testBox].forEach(box => {
      box.querySelectorAll(".mouse-img, .syringe, .injection-label, .countdown-label").forEach(el => el.remove());
    });

    cage.querySelectorAll(".mouse-img").forEach(mouse => mouse.remove());

    for (let i = 1; i <= 3; i++) {
      const mouse = document.createElement("img");
      mouse.src = "img/mouserat.png";
      mouse.classList.add("mouse-img");
      mouse.style.position = "absolute";
      mouse.style.width = "90px";
      mouse.style.zIndex = "1";

      switch(i) {
        case 1: mouse.style.left = "6%"; mouse.style.top = "80%"; break;
        case 2: mouse.style.left = "36%"; mouse.style.top = "86%"; break;
        case 3: mouse.style.left = "46%"; mouse.style.top = "60%"; break;
      }

      cage.appendChild(mouse);
    }

    experimentStarted = false;
    bothMicePlaced = false;
  });
});
