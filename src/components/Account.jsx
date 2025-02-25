/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useEffect, useState } from "react";

function Account() {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/account", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBooks(data.checkedOutBooks || []))
      .catch((error) => console.error("Error fetching account data:", error));
  }, [token]);

  const handleReturn = async (bookId) => {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}/return`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to return book");

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      alert("Book returned successfully!");
    } catch (error) {
      alert("Error returning the book.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Your Account</h1>
      <h2>Checked Out Books</h2>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author}{" "}
              <button onClick={() => handleReturn(book.id)}>Return</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no checked-out books.</p>
      )}
    </div>
  );
}

export default Account;
