function enableBacteriaDragging() {
  const bacteria = document.querySelectorAll('.hc-bacterium');

  bacteria.forEach(bact => {
    const img = bact.querySelector('.hc-bacteria-img');
    if (img) {
      img.setAttribute('draggable', 'false');
      img.style.userSelect = 'none';
    }

    bact.addEventListener('pointerdown', (e) => {
      if (!bact.classList.contains('infected')) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      e.preventDefault();
      bact.setPointerCapture(e.pointerId);
      bact.classList.add('dragging');

      const wrapper = makeWrapperForBacterium(bact);
      document.body.appendChild(wrapper);
      positionWrapperAt(wrapper, e.pageX, e.pageY);

      const onMove = (ev) => {
        positionWrapperAt(wrapper, ev.pageX, ev.pageY);
      };

      const onUp = (ev) => {
        tryDropIntoJar(bact, wrapper);
        bact.classList.remove('dragging');
        bact.releasePointerCapture(e.pointerId);
        bact.removeEventListener('pointermove', onMove);
        bact.removeEventListener('pointerup', onUp);
        bact.removeEventListener('pointercancel', onUp);
      };

      bact.addEventListener('pointermove', onMove);
      bact.addEventListener('pointerup', onUp, { once: true });
      bact.addEventListener('pointercancel', onUp, { once: true });
    });
  });

  function makeWrapperForBacterium(bact) {
    const bRect = bact.getBoundingClientRect();

    const wrapper = document.createElement('div');
    wrapper.className = 'drag-wrapper';
    Object.assign(wrapper.style, {
      position: 'absolute',
      left: '0px',
      top: '0px',
      zIndex: '9999',
      width: bRect.width + 'px',
      height: bRect.height + 'px',
      pointerEvents: 'none',
      transform: 'scale(0.2)',
      transformOrigin: 'center center',
      overflow: 'hidden'
    });

    const img = bact.querySelector('.hc-bacteria-img');
    if (img) {
      const imgClone = img.cloneNode(true);
      imgClone.style.pointerEvents = 'none';
      imgClone.style.display = 'block';
      imgClone.style.width = '100%';
      imgClone.style.height = '100%';
      imgClone.style.transition = 'height 3s linear'; 
      wrapper.appendChild(imgClone);
    }

    const allPhageClones = document.querySelectorAll('.draggable-phage');
    allPhageClones.forEach(ph => {
      const pr = ph.getBoundingClientRect();
      if (rectsOverlap(bRect, pr)) {
        const phClone = ph.cloneNode(true);
        phClone.style.position = 'absolute';
        phClone.style.left = (pr.left - bRect.left) + 'px';
        phClone.style.top  = (pr.top  - bRect.top)  + 'px';
        phClone.style.pointerEvents = 'none';
        phClone.style.transition = 'opacity 3s linear'; // სწრაფი ფაგების გაქრობა
        wrapper.appendChild(phClone);
      }
    });

    return wrapper;
  }

  function rectsOverlap(a, b) {
    return !(b.left > a.right ||
             b.right < a.left ||
             b.top > a.bottom ||
             b.bottom < a.top);
  }

  function positionWrapperAt(wrapper, pageX, pageY) {
    wrapper.style.left = (pageX - wrapper.offsetWidth / 3) + 'px';
    wrapper.style.top  = (pageY - wrapper.offsetHeight / 3) + 'px';
  }

  function tryDropIntoJar(bact, wrapper) {
    // თუ უკვე გამოყენებულია, აღარ დაამატოს
    if (bact.dataset.used === "true") {
      wrapper.remove();
      return;
    }

    const side = bact.dataset.side; 
    const blenderBoxes = document.querySelectorAll('.blender-box');
    let jar = null;

    if (side === "left") jar = blenderBoxes[0]?.querySelector('.jar');
    if (side === "right") jar = blenderBoxes[1]?.querySelector('.jar');

    if (!jar) {
      wrapper.remove();
      return;
    }

    
    bact.dataset.used = "true";

    jar.appendChild(wrapper);

    const jr = jar.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const offsetX = (jr.width - wrapperRect.width) / 2 - 94;
    const offsetY = (jr.height - wrapperRect.height) / 2 - 50;

    wrapper.style.transition = 'transform 220ms ease, opacity 220ms ease';
    wrapper.style.transform = 'scale(0.4)';
    wrapper.style.left = offsetX + 'px';
    wrapper.style.top  = offsetY + 'px';

    document.dispatchEvent(new CustomEvent('bacteriaBlended', {
      detail: { side: side }
    }));

    
    setTimeout(() => {
      document.querySelectorAll('.drag-wrapper').forEach(clone => {
        const inner = clone.firstChild;
        if (inner) {
          requestAnimationFrame(() => {
            inner.style.height = '0px'; 
          });
        }

        const phages = clone.querySelectorAll('.draggable-phage');
        phages.forEach(ph => {
          ph.style.opacity = '0';
        });

        setTimeout(() => clone.remove(), 3000); 
      });
    }, 3000);
  }
}
