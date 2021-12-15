import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TopPage from "./components/TopPage";
import Cart from "./components/Cart";
import Item from "./components/Item";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import CreateItem from "./components/CreateItem";
import { Cart as CartType } from "./database/type";

// 全体で共有するカートのcontext。

export const cartContext = createContext<
  CartType & { setCart: React.Dispatch<React.SetStateAction<CartType>> }
>({ items: [], setCart: () => {} });

function App() {
  const [cart, setCart] = useState<CartType>({ items: [] });

  return (
    <cartContext.Provider value={{ ...cart, setCart }}>
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
    </cartContext.Provider>
  );
}

export default App;
