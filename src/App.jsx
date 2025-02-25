//This setup enables navigation between different pages of your application.
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import bookLogo from "./assets/books.png";
import Navigations from "./components/Navigations"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
//add within the return statement (anything you want the user to see )
  return (
    <Router>
      <header>
        <h1>
          <img id="logo-image" src={bookLogo} alt="Library Logo" />
          Library App
        </h1>
        {/* Add navigation bar here */}
        <Navigations />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account token={token} />} />
      </Routes>

      <footer>
        <p>
          Complete the React components needed to allow users to browse a
          library catalog, check out books, review their account, and return
          books that they've finished reading.
        </p>
        <p>
          Don't forget to set up React Router to navigate between the different
          views of your single-page application!
        </p>
      </footer>
    </Router>
  );

}

export default App;


