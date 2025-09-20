document.querySelector('.btn.fire').addEventListener('click', () => {
  if (!experimentStarted) {
    alert("⚠️ Please start the experiment first.");
    return;
  }

  if (lastReturnedFrom === 'acid') {
    alert("⚠️ The bone is currently acid-treated! Can't apply fire treatment now.");
    return;
  }

  clearTimers();

  const bone = document.querySelector('.bone');
  const gif = document.querySelector('.gif-container');

  const boneRect = bone.getBoundingClientRect();
  const gifRect = gif.getBoundingClientRect();

  const boneCenterX = boneRect.left + boneRect.width / 2;
  const boneCenterY = boneRect.top + boneRect.height / 2;

  const gifCenterX = gifRect.left + gifRect.width / 2;
  const gifCenterY = gifRect.top + gifRect.height / 2;

  const deltaX = gifCenterX - boneCenterX;
  const deltaY = gifCenterY - boneCenterY;

  bone.style.transition = 'transform 1s ease';
  bone.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

  fireTimeoutId = setTimeout(() => {
    let remainingTime = 9;
    timer.textContent = remainingTime;
    timer.style.display = 'block';

    fireIntervalId = setInterval(() => {
      remainingTime--;
      timer.textContent = remainingTime;
      if (remainingTime <= 0) {
        clearInterval(fireIntervalId);
        fireIntervalId = null;
        timer.style.display = 'none';
      }
    }, 1000);
  }, 1000);

  fireTimeoutId = setTimeout(() => {
    bone.style.transform = 'translate(0, 0)';
    lastReturnedFrom = 'fire';
  }, 10000);
});
