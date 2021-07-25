document.addEventListener('DOMContentLoaded', () => {
  if(isStorageExist()) {
    loadData();
    refreshDataFromStorage();
  }

  const form = document.getElementById('form');
  const searchButton = document.querySelectorAll('.search-btn');
  const searchFieldUnreaded = document.getElementById('search-field-unreaded');
  const searchFieldReaded = document.getElementById('search-field-readed');
  let bookItemUnreaded = document.querySelectorAll('#unreaded-books > .book-item');
  let bookItemReaded = document.querySelectorAll('#readed-books > .book-item');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addToShelf();
  });
  
  searchButton.forEach(button => {
    button.addEventListener('click', () => {
      let searchContainer = button.parentElement;
      let searchField = button.previousElementSibling;

      if(!searchContainer.classList.contains('opened')) {
        searchContainer.classList.add('opened');

        searchContainer.style.width = '50%';
        searchField.style.pointerEvents = 'all';
      } else {
        searchContainer.classList.remove('opened');

        searchContainer.style.width = '0';
        searchField.style.pointerEvents = 'none';
      }
    });
  });

  // UBAH JADI SENDIRI2 SELECTORNYA
  searchFieldUnreaded.addEventListener('input', () => {
    let filterKey = searchFieldUnreaded.value.toLowerCase();

    bookItemUnreaded.forEach(item => {
      let key = item.firstElementChild.firstElementChild.textContent;
      
      if(key.indexOf(filterKey) > -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  searchFieldReaded.addEventListener('input', () => {
    let filterKey = searchFieldReaded.value.toLowerCase();
    
    bookItemReaded.forEach(item => {
      let key = item.firstElementChild.firstElementChild.textContent;
      
      if(key.indexOf(filterKey) > -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
})