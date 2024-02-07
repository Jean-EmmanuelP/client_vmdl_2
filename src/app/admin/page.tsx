"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        sessionStorage.setItem("authToken", token);
        push('/cms');
      } else {
        const { message } = await response.json();
        setError(message || "Erreur lors de la connexion.");
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la connexion.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="bg-white p-2 w-1/4 h-1/4 rounded-md shadow-2xl gap-10 flex flex-col justify-center items-center">
        <h1 className="text-2xl">Page d&apos;Authentification</h1>
        {error && (
          <p className="absolute top-10 left-10 p-10 bg-red-500 text-xl text-white rounded-md transition duration-150">
            {error}
          </p>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            className="rounded-md border p-1"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="hover:scale-110 text-xl shadow-md border border-gray-500/20 p-4 rounded-full transition duration-150"
            type="submit"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
