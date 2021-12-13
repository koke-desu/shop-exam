import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TopPage from "./components/TopPage";
import Cart from "./components/Cart";
import Item from "./components/Item";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import CreateItem from "./components/CreateItem";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/list" element={<ItemList />} />
        <Route path="/item/:itemId" element={<Item />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryId" element={<ItemList />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/manage" element={<div></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
