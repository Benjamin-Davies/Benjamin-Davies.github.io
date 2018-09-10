document.addEventListener('scroll', updateParallax);
window.addEventListener('resize', updateParallax);

updateParallax();

function updateParallax() {
  /**@type {NodeListOf<HTMLElement>} */
  const cards = document.querySelectorAll('.card, .btn-large');

  for (const card of cards) {
    const offset = card.offsetTop - window.pageYOffset;

    if (offset > window.innerHeight) {
      continue;
    }

    const value = Math.max((offset / window.innerHeight) * 4 - 3, 0);

    if (value === 0) {
      card.style.removeProperty('--parallax-value');
    } else {
      card.style.setProperty('--parallax-value', value.toString());
    }
  }
}
