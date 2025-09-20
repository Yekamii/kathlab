(() => {
  function getSideElements(side) {
    const blenderBoxes = document.querySelectorAll(".blender-box");
    const idx = side === "left" ? 0 : 1;
    const box = blenderBoxes[idx];
    if (!box) return {};

    const jar = box.querySelector(".jar");
    const liquid = jar ? jar.querySelector(".liquid-fill") : null;

    const next = box.nextElementSibling;
    const flaskContainer =
      next && next.classList.contains("flask-container") ? next : null;
    const flask = flaskContainer ? flaskContainer.querySelector(".flask") : null;

    return { box, jar, liquid, flask, idx };
  }

  window.pourLiquid = function (side) {
    const { box, jar, liquid, flask } = getSideElements(side);
    if (!box || !jar || !flask) return;
    if (flask.dataset.poured === "true") return;

    const jarHeight = jar.clientHeight || 1;
    const currentPx = liquid ? liquid.offsetHeight : 0;
    let targetPercent = Math.round((currentPx / jarHeight) * 100);
    if (!targetPercent || targetPercent <= 0) targetPercent = 56;

    let tubeFill = flask.querySelector(".tube-fill");
    if (!tubeFill) {
      tubeFill = document.createElement("div");
      tubeFill.className = "tube-fill";
      flask.appendChild(tubeFill);
    }

    if (liquid) {
      if (liquid.classList.contains("liquid-greenblue")) {
        tubeFill.classList.add("liquid-greenblue");
      } else if (liquid.classList.contains("liquid-redblue")) {
        tubeFill.classList.add("liquid-redblue");
      }
    }

    if (liquid) {
      liquid.style.transition = "height 2s linear, opacity 2s linear";
      void liquid.offsetHeight;
      liquid.style.height = "100%";
      liquid.style.opacity = "0";
    }
    
    setTimeout(() => {
      tubeFill.style.transition = "height 2s linear";
      void tubeFill.offsetHeight;
      tubeFill.style.height = targetPercent + "%";

      setTimeout(() => {
        flask.dataset.poured = "true";
        checkBothPoured();
      }, 2000 + 3000);
    }, 500);

    // ღილაკის გათიშვა
    const flaskContainer = flask.parentElement;
    const btn = flaskContainer.querySelector(".pour-btn");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Poured";
    }
  };

  function checkBothPoured() {
    const flasks = document.querySelectorAll(".flask");
    if (flasks.length < 2) return;

    const bothPoured = Array.from(flasks).every(
      (f) => f.dataset.poured === "true"
    );
    if (!bothPoured) return;

    flasks.forEach((flask, idx) => {
      const flaskContainer = flask.parentElement;
      flaskContainer.style.transition = "transform 2.5s ease";
      flaskContainer.style.transform = "translate(-178px, 250px)";

      let centrifugeBtn = flaskContainer.querySelector(".centrifuge-btn");
      if (!centrifugeBtn) {
        centrifugeBtn = document.createElement("button");
        centrifugeBtn.textContent = "Centrifuge";
        centrifugeBtn.className = "centrifuge-btn";
        centrifugeBtn.addEventListener("click", () =>
          startCentrifuge(flask, idx)
        );
        flaskContainer.appendChild(centrifugeBtn);
      }
    });

    const main = document.querySelector("main");
    if (main) {
      main.style.paddingBottom = "200px";
    }
  }
  function startCentrifuge(flask, idx) {
    const flaskContainer = flask.parentElement;

    let overlay = document.createElement("div");
    overlay.className = "centrifuge-overlay";
    flaskContainer.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();

      const tubeFill = flask.querySelector(".tube-fill");
      if (tubeFill) {
        tubeFill.innerHTML = ""; 
        tubeFill.style.height = "100%";
        tubeFill.style.display = "flex";
        tubeFill.style.flexDirection = "column";

        const top = document.createElement("div");
        top.style.flex = "1";
        top.style.background = "blue";
        top.style.position = "relative";
        top.style.borderRadius = "30px 30px 0 0";
        top.classList.add("top-half");

        const bottom = document.createElement("div");
        bottom.style.flex = "1";
        bottom.style.background = "#ebb670e8";
        bottom.style.position = "relative";
        bottom.classList.add("bottom-half");

        tubeFill.appendChild(top);
        tubeFill.appendChild(bottom);

        const addBalls = (container, color) => {
          for (let i = 0; i < 6; i++) {
            let ball = document.createElement("div");
            ball.style.width = "8px";
            ball.style.height = "8px";
            ball.style.borderRadius = "50%";
            ball.style.background = color;
            ball.style.position = "absolute";
            ball.style.left = Math.random() * 80 + "%";
            ball.style.top = Math.random() * 80 + "%";
            container.appendChild(ball);
          }
        };

        if (idx === 0) {
          addBalls(top, "limegreen");
        } else if (idx === 1) {
          addBalls(bottom, "red");
        }
      }
    }, 4000);
  }
})();
