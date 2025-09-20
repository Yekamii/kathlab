document.addEventListener("DOMContentLoaded", () => {
  let experimentStarted = false; 
  let bothMicePlaced = false; 

  const bacteriaButtons = document.querySelectorAll(".bacteria-option");
  const resetBtn = document.getElementById("reset-btn");

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
      }
    }, true); 
  });

 
  resetBtn.addEventListener("click", () => {
    experimentStarted = false;
    bothMicePlaced = false;
  });
});
