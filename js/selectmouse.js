document.addEventListener("DOMContentLoaded", () => {
  const cage = document.getElementById("cage-mice");
  const controlBox = document.getElementById("control-box");
  const testBox = document.getElementById("test-box");

  const selectControlBtn = document.getElementById("select-control");
  const selectTestBtn = document.getElementById("select-test");

  selectControlBtn.addEventListener("click", () => {
    moveMouseTo(controlBox);
  });

  selectTestBtn.addEventListener("click", () => {
    moveMouseTo(testBox);
  });

  function moveMouseTo(targetBox) {
    
    if (targetBox.querySelector(".mouse-img")) {
      alert("This box already has a mouse!");
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
});
