"use client";
import NavBar from "@/components/NavBar";
import { useUser } from "@/contexts/UserProvider";
import Image from "next/image";

export default function Home() {
  const { logout } = useUser();
  return (
    <>
      <NavBar />
      <button onClick={logout}>Cerrar Sesion</button>
    </>
  );
}
