import React from "react"
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import ContactList from "./components/contacts/ContactList/ContactList";
import AddContact from "./components/contacts/AddContact/AddContact";
import ViewContact from "./components/contacts/ViewContact/ViewContact";
import EditContact from "./components/contacts/EditContact/EditContact";
import Spinner from "./components/Spinner/Spinner";




let App =()=> {
  return (
    <>
    
      <NavBar/>
      <Routes>
        <Route  exact path="/" element={<Navigate to="/contacts/list"/>}></Route>
        <Route exact path="/contacts/list" element={<ContactList/>}></Route>
        <Route exact path="/contacts/add" element={<AddContact/>}></Route>
        <Route exact path="/contacts/view/:contactId" element={<ViewContact/>}></Route>
        <Route exact path="/contacts/edit/:contactId" element={<EditContact/>}></Route>
      </Routes>
    </>
  );
}

export default App;
