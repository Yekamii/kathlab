document.querySelector('.btn.start').classList.add('attention');



document.querySelector('.btn.start').addEventListener('click', () => {
  experimentStarted = true;

  const acid = document.querySelector('.acidliquid');
  const bone = document.querySelector('.bone');
  const gif = document.querySelector('.gif-container');

  
  acid.style.animation = 'none';  
  acid.offsetHeight;           
  acid.style.animation = 'fill-up 2s forwards ease-in'; // თავიდან ანიმაცია
  acid.style.opacity = '1';
  
  

  setTimeout(() => {
    bone.style.transition = 'opacity 2.5s ease-in';
    gif.style.opacity = '1';
  }, 800);

  setTimeout(() => {
    gif.style.transition = 'opacity 1s ease-in';
    gif.style.opacity = '1';
  }, 700);

  
  if (timer) {
    timer.style.display = 'block';
    
  }

  document.querySelector('.btn.start').classList.remove('attention');
});
