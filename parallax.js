document.addEventListener('scroll', updateParallax);

updateParallax();

function updateParallax() {
  const cards = document.querySelectorAll('.card, .btn-large');

  for (const card of cards) {
    const offset = card.offsetTop - window.pageYOffset;

    if (offset > window.innerHeight) {
      continue;
    }

    const value = Math.max((offset / window.innerHeight) * 4 - 3, 0);

    if (value === 0) {
      card.style.removeProperty('transform');
    } else {
      card.style.setProperty(
        'transform',
        `scale(${1 - value * 0.1}) translate(0, ${value * 5}vh)`
      );
    }
  }
}
