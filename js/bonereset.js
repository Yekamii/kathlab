let fireTimeoutId = null;
let fireIntervalId = null;
let acidTimeoutId = null;
let acidIntervalId = null;

let acidOpacityTimeoutId = null;

const timer = document.querySelector('.countdown-timer');

function clearTimers() {
  if (fireTimeoutId !== null) {
    clearTimeout(fireTimeoutId);
    fireTimeoutId = null;
  }
  if (fireIntervalId !== null) {
    clearInterval(fireIntervalId);
    fireIntervalId = null;
  }
  if (acidTimeoutId !== null) {
    clearTimeout(acidTimeoutId);
    acidTimeoutId = null;
  }
  if (acidIntervalId !== null) {
    clearInterval(acidIntervalId);
    acidIntervalId = null;
  }
  if (acidOpacityTimeoutId !== null) {
  clearTimeout(acidOpacityTimeoutId);
  acidOpacityTimeoutId = null;
  }

  if (timer) {
    timer.textContent = '';
    timer.style.display = 'none';

  }
}

document.querySelector('.btn.res').addEventListener('click', () => {
  experimentStarted = false;
  lastReturnedFrom = null;

  const bone = document.querySelector('.bone');
  const acid = document.querySelector('.acidliquid');
  const gif = document.querySelector('.gif-container');

  bone.style.transition = 'opacity 1s ease-out';
  bone.style.opacity = '0';
  bone.style.filter = 'blur(0px)';
  bone.style.backgroundImage = "url('../img/bone.png')";

 
 acid.style.animation = 'none';
 acid.offsetHeight;
 acid.style.animation = 'drain-down 1s forwards ease-out';


acidOpacityTimeoutId = setTimeout(() => {
  acid.style.opacity = '0';
}, 4000);

  gif.style.opacity = '0';

  
  clearTimers();

  document.querySelector('.btn.start').classList.add('attention');

  
});
