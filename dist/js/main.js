document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addToShelf();
  });
})