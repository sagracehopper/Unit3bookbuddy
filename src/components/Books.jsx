/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data?.books || [])) // Ensure safety
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div>
      <h1>Library Catalog</h1>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link> by {book.author}
            </li>
          ))
        ) : (
          <p>Loading books...</p>
        )}
      </ul>
    </div>
  );
}

export default Books;
