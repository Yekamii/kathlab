function addSalt(side) {
  const leftValue = Number(document.getElementById('leftSalt').value);
  const rightValue = Number(document.getElementById('rightSalt').value);
  const leftTube = document.querySelector('.tube.left .water');
  const rightTube = document.querySelector('.tube.right .water');

  const diff = leftValue - rightValue;
  const maxHeight = 65;
  let leftHeight = maxHeight;
  let rightHeight = maxHeight;

  if (diff > 0) {
    leftHeight = maxHeight + diff * 0.3;
    rightHeight = maxHeight - diff * 0.3;
  } else if (diff < 0) {
    leftHeight = maxHeight - Math.abs(diff) * 0.3;
    rightHeight = maxHeight + Math.abs(diff) * 0.3;
  }

  const saltIcon = document.getElementById(`salt-${side}`);
  if (saltIcon) {
    saltIcon.style.opacity = '1'; 
    saltIcon.classList.remove('show'); 
    void saltIcon.offsetWidth;
    saltIcon.classList.add('show');

   
    setTimeout(() => {
      saltIcon.style.opacity = '0';
      saltIcon.classList.remove('animate');
    }, 3000);
  }

  
  setTimeout(() => {
    leftTube.style.height = Math.max(20, Math.min(90, leftHeight)) + '%';
    rightTube.style.height = Math.max(20, Math.min(90, rightHeight)) + '%';
  }, 3000);
}