function resetOsmosis() {
  document.getElementById('leftSalt').value = 0;
  document.getElementById('rightSalt').value = 0;

  const leftTube = document.querySelector('.tube.left .water');
  const rightTube = document.querySelector('.tube.right .water');

  leftTube.style.height = '65%';
  rightTube.style.height = '65%';

  
  const saltLeft = document.getElementById('salt-left');
  const saltRight = document.getElementById('salt-right');
  if (saltLeft) {
    saltLeft.classList.remove('show');
    saltLeft.style.opacity = '0';
  }
  if (saltRight) {
    saltRight.classList.remove('show');
    saltRight.style.opacity = '0';
  }
}