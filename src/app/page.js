"use client"
import { useUser } from "@/contexts/UserProvider";
import Image from "next/image";

export default function Home() {
  const {logout} = useUser()
  return (
  <>
   este es el contenido principal
   <button onClick={logout}>Cerrar Sesion</button>
  </>
  );
}
