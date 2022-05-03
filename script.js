console.log("This is index.js");
// 1. Store all the data to the localStorage
// 2. Give another column to delete the book
// 3. Add a scrollbar to the book

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}

//Add methods to display prototype

Display.prototype.add = function (book) {
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                         <td>${book.name}</td>
                         <td>${book.author}</td>
                         <td>${book.type}</td>
                     </tr>`;
    tableBody.innerHTML += uiString;
}

//Implementong the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//Implementong the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2)
        return false;
    else
        return true;
}
//Implementong the show function
Display.prototype.show = function (type, dismessage) {
    let message = document.getElementById('msg');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message</strong>${dismessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`
    setTimeout(() => {
        message.innerHTML = '';
    }, 2000)
}

//Add submit event listener to form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);


    let display = new Display();
    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', ' Your book has been succesfully added');
    }
    else {
        display.show('error', ' Sorry your book could not be added');
    }
    e.preventDefault();

}