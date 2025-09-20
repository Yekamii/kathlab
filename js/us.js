
function syncUSButtons(changedRadio, groupName) {
  const val = changedRadio.value;
  const otherGroup = groupName === 'left-us' ? 'right-us' : 'left-us';
  document.querySelectorAll(`input[name='${otherGroup}']`).forEach(r => {
    r.checked = (r.value === val);
  });
}

document.querySelectorAll("input[name='left-us']").forEach(radio => {
  radio.addEventListener("change", () => syncUSButtons(radio, 'left-us'));
});

document.querySelectorAll("input[name='right-us']").forEach(radio => {
  radio.addEventListener("change", () => syncUSButtons(radio, 'right-us'));
});
