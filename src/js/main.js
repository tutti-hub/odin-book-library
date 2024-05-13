let myLibrary = [];

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
    //const tempLib = [...myLibrary.slice(0, id), ...myLibrary.slice(id + 1, -1)];
    //myLibrary = tempLib;
    //return myLibrary;
    myLibrary.splice(id, 1);
}

function toggleBookReadStatus(id) {
    myLibrary[id].read = !myLibrary[id].read;
}


