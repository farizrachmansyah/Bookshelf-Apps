// localStorage key
const BOOKSHELF_LIST = 'BOOK_LIST';

let books = [];

function isStorageExist() {
  if(typeof(Storage) === undefined) {
    alert('Browser yang digunakan tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  const storageCompatibleData = JSON.stringify(books);
  localStorage.setItem(BOOKSHELF_LIST, storageCompatibleData);
}

function loadData() {
  const storageData = localStorage.getItem(BOOKSHELF_LIST);

  let realJSONData = JSON.parse(storageData);

  if(realJSONData !== null)
    books = realJSONData;

  document.dispatchEvent(new Event('ondataloaded'));
}

function updateData() {
  if(isStorageExist())
    saveData();
}

function createBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  }
}

function findBook(bookId) {
  for(book of books) {
    if(book.id === bookId)
      return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for(book of books) {
    if(book.id === bookId)
      return index;
    
    index++;
  }

  return -1;
}

function refreshDataFromStorage() {
  const readedBookList = document.getElementById(READED_LIST);
  const unreadedBookList = document.getElementById(UNREADED_LIST);

  for(book of books) {
    const newBook = createBook(book.title, book.author, book.year, book.isCompleted);
    newBook[BOOK_ITEMID] = book.id;

    book.isCompleted ? readedBookList.append(newBook) : unreadedBookList.append(newBook);
  }
}