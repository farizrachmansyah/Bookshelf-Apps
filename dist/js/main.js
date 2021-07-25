document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const searchButton = document.querySelectorAll('.search-btn');
  const searchField = document.querySelectorAll('.search-field');

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
  searchField.forEach(field => {
    let bookContainer = field.parentElement.parentElement.nextElementSibling;
    let bookItem = Array.from(bookContainer.getElementsByClassName('book-item'));
    let bookTitle = [];
    
    bookItem.forEach(item => {
      bookTitle.push(item.children[0].children[0]);
    });

    field.addEventListener('keyup', () => {
      let filterKey = field.value.toLowerCase();

      bookTitle.forEach((title, index) => {
        if(title.textContent.indexOf(filterKey) > -1) {
          bookItem[index].style.display = '';
        } else {
          bookItem[index].style.display = 'none';
        }
      })
    });
  });

  if(isStorageExist()) {
    loadData();
    refreshDataFromStorage();
  }
})

// document.addEventListener('ondataloaded', () => {
// })