let myLibrary = [];

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

function createListItem(book, id) {
    const bookListItem = document.createElement('div');
    bookListItem.className = "book-list-item";

    bookListItem.innerHTML = `<span data-book-id='${id}'>
    ${book.title} by ${book.author},
    ${book.pages} pages</span>`;

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = book.read;
    checkBox.dataset.bookId = id;
    bookListItem.appendChild(checkBox);

    bookListItem.insertAdjacentHTML('beforeend', `<button data-book-id='${id}' class="del-btn" type="button">Delete</button>`);

    booksListDiv.appendChild(bookListItem);
}

function showBooks() {
    booksListDiv.innerHTML = "";
    myLibrary.forEach((e, i) => {
        createListItem(e, i);
    });
}

addBookDialogButton.addEventListener('click', (event) => {
    const book = new Book(titleInput.value,
                          authorInput.value,
                          pagesInput.value,
                          readCheckBox.checked);
    addBookToLibrary(book);

    showBooks();

});

booksListDiv.addEventListener('click', (event) => {
    if(event.target.classList.contains("del-btn")) {
        event.preventDefault();
        const id = event.target.dataset.bookId;
        console.log("before delete ", id, myLibrary);
        removeBook(id);
        console.log("after delete ", id, myLibrary);
        showBooks();
    } else if(event.target.type === "checkbox") {
        toggleBookReadStatus(event.target.dataset.bookId);
    }
});

function Book(title, author, pages, read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    return book;
}

function removeBook(id) {
    myLibrary.splice(id, 1);
}

function toggleBookReadStatus(id) {
    myLibrary[id].read = !myLibrary[id].read;
}


