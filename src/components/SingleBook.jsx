/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();
        setBook(data.book);
        setIsCheckedOut(data.book.isCheckedOut || false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAction = async (action) => {
    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}/${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong.");
      }

      setIsCheckedOut(action === "checkout");
      alert(`Book ${action === "checkout" ? "checked out" : "returned"} successfully!`);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>{book.description}</p>

      {token ? (
        isCheckedOut ? (
          <button onClick={() => handleAction("return")}>Return Book</button>
        ) : (
          <button onClick={() => handleAction("checkout")}>Checkout Book</button>
        )
      ) : (
        <p>You must log in to check out books.</p>
      )}
    </div>
  );
}

export default SingleBook;

