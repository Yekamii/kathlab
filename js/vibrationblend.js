(function () {
  const blendedState = { left: false, right: false };

  document.addEventListener("bacteriaBlended", (e) => {
    blendedState[e.detail.side] = true;

    if (blendedState.left && blendedState.right) {
      const blenderBoxes = document.querySelectorAll(".blender-box");
      blenderBoxes.forEach((box, index) => {
        const button = box.querySelector(".button");
        const jar = box.querySelector(".jar");

        if (button) button.style.backgroundColor = "red";
        box.classList.add("vibrating");

        
        const bacteria = jar.querySelector(".hc-bacterium.clone");
        if (bacteria) {
          
          bacteria.style.transition = "transform 6s ease, opacity 6s ease";

         
          requestAnimationFrame(() => {
            bacteria.style.transform = "translateY(-80%) scale(0.3)";
            bacteria.style.opacity = "0";
          });

          
          setTimeout(() => {
            bacteria.remove();
          }, 6000);
        }

        let liquid = jar.querySelector(".liquid-fill");
        if (!liquid) {
          liquid = document.createElement("div");
          liquid.className = "liquid-fill";
          jar.appendChild(liquid);
        }

        if (index === 0) liquid.classList.add("liquid-greenblue");
        else liquid.classList.add("liquid-redblue");

        setTimeout(() => {
          box.classList.remove("vibrating");
          if (button) button.style.backgroundColor = "";
        }, 6000);
      });
    }
  });
})();
