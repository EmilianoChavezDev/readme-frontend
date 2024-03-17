import { useUser } from "@/contexts/UserProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputSearch from "./navbar/InputSearch";
import Options from "./navbar/Options";
import UserOptions from "./navbar/UserOptions";
import MobileMenu from "./navbar/MobileMenu";

const NavBar = () => {
  const { username, logout, expiration } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!localStorage.getItem("token")) router.push("/auth/login");
  }, [isLoaded, router]);

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    const storedExpiration = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpiration);

    if (!expirationDate) {
      router.push("/auth/login");
      return;
    }

    if (expirationDate < new Date()) {
      router.push("/auth/login");
      return;
    }
  }, [expiration, router]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="relative">
        <div className="_lg:justify-between _md:px-5 bg-colorPrimario _md:py-4  _lg:flex hidden">
          {/* parte de las opciones */}
          <Options />
          {/* parte del buscador */}
          <InputSearch />
          {/* parte del usuario */}
          <UserOptions username={username} logout={logout} />
        </div>

        <div className="sticky top-0 z-50">
          <div className="flex justify-between items-center _lg:hidden bg-colorPrimario">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:text-white focus:outline-none focus:text-white transform transition-all hover:scale-110 duration-200"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="mx-auto">
              <InputSearch />
            </div>
          </div>
        </div>

        {/**menu hamburugesa */}
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
    </>
  );
};

export default NavBar;
