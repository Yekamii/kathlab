

document.querySelector('.btn.check').addEventListener('click', () => {
  const bone = document.querySelector('.bone');

  if (lastReturnedFrom === null) {
    alert(" You need to test the bone before checking the result!");
    return;
  }

  
  let leftArrow = document.createElement('div');
  leftArrow.innerHTML = '&#8658;';
  leftArrow.style.position = 'absolute';
  leftArrow.style.left = '22px';
  leftArrow.style.top = '-20px';
  leftArrow.style.fontSize = '50px';

  let rightArrow = document.createElement('div');
  rightArrow.innerHTML = '&#8656;';
  rightArrow.style.position = 'absolute';
  rightArrow.style.right = '4px';
  rightArrow.style.top = '90px';
  rightArrow.style.fontSize = '50px';

  
  const boneParent = bone.parentElement;
  boneParent.style.position = 'relative'; 
  boneParent.appendChild(leftArrow);
  boneParent.appendChild(rightArrow);

  
  setTimeout(() => {
    leftArrow.remove();
    rightArrow.remove();
  }, 2500);

  
  setTimeout(() => {
    
    bone.style.transition = 'opacity 1s ease';
    bone.style.opacity = 0;

    setTimeout(() => {
      
  
    if (lastReturnedFrom === 'fire') {
    bone.style.backgroundImage = "url('img/bonebreak.png')";
    } else if (lastReturnedFrom === 'acid') {
    bone.style.backgroundImage = "url('img/bonemog.png')";
    }
      setTimeout(() => {
        bone.style.filter = 'blur(0px)';
        bone.style.opacity = 1;
      }, 300);

    }, 1000); 
  }, 2000); 
});
