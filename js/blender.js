document.addEventListener("DOMContentLoaded", () => {
  const bacteriaStage = document.querySelector(".hc-bacteria-stage"); 

  let blenderShown = { left: false, right: false };

  function showBlenderIfReady() {
    let blenderContainer = document.querySelector(".blender-container");
    if (!blenderContainer) {
      blenderContainer = document.createElement("div");
      blenderContainer.className = "blender-container";
      bacteriaStage.insertAdjacentElement("afterend", blenderContainer);
    }

    ["left", "right"].forEach(side => {
      if (!blenderShown[side]) {
        blenderShown[side] = true;

        const blenderBox = document.createElement("div");
        blenderBox.className = "blender-box";

        
        const blenderText = document.createElement("div");
        blenderText.textContent = "Grab the infected bacterium and drop it into the blender!";
        blenderText.style.fontWeight = "600";
        blenderText.style.fontSize = "14px";
        blenderText.style.marginBottom = "10px";
        blenderText.style.textAlign = "center";
        blenderBox.appendChild(blenderText);
        

        const blenderWrapper = document.createElement("div");
        blenderWrapper.className = "blender";

        const lid = document.createElement("div");
        lid.className = "lid";

        const jar = document.createElement("div");
        jar.className = "jar";

        const handle = document.createElement("div");
        handle.className = "handle";

        const base = document.createElement("div");
        base.className = "base";

        const button = document.createElement("div");
        button.className = "button";

        base.appendChild(button);
        blenderWrapper.appendChild(lid);
        blenderWrapper.appendChild(jar);
        blenderWrapper.appendChild(handle);
        blenderWrapper.appendChild(base);

        blenderBox.appendChild(blenderWrapper);
        blenderContainer.appendChild(blenderBox);
      }
    });
  }

  document.addEventListener("phageInfected", () => {
    setTimeout(showBlenderIfReady, 3000);
  });
});
