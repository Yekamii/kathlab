function enablePhageDragging() {
  const phages = document.querySelectorAll(".hc-phage");
  const bacteria = document.querySelectorAll(".hc-bacterium");

  let canDrag = true; 

  phages.forEach(phage => {
    let dragging = false;
    let clone = null;

    phage.addEventListener("mousedown", (e) => {
      if (!canDrag) return;

      clone = phage.cloneNode(true);
      clone.classList.add("draggable-phage");
      clone.style.position = "absolute";
      clone.style.width = "90px";
      clone.style.aspectRatio = "1/1.4";
      clone.style.cursor = "grab";
      clone.style.zIndex = "999";
      document.body.appendChild(clone);

      dragging = true;
      moveClone(e, clone);
    });

    document.addEventListener("mousemove", (e) => {
      if (!canDrag) return;
      if (dragging && clone) {
        moveClone(e, clone);
      }
    });

    document.addEventListener("mouseup", (e) => {
      if (!canDrag || !dragging || !clone) return;
      dragging = false;

      let droppedOn = null;
      bacteria.forEach(bact => {
        const rect = bact.getBoundingClientRect();
        if (
          e.clientX > rect.left &&
          e.clientX < rect.right &&
          e.clientY > rect.top &&
          e.clientY < rect.bottom
        ) {
          droppedOn = bact;
        }
      });

      if (droppedOn) {
        droppedOn.classList.add("infected");
        const btn = droppedOn.querySelector(".hc-infect-btn");
        if (btn) btn.style.display = "inline-block";

        clone.style.left = e.pageX - clone.offsetWidth / 2 + "px";
        clone.style.top = e.pageY - clone.offsetHeight / 2 + "px";
        clone.style.cursor = "default";

        document.dispatchEvent(new Event("phageInfected"));
      } else {
        clone.remove();
      }

      clone = null;
    });
  });

  function moveClone(e, clone) {
    clone.style.left = e.pageX - clone.offsetWidth / 2 + "px";
    clone.style.top = e.pageY - clone.offsetHeight / 2 + "px";
  }

 
  document.addEventListener("phageInfected", () => {
    setTimeout(() => {
      canDrag = false;
    }, 6000); 
  });
}
