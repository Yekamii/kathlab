(function () {
  const stage = document.getElementById('hcStage');
  if (!stage) return;

  const fxLayer = stage.querySelector('.hc-fx-layer');

  const labeled = { A: { dna: false, protein: false }, B: { dna: false, protein: false } };

  
  document.addEventListener('click', (e) => {
    const activePhage = stage.querySelector('.hc-phage.hc-active');
    if (activePhage && !activePhage.contains(e.target)) {
      activePhage.classList.remove('hc-active');
    }
  });

  stage.querySelectorAll('.hc-phage').forEach(phage => {
    const mode = phage.getAttribute('data-mode');
    const id = phage.getAttribute('data-phage');
    const actionBtn = phage.querySelector('.hc-action');

    
    const dotIndicator = document.createElement('span');
    dotIndicator.className = 'hc-btn-dot ' + (mode === 'dna' ? 'p32' : 's35');
    actionBtn.prepend(dotIndicator);

    
    phage.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('hc-action')) return;
      stage.querySelectorAll('.hc-phage').forEach(p => p.classList.remove('hc-active'));
      phage.classList.add('hc-active');
    });

    
    actionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mode === 'dna') {
        labelDNA(phage, id);
      } else {
        labelProtein(phage, id);
      }
    });
  });

  function labelDNA(phageEl, id) {
    if (labeled[id].dna) { bounce(phageEl); return; }
    const svg = phageEl.querySelector('svg');
    const dnaGroup = svg.querySelector('.hc-dna');
    flightBurstTo(svg, phageEl, 'p32');
    addPersistentDots(svg, dnaGroup, 'p32', 18);
    labeled[id].dna = true;
    settle(phageEl);
  }

  function labelProtein(phageEl, id) {
    if (labeled[id].protein) { bounce(phageEl); return; }
    const svg = phageEl.querySelector('svg');
    const capsid = svg.querySelector('.hc-capsid');
    flightBurstTo(svg, phageEl, 's35');
    addPersistentDots(svg, capsid, 's35', 18, { aroundStroke: true });
    labeled[id].protein = true;
    settle(phageEl);
  }

  function settle(phageEl) {
    phageEl.classList.remove('hc-active');
    phageEl.animate(
      [{ filter: 'brightness(1.0)' }, { filter: 'brightness(1.2)' }, { filter: 'brightness(1.0)' }],
      { duration: 550, easing: 'ease-out' }
    );
  }

  function bounce(phageEl) {
    phageEl.animate(
      [
        { transform: 'scale(1.06)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1.06)' }
      ],
      { duration: 220, easing: 'ease-out' }
    );
  }

  function flightBurstTo(svg, phageEl, type) {
    const rect = phageEl.getBoundingClientRect();
    const target = {
      x: rect.left + rect.width * 0.45 + window.scrollX,
      y: rect.top + rect.height * -0.6 + window.scrollY
    };
    const btn = phageEl.querySelector('.hc-action');
    const btnRect = btn.getBoundingClientRect();
    const start = {
      x: btnRect.left + btnRect.width / 2 + window.scrollX,
      y: btnRect.top + window.scrollY
    };

    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('div');
      dot.className = 'hc-fx-dot' + (type === 's35' ? ' s35' : '');
      fxLayer.appendChild(dot);
      const sx = start.x + (Math.random() - 0.5) * 50;
      const sy = start.y + (Math.random() - 0.5) * 12;
      placeDot(dot, sx, sy);
      const tx = target.x + (Math.random() - 0.5) * (rect.width * 0.25);
      const ty = target.y + (Math.random() - 0.5) * (rect.height * 0.25);
      dot.animate(
        [
          { opacity: 0, transform: 'translate(-50%,-50%) scale(.5)' },
          { opacity: 1, offset: 0.15 },
          { opacity: 1, transform: 'translate(-50%,-50%) scale(1)', offset: 0.3 },
          { opacity: 0.9, transform: 'translate(-50%,-50%) scale(1)' }
        ],
        { duration: 1000 + Math.random() * 400, easing: 'cubic-bezier(.2,.7,.2,1)' }
      );
      tweenPosition(dot, sx, sy, tx, ty, 1000 + Math.random() * 400, () => { dot.remove(); });
    }
  }

  function placeDot(dot, x, y) {
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
  }

  function tweenPosition(node, x0, y0, x1, y1, duration, onDone) {
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      const x = x0 + (x1 - x0) * ease;
      const y = y0 + (y1 - y0) * ease;
      placeDot(node, x, y);
      if (p < 1) requestAnimationFrame(tick);
      else onDone && onDone();
    }
    requestAnimationFrame(tick);
  }

  function addPersistentDots(svg, targetNode, type, count = 16, opts = {}) {
    const dotsGroup = svg.querySelector('.hc-dots');
    const addCircle = (cx, cy) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('r', 3.2);
      c.setAttribute('cx', cx);
      c.setAttribute('cy', cy);
      c.setAttribute('class', type === 's35' ? 'hc-dot--s35' : 'hc-dot--p32');
      dotsGroup.appendChild(c);
      c.animate(
        [   { transform: 'scale(.2)', opacity: 0 },
            { transform: 'scale(.6)', opacity: 0.5, offset: 0.5 },
            { transform: 'scale(1)', opacity: 1 }],
        { duration: 900, easing: 'ease-out' }
      );
    };

    if (opts.aroundStroke && targetNode.tagName.toLowerCase() === 'polygon') {
      const pts = [...targetNode.points].map(p => ({ x: p.x, y: p.y }));
      pts.push({ x: pts[0].x, y: pts[0].y });
      const edges = [];
      let total = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        edges.push({ a, b, len });
        total += len;
      }
      for (let i = 0; i < count; i++) {
        const d = Math.random() * total;
        let acc = 0, seg = edges[0];
        for (const e of edges) { acc += e.len; if (d <= acc) { seg = e; break; } }
        const t = Math.random();
        const x = seg.a.x + (seg.b.x - seg.a.x) * t + (Math.random() - 0.5) * 3;
        const y = seg.a.y + (seg.b.y - seg.a.y) * t + (Math.random() - 0.5) * 3;
        addCircle(x, y);
      }
    } else {
      const box = targetNode.getBBox();
      for (let i = 0; i < count; i++) {
        const x = box.x + box.width * Math.random();
        const y = box.y + box.height * Math.random();
        addCircle(x, y);
      }
    }
  }
})();
