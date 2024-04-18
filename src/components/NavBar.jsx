import { useUser } from "@/contexts/UserProvider";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import InputSearch from "./navbar/InputSearch";
import Options from "./navbar/Options";
import UserOptions from "./navbar/UserOptions";
import MobileMenu from "./navbar/MobileMenu";
import useCategory from "@/hooks/useCategory";

const NavBar = ({ onSearch }) => {
  const { username, logout, expiration, isOpen, setIsOpen } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);
  const [usernameStorage, setUsernameStorage] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const path = usePathname();

  const { data: categories, fetchCategories } = useCategory();


  useEffect(() => {
    setIsLoaded(true);
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!username) return;
    setUsernameStorage(localStorage.getItem("username"));
  }, [username]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!localStorage.getItem("token") & (path !== "/auth/registrarse"))
      router.push("/auth/login");
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

  useEffect(() => {
    if (!searchParams) return;
    setSearch(searchParams.get("search"));
  }, [searchParams]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearchChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSearch = () => {
    if (!search) return;
    const query = createQueryString("search", search);
    router.push("/search" + "?" + query);
    onSearch && onSearch();
  };

  return (
    <>
      <nav className="relative">
        <div className="_lg:justify-between _md:px-5 bg-colorPrimario _md:py-4  _lg:flex hidden">
          {/* parte de las opciones */}
          <Options categories={categories} />
          {/* parte del buscador */}
          <InputSearch
            value={search}
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />
          {/* parte del usuario */}

          <UserOptions username={usernameStorage} logout={logout} />
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
              <InputSearch
                value={search}
                onChange={handleSearchChange}
                onSearch={handleSearch}
              />
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
