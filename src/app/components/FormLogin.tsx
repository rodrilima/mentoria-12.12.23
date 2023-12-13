"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function FormLogin() {
  const { get } = useSearchParams();

  const error = get("error");

  async function auth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      callbackUrl: "/produtos",
    });
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={auth}>
      <input
        name="email"
        placeholder="E-mail"
        type="email"
        className="input input-bordered w-full max-w-xs"
        required
      />
      <input
        name="password"
        placeholder="Senha"
        type="password"
        className="input input-bordered w-full max-w-xs"
        required
      />
      <button className="btn btn-primary max-w-xs">Entrar</button>
      {error === "CredentialsSignin" && (
        <p className="text-error">Erro na autenticação.</p>
      )}
    </form>
  );
}
