
document.querySelectorAll('.showcase-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});


window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.showcase-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    setTimeout(() => {
      card.style.transition = 'all 1.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 300);
  });
});
