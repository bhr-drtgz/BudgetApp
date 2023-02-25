import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import CategoriesOperations from "./pages/categoriesOperations";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/edit-expense/:expenseId" element={<EditExpense />} />
          <Route path="/category-operations" element={<CategoriesOperations />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/edit-category/:categoryId" element={<EditCategory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
