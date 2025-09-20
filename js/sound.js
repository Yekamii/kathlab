
const bell = new Audio('sounds/ringtone.mp3');
bell.loop = false;

const csButton = document.querySelector('.cs-length');


const csRadios = document.querySelectorAll('input[name="cs-length"]');


const timerEl = document.getElementById('timer');
let countdownInterval = null;

csButton.addEventListener('click', () => {
 
  const selected = Array.from(csRadios).find(r => r.checked);
  if (!selected) return;

  const seconds = parseInt(selected.value);
  if (seconds === 0) return;


  bell.currentTime = 0;
  bell.loop = true;
  bell.play();

  let remaining = seconds;
  timerEl.textContent = remaining + " s";
  timerEl.style.display = "block";

  
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      timerEl.textContent = remaining + " s";
    } else {
      clearInterval(countdownInterval);
      timerEl.style.display = "none"; 
    }
  }, 1000);

  setTimeout(() => {
    bell.pause();
    bell.currentTime = 0;
    bell.loop = false;
  }, seconds * 1000);
});
