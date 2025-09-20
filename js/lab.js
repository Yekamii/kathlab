const buttons = document.querySelectorAll(".lab-sidebar ul li");
const cards = document.querySelectorAll(".lab-card");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.cat;
    cards.forEach(card => {
      card.style.display = (cat === "all" || card.dataset.cat === cat) ? "block" : "none";
    });
  });
});