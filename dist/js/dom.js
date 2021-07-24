// Bikin variable global yang nampung id dari element completed list dan uncompleted list
const UNREADED_LIST = 'unreaded-books';
const READED_LIST = 'readed-books';
const BOOK_ITEMID = 'bookId';

function addToShelf() {
  // Ambil data inputannya
  const bookTitle = document.getElementById('book-title').value;
  const bookAuthor = document.getElementById('book-author').value;
  const bookYear = document.getElementById('book-year').value;
  const isCompleted = document.getElementById('is-completed').checked;

  // Seleksi dia udah dibaca apa belum
  if(isCompleted) {
    const readedBookList = document.getElementById(READED_LIST);

    // Proses pembuatan bukunya
    const theBook = createBook(bookTitle, bookAuthor, bookYear, isCompleted);
    // Proses pembuatan objek bukunya
    const theBookObject = createBookObject(bookTitle, bookAuthor, bookYear, isCompleted);

    // Ambil id yang otomatis dibuatin dari function createBookObject. Abis itu bikin properti baru untuk theBook dan nilainya diisi dengan id yg tadi diambil
    theBook[BOOK_ITEMID] = theBookObject.id;

    // Masukin book object kedalem array biar jadi array of object alias JSON
    books.push(theBookObject);

    // Abis append masukin data ke storage, kosongin kotak nput, kasih info berhasil
    readedBookList.append(theBook);
    updateData();
    clearInputField();
    alert('Buku berhasil ditambahkan!');
  } else {
    const unreadedBookList = document.getElementById(UNREADED_LIST);

    // Proses pembuatan bukunya
    const theBook = createBook(bookTitle, bookAuthor, bookYear, isCompleted);
    // Proses pembuatan objek bukunya
    const theBookObject = createBookObject(bookTitle, bookAuthor, bookYear, isCompleted);

    // Ambil id yang otomatis dibuatin dari function createBookObject. Abis itu bikin properti baru untuk theBook dan nilainya diisi dengan id yg tadi diambil
    theBook[BOOK_ITEMID] = theBookObject.id;

    // Masukin book object kedalem array biar jadi array of object alias JSON
    books.push(theBookObject);

    // Abis append masukin data ke storage, kosongin kotak nput, kasih info berhasil
    unreadedBookList.append(theBook);
    updateData();
    clearInputField();
    alert('Buku berhasil ditambahkan!');
  }
}

function clearInputField() {
  const bookTitle = document.getElementById('book-title')
  const bookAuthor = document.getElementById('book-author')
  const bookYear = document.getElementById('book-year')
  const isCompleted = document.getElementById('is-completed');

  bookTitle.value = '';
  bookAuthor.value = '';
  bookYear.value = '';
  isCompleted.checked = false;
}

function createBook(title, author, year, completeStatus) {
  // Bikin element2nya
  const titleElement = document.createElement('h2');
  titleElement.innerText = title;

  const authorElement = document.createElement('p');
  authorElement.innerHTML = `author: <span>${author}</span>`;
  authorElement.id = 'the-author';

  const yearElement = document.createElement('p');
  yearElement.innerHTML = `released: <span>${year}</span>`;
  yearElement.id = 'the-year';

  // Bikin element buat nampung text nya
  const itemText = document.createElement('div');
  itemText.classList.add('item-text');
  itemText.append(titleElement, authorElement, yearElement);
  
  // Bikin element buttonnya
  const itemOption = document.createElement('div');
  itemOption.classList.add('item-option');
  itemOption.append(
    createMoveButton(completeStatus),
    createTrashButton()
  );

  // Masukin ke pembungkusnya
  const bookItem = document.createElement('div');
  bookItem.classList.add('book-item');
  bookItem.append(itemText, itemOption);

  return bookItem;
}

// HANDLER BUAT BIKIN BUTTON
function createButton(titleText, event) {
  const button = document.createElement('button');
  button.setAttribute('title', titleText);
  button.classList.add('option');

  // Seleksi buat nentuin icon yang sesuai antara move dan remove
  if(titleText == 'Remove book') {
    button.innerHTML = '<i class="fas fa-trash-alt"></i>';
  } else {
    button.innerHTML = '<i class="fas fa-exchange-alt"></i>';
  }

  button.addEventListener('click', (e) => event(e));

  return button;
}

// BUTTON MOVE
function moveBookToUncompleted(bookElement) {
  const unreadedBookList = document.getElementById(UNREADED_LIST);
  const bookTitle = bookElement.querySelector('.item-text > h2').innerText;
  const bookAuthor = bookElement.querySelector('#the-author > span').innerText;
  const bookYear = bookElement.querySelector('#the-year > span').innerText;

  const newBook = createBook(bookTitle, bookAuthor, bookYear, false);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  unreadedBookList.append(newBook);
  bookElement.remove();
  updateData();
  alert('Buku berhasil dipindahkan!');
}

function moveBookToCompleted(bookElement) {
  const readedBookList = document.getElementById(READED_LIST);
  const bookTitle = bookElement.querySelector('.item-text > h2').innerText;
  const bookAuthor = bookElement.querySelector('#the-author > span').innerText;
  const bookYear = bookElement.querySelector('#the-year > span').innerText;

  const newBook = createBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;

  readedBookList.append(newBook);
  bookElement.remove();
  updateData();
  alert('Buku berhasil dipindahkan!');
}

function createMoveButton(isCompleted) {
  let btnTitleAttribute = null;

  if(isCompleted) {
    btnTitleAttribute = 'Move to unreaded';
    return createButton(btnTitleAttribute, (e) => moveBookToUncompleted(e.target.parentElement.parentElement));
  } else {
    btnTitleAttribute = 'Move to readed';
    return createButton(btnTitleAttribute, (e) => moveBookToCompleted(e.target.parentElement.parentElement));
  }
}

// BUTTON REMOVE / DELETE
function removeBook(bookElement) {
  const bookTitle = bookElement.querySelector('.item-text > h2').innerText;

  const deleteConfirm = confirm(`Hapus buku ${bookTitle}?`);

  if(deleteConfirm) {
    // Cari datanya ada di posisi berapa di array, trus datanya dipotong dari array books alias diapus
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);


    bookElement.remove();
    updateData();
  }
}

function createTrashButton() {
  return createButton('Remove book', (e) => removeBook(e.target.parentElement.parentElement));
}