const saltRange = document.getElementById('saltRange');
const innerTube = document.querySelector('.inner-tube');
const startButton = document.querySelector('.start-infusion');


const normalErythrocytes = `
  <div class="erythrocyte cell"></div>
  <div class="erythrocyte1 cell"></div>
  <div class="erythrocyte2 cell"></div>
  <div class="erythrocyte3 cell"></div>
`;

const burstingErythrocytes = `
  <div class="bursting-erythrocyte cell">
    <div class="burst"></div>
    <div class="particle"></div>
    <div class="particle delay1"></div>
    <div class="particle delay2"></div>
    <div class="particle delay3"></div>
  </div>
  <div class="bursting-erythrocyte cell">
    <div class="burst"></div>
    <div class="particle"></div>
    <div class="particle delay1"></div>
    <div class="particle delay2"></div>
    <div class="particle delay3"></div>
  </div>
  <div class="bursting-erythrocyte cell">
    <div class="burst"></div>
    <div class="particle"></div>
    <div class="particle delay1"></div>
    <div class="particle delay2"></div>
    <div class="particle delay3"></div>
  </div>
  <div class="bursting-erythrocyte cell">
    <div class="burst"></div>
    <div class="particle"></div>
    <div class="particle delay1"></div>
    <div class="particle delay2"></div>
    <div class="particle delay3"></div>
  </div>
`;

const fullCells = `
  <div class="full-cell cell"></div>
  <div class="full-cell cell"></div>
  <div class="full-cell cell"></div>
  <div class="full-cell cell"></div>
`;

const spikyCells = `
  <div class="spiky-cell cell"><img class="hyper" src="img/hyper.png" alt="#"></div>
  <div class="spiky-cell cell"><img class="hyper" src="img/hyper.png" alt="#"></div>
  <div class="spiky-cell cell"><img class="hyper" src="img/hyper.png" alt="#"></div>
  <div class="spiky-cell cell"><img class="hyper" src="img/hyper.png" alt="#"></div>
`;


saltRange.value = 2;
innerTube.innerHTML = normalErythrocytes;


function morphCells(newContent) {
  const oldCells = innerTube.querySelectorAll('.cell');

  oldCells.forEach((cell) => {
    cell.style.transition = 'all 2.5s ease';
    cell.style.transform = 'scale(0.7)';
    cell.style.filter = 'blur(2px)';
    cell.style.opacity = '0.5';
  });


  setTimeout(() => {
    innerTube.innerHTML = newContent;

    const newCells = innerTube.querySelectorAll('.cell');
    newCells.forEach((cell) => {
      cell.style.opacity = '0.3';
      cell.style.transform = 'scale(1.3)';
      cell.style.filter = 'blur(3px)';
      cell.style.transition = 'all 5s ease';
    });

    setTimeout(() => {
      newCells.forEach((cell) => {
        cell.style.opacity = '1';
        cell.style.transform = 'scale(1)';
        cell.style.filter = 'blur(0)';
      });
    }, 20);
  }, 500);
}


startButton.addEventListener('click', () => {
  const val = parseFloat(saltRange.value);

  switch (val) {
    case 0:
      morphCells(burstingErythrocytes); 
      break;
    case 1:
      morphCells(fullCells); 
      break;
    case 2:
      morphCells(normalErythrocytes); 
      break;
    case 3:
      morphCells(spikyCells); 
      break;
    default:
      morphCells(normalErythrocytes);
  }
});
