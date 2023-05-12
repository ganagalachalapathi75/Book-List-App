// Get the modal element
const modal = document.getElementById('modal');

// Get the button that opens the modal
const addBookBtn = document.getElementById('add-book-btn');

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName('close-btn')[0];

// Get the form and input fields
const addBookForm = document.getElementById('add-book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

// Get the list of books and initialize it with the books in the JSON file
const bookList = document.getElementById('book-list');
let books = [];
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        books = data;
        displayBooks();
    });

// Display the list of books
function displayBooks() {
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${book.title}</span><span>${book.author}</span>`;
        li.addEventListener('click', () => {
            // Navigate to the detail screen when the book is clicked
            console.log(`You clicked on ${book.title} by ${book.author}.`);
        });
        bookList.appendChild(li);
    });
}

// When the user clicks the button, open the modal
addBookBtn.onclick = function() {
    modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    modal.style.display = 'none';
};

// When the user submits the form, add the new book to the list and close the modal
addBookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newBook = {
        title: titleInput.value.trim(),
        author: authorInput.value.trim()
    };
    if (newBook.title !== '' && newBook.author !== '') {
        books.push(newBook);
        displayBooks();
        modal.style.display = 'none';
        // Reset the form
        addBookForm.reset();
    } else {
        alert('Please enter a title and an author.');
    }
});