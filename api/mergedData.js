import { getSingleBook, deleteBook } from './bookData';
import { getSingleAuthor, deleteSingleAuthor, getAuthorBooks } from './authorData';

const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObject) => {
    getSingleAuthor(bookObject.author_id)
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((bookObject) => {
    getSingleBook(bookObject.author_id)
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

export { getBookDetails, deleteAuthorBooksRelationship, getAuthorDetails };
