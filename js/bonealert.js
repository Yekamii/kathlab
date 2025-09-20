let experimentStarted = false;
let lastReturnedFrom = null; 


document.querySelector('.btn.start').addEventListener('click', () => {
  experimentStarted = true;

  const bone = document.querySelector('.bone');
  const acid = document.querySelector('.acidliquid');
  const gif = document.querySelector('.gif-container');

  setTimeout(() => {
    bone.style.opacity = '1';
  }, 10);

  setTimeout(() => {
    acid.style.opacity = '1';
  }, 800);

  setTimeout(() => {
    gif.style.opacity = '1';
  }, 1600);
});


const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const classList = btn.classList;

    
    if (classList.contains('res')) {
      return; 
    }

    
    if (!experimentStarted) {
      alert("Please start the experiment first.");
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }

    
    if ((classList.contains('fire') || classList.contains('acid')) && lastReturnedFrom !== null) {
      alert("You have already applied a treatment. Please click 'Check Result' before applying another.");
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }

    
    if (lastReturnedFrom !== null &&
        !classList.contains('check') &&
        !classList.contains('res')) {
      alert("Please check the result or reset before continuing.");
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }
  });
});
