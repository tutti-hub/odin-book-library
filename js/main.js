const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readCheckBox = document.querySelector('#read');
const addBookButton = document.querySelector('#add-book-btn');
const booksListDiv = document.querySelector('.books-list');
const dialog = document.querySelector('dialog');
const showDialogButton = document.querySelector('#show-dialog-btn');
const addBookDialogButton = document.querySelector('#add-book-dialog-btn');

showDialogButton.addEventListener('click', (event) => {
    dialog.showModal();
});

addBookDialogButton.addEventListener('click', (event) => {
    dialog.close();
});

addBookDialogButton.addEventListener('click', (event) => {
    const book = new Book(titleInput.value,
                          authorInput.value,
                          pagesInput.value,
                          readCheckBox.checked);
    const newBookId = addBookToLibrary(book);
    const bookItem = createListItem(book, newBookId);
    booksListDiv.appendChild(bookItem);

});

booksListDiv.addEventListener('click', (event) => {
    if(event.target.classList.contains("del-btn")) {
        event.preventDefault();
        const id = event.target.dataset.bookId;
        const book = findBookById(id);
        if(confirm(`Delete book '${book.title}'?`)){

            const itemToDelete = booksListDiv.querySelector('[data-book-id="' + id + '"]');
            removeBook(id);
            itemToDelete.remove();
        }


    } else if(event.target.type === "checkbox") {
        toggleBookReadStatus(event.target.dataset.bookId);
    }
});

let myLibrary = [
    new Book('The Atlas Six', 'Olivie Blake', 576),
    new Book('As Good As Dead', 'Holly Jackson', 536),
    new Book('In America', 'Susan Sontag', 480)
];

function Book(title, author, pages, read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    return myLibrary.push(book) - 1;
}

function removeBook(id) {
    myLibrary.splice(id, 1);
}

function findBookById(id) {
    return myLibrary[id];
}

function toggleBookReadStatus(id) {
    myLibrary[id].read = !myLibrary[id].read;
}

function createListItem(book, id) {
    const bookListItem = document.createElement('div');
    bookListItem.className = "books-list-item";
    bookListItem.dataset.bookId = id;

    bookListItem.innerHTML = `<div class="books-list-item-title" >
        ${book.title}
    </div>
    <div class="books-list-item-author">
        ${book.author}
    </div>
    <div class="books-list-item-pages">
        ${book.pages} pages
    </div>
    <div>
        <input type="checkbox">
        <span>Read this book</span>
    </div>`;

    const checkBox = bookListItem.querySelector('input[type="checkbox"]');
    checkBox.checked = book.read;
    checkBox.dataset.bookId = id;

    bookListItem.insertAdjacentHTML('beforeend', `<button data-book-id='${id}' class="del-btn" type="button">Delete</button>`);

    return bookListItem;
}

function showBooks() {
    booksListDiv.innerHTML = "";
    myLibrary.forEach((e, i) => {
        booksListDiv.appendChild(createListItem(e, i));
    });
}

showBooks();


