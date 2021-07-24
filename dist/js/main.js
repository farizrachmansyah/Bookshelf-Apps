document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addToShelf();
  });

  if(isStorageExist()) {
    loadData();
    refreshDataFromStorage();
  }
})

// document.addEventListener('ondataloaded', () => {
// })