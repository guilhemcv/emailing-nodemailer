/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [send, setSend] = useState(false);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5005/SendEmail", data)
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.error(err);
      });
    setSend(true);
  };

  return send === false ? (
    <div>
      <h1>Formulaire d'envoi de message</h1>
      <form>
        <label htmlFor="name">Nom:</label>
        <input onChange={(e) => handleChange(e)} type="text" name="name" />
        <label htmlFor="surname">Prénom:</label>
        <input onChange={(e) => handleChange(e)} type="text" name="surname" />
        <label htmlFor="phone">Téléphone:</label>
        <input onChange={(e) => handleChange(e)} type="text" name="phone" />
        <label htmlFor="email">Email:</label>
        <input onChange={(e) => handleChange(e)} type="email" name="email" />
        <label htmlFor="message">Message:</label>
        <textarea onChange={(e) => handleChange(e)} name="message" />
        <button onClick={(e) => handleSubmit(e)} type="button">
          Envoyer
        </button>
      </form>
    </div>
  ) : (
    <div className="merci">
      <h1>Merci pour l'envoi de votre message !</h1>
      <p>Nous prendrons contact avec vous très rapidement...</p>
      <button type="button">Retour à l'accueil</button>
    </div>
  );
}

export default App;
