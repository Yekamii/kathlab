
const LABS_JSON_URL = 'data/labs.json';


const gridEl = document.getElementById('labGrid');
const catButtons = document.querySelectorAll('.lab-sidebar ul li');


if (!gridEl) {
  console.info('labs-loader: no #labGrid found on this page; skipping lab load.');
} else {
  
  let LABS = [];

  
  async function loadLabs() {
    try {
      const res = await fetch(LABS_JSON_URL);
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      LABS = await res.json();
      renderLabs('all');
      updateCategoryCounts();
    } catch (err) {
      console.error('Failed to load labs.json', err);
      gridEl.innerHTML = '<p style="color:#ff6b6b;">Failed to load Labs.</p>';
    }
  }

  
  function renderLabs(cat = 'all') {
    gridEl.innerHTML = '';

    const filtered = LABS.filter(lab => cat === 'all' || lab.category === cat);

    if (!filtered.length) {
      gridEl.innerHTML = '<p style="color:#ccc;text-align:center;">No labs in this category yet.</p>';
      return;
    }

    filtered.forEach(lab => {
      const card = document.createElement('div');
      card.className = `lab-card cat-${lab.category}`;
      card.dataset.cat = lab.category;
      card.innerHTML = `
        ${lab.thumb ? `<img src="${lab.thumb}" alt="${lab.title}">` : ''}
        <h4>${lab.title}</h4>
        <p>${lab.summary}</p>
        <div class="lab-meta">${capitalize(lab.level)} • ${lab.duration} min</div>
        <a href="${lab.interactive_url}" class="btn-explore">Start</a>
      `;
      gridEl.appendChild(card);
    });
  }

  function updateCategoryCounts() {
    const counts = { all: LABS.length };
    LABS.forEach(lab => {
      counts[lab.category] = (counts[lab.category] || 0) + 1;
    });

    catButtons.forEach(btn => {
      const cat = btn.dataset.cat;
      const span = btn.querySelector('.cat-count');
      if (span) {
        span.textContent = counts[cat] !== undefined ? `(${counts[cat]})` : '(0)';
      }
    });
  }

  
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderLabs(btn.dataset.cat);
    });
  });

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  
  loadLabs();
}
