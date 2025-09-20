document.addEventListener("DOMContentLoaded", () => {

  document.addEventListener("bacteriaBlended", () => {
  
    setTimeout(() => {
      showEmptyFlask("left");
      showEmptyFlask("right");
    }, 8000);
  });

  function showEmptyFlask(side) {
    const blenderBoxes = document.querySelectorAll(".blender-box");
    let targetBox = null;

    if (side === "left") targetBox = blenderBoxes[0];
    if (side === "right") targetBox = blenderBoxes[1];

    if (!targetBox) return;

    if (targetBox.nextElementSibling && targetBox.nextElementSibling.classList.contains("flask-container")) {
      return; 
    }
    const flaskContainer = document.createElement("div");
    flaskContainer.className = "flask-container";

    const flask = document.createElement("div");
    flask.className = "flask";
    const pourBtn = document.createElement("button");
    pourBtn.textContent = "Pour the liquid";
    pourBtn.className = "pour-btn";

    pourBtn.addEventListener("click", () => {
    pourLiquid(side);
});
    flaskContainer.appendChild(flask);
    flaskContainer.appendChild(pourBtn);

    targetBox.insertAdjacentElement("afterend", flaskContainer);
  }
});
