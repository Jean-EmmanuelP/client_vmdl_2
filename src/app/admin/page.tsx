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
    <div className="cursor-default w-screen h-screen flex justify-center items-center bg-gradient-to-b from-black to-gray-900">
      <div className="bg-white sm:p-10 p-4 w-fit h-fit rounded-md shadow-2xl gap-10 flex flex-col justify-center items-center">
        <h1 className="text-2xl">Page d&apos;Authentification</h1>
        {error && (
          <p className="absolute top-10 left-10 p-10 text-xl text-white rounded-md transition duration-150">
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
            className="cursor-pointer px-4 py-2 border flex itesm-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 hover:shadow transition duration-150"
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
