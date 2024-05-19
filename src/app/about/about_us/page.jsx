"use client";
import Link from "next/link";
import { useEffect } from "react";

const AboutUsPage = () => {
  const handleClick = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const links = document.querySelectorAll(".about-link");
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <div>
      <div className="sm:px-10 md:px-60 py-5">
        <div className="sm:block p-4 dark:bg-dark-darkColorNavBar">
          <h1 className="text-5xl font-bold mb-8">Acerca de nosotros</h1>
          <br />
          <ul className="space-y-4 space">
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <Link
                href="#section-1"
                className="hover:text-blue-500 text-colorPrimario about-link"
                onClick={handleClick}
              >
                1. Nuestra Misión
              </Link>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <Link
                href="#section-2"
                className="hover:text-blue-500 text-colorPrimario about-link"
                onClick={handleClick}
              >
                2. Nuestros Valores
              </Link>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <Link
                href="#section-3"
                className="hover:text-blue-500 text-colorPrimario about-link"
                onClick={handleClick}
              >
                3. Nuestro Equipo
              </Link>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <Link
                href="#section-4"
                className="hover:text-blue-500 text-colorPrimario about-link"
                onClick={handleClick}
              >
                4. Nuestra Historia
              </Link>
            </li>
          </ul>

          <br />
          <section id="section-1" className="mb-8">
            <h2 className="text-3xl font-semibold">1. Nuestra Misión</h2>
            <br />
            <p>
              En ReadMe, creemos en el poder transformador de la lectura para
              educar, inspirar y conectar a las personas de todo el mundo.
              Nuestra misión es proporcionar un espacio accesible y enriquecedor
              donde los usuarios puedan explorar nuevos mundos, compartir ideas
              y encontrar inspiración a través de la palabra escrita. Nos
              comprometemos a mantener altos estándares de calidad, integridad y
              diversidad en todo lo que hacemos.
            </p>
          </section>

          <section id="section-2" className="mb-8">
            <h2 className="text-3xl font-semibold">2. Nuestros Valores</h2>
            <br />
            <p>
              En ReadMe, la integridad no es solo un concepto, es la piedra
              angular de nuestra filosofía empresarial. Nos comprometemos a
              actuar con honestidad, transparencia y ética en todas nuestras
              interacciones, tanto internas como externas. Creemos que la
              integridad es fundamental para construir relaciones sólidas y
              duraderas con nuestra comunidad de usuarios, colaboradores y
              socios.
            </p>
            <p>
              La inclusión es un valor que llevamos en nuestro ADN. En ReadMe,
              nos esforzamos por crear un entorno donde todas las voces sean
              escuchadas, valoradas y respetadas. Promovemos la diversidad en
              todas sus formas, ya que creemos que la inclusión no solo
              enriquece nuestra comunidad, sino que también impulsa la
              innovación y el crecimiento.
            </p>
            <p>
              La innovación es el motor que impulsa nuestro progreso. En ReadMe,
              abrazamos el cambio y buscamos constantemente nuevas formas de
              mejorar y evolucionar. Nos apasiona desafiar los límites de lo
              convencional y buscar soluciones creativas para satisfacer las
              necesidades de nuestros usuarios en un mundo en constante cambio.
            </p>
            <p>
              El respeto es el pilar de todas nuestras relaciones. En ReadMe,
              valoramos y celebramos las diferencias individuales, y tratamos a
              todos con dignidad y consideración. Fomentamos un ambiente de
              trabajo colaborativo y de apoyo, donde cada miembro del equipo se
              sienta valorado y empoderado para contribuir al éxito colectivo.
            </p>
          </section>

          <section id="section-3" className="mb-8">
            <h2 className="text-3xl font-semibold">3. Nuestro Equipo</h2>
            <br />
            <p>
              Nuestro equipo está formado por apasionados lectores, escritores y
              tecnólogos que comparten el compromiso de hacer de ReadMe un lugar
              vibrante y acogedor para la comunidad literaria.
            </p>
          </section>

          <section id="section-4" className="mb-8">
            <h2 className="text-3xl font-semibold">4. Nuestra Historia</h2>
            <br />
            <p>
              Fundada en 2024, ReadMe ha crecido desde sus humildes comienzos
              como una idea en la mente de sus fundadores hasta convertirse en
              una plataforma global que conecta a millones de lectores y
              escritores de todo el mundo.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
s