const leftButton = document.querySelector('.left-us');
const rightButton = document.querySelector('.right-us');
const leftRadios = document.querySelectorAll('input[name="left-us"]');
const rightRadios = document.querySelectorAll('input[name="right-us"]');
const mouse = document.querySelector('.mouse');
const divider = document.querySelector('.divider');

let mousePosition = 'right';


function flipAndJump(target) {
  return new Promise(resolve => {
    if (mouse.classList.contains('jumping')) return resolve();

    mouse.style.transform = target === 'left' ? 'scaleX(-1)' : 'scaleX(1)';
    mouse.classList.add('jumping');

    mouse.addEventListener('animationend', () => {
      const dividerX = divider.offsetLeft + divider.offsetWidth / 2;

      if (target === 'left') {
        mouse.style.right = "auto";
        mouse.style.left = (dividerX - mouse.offsetWidth - 10) + 'px';
        mousePosition = 'left';
      } else {
        mouse.style.left = "auto";
        mouse.style.right = (800 - dividerX - 10) + 'px';
        mousePosition = 'right';
      }

      mouse.classList.remove('jumping');
      resolve();
    }, { once: true });
  });
}

// Manual button clicks
leftButton.addEventListener("click", async () => {
  if (getSelectedValue(leftRadios) === 0) return;
  if (mousePosition === "left") await flipAndJump("right"); 
});

rightButton.addEventListener("click", async () => {
  if (getSelectedValue(rightRadios) === 0) return;
  if (mousePosition === "right") await flipAndJump("left"); 
});


function getSelectedValue(radios) {
  const selected = Array.from(radios).find(r => r.checked);
  return selected ? parseFloat(selected.value) : 0;
}


function syncUSButtons(changedRadio, groupName) {
  const val = changedRadio.value;
  const otherGroup = groupName === 'left-us' ? 'right-us' : 'left-us';
  document.querySelectorAll(`input[name='${otherGroup}']`).forEach(r => {
    r.checked = (r.value === val);
  });
}

document.querySelectorAll("input[name='left-us']").forEach(r => r.addEventListener("change", e => syncUSButtons(r, 'left-us')));
document.querySelectorAll("input[name='right-us']").forEach(r => r.addEventListener("change", e => syncUSButtons(r, 'right-us')));
