export function mountComponentFilters() {
  const controls = document.querySelector('[data-component-filters]');
  if (!controls) return;
  const cards = [...document.querySelectorAll('[data-component-group]')];
  controls.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      controls.querySelectorAll('[data-filter]').forEach((control) => {
        control.setAttribute('aria-pressed', String(control === button));
      });
      cards.forEach((card) => {
        card.hidden = selected !== 'All' && card.dataset.componentGroup !== selected;
      });
    });
  });
}
