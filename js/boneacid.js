document.querySelector('.btn.acid').addEventListener('click', () => {
  if (!experimentStarted) {
    alert("⚠️ Please start the experiment first.");
    return;
  }

 
  if (lastReturnedFrom === 'fire') {
    alert("⚠️ The bone is currently fire-treated! Can't apply acid treatment now.");
    return;
  }

  clearTimers();

  const bone = document.querySelector('.bone');
  const acid = document.querySelector('.acid-container');
  const timer = document.querySelector('.countdown-timer');

  const boneRect = bone.getBoundingClientRect();
  const acidRect = acid.getBoundingClientRect();

  const boneCenterX = boneRect.left + boneRect.width / 2;
  const boneCenterY = boneRect.top + boneRect.height / 2;

  const acidCenterX = acidRect.left + acidRect.width / 2;
  const acidCenterY = acidRect.top + acidRect.height / 2;

  const deltaX = acidCenterX - boneCenterX;
  const deltaY = acidCenterY - boneCenterY;

  bone.style.transition = 'transform 1s ease';
  bone.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

  setTimeout(() => {
    bone.style.transition = 'transform 1s ease';
    bone.style.transform = `translate(${deltaX}px, ${deltaY + 60}px)`; 
  }, 1000);

  acidTimeoutId = setTimeout(() => {
    let remainingTime = 9;
    timer.textContent = remainingTime;
    timer.style.display = 'block';

    acidIntervalId = setInterval(() => {
      remainingTime--;
      timer.textContent = remainingTime;
      if (remainingTime <= 0) {
        clearInterval(acidIntervalId);
        acidIntervalId = null;
        timer.style.display = 'none';
      }
    }, 1000);
  }, 1000);

  acidTimeoutId = setTimeout(() => {
    bone.style.transform = 'translate(0, 0)';
    lastReturnedFrom = 'acid'; 
  }, 10000);
});
