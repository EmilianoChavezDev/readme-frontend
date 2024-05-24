"use client";
import { useEffect } from "react";

const TermsOfServicePage = () => {
  const handleClick = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const links = document.querySelectorAll(".policy-link");
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    // Limpiar los event listeners al desmontar el componente
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <div>
      <div className="sm:px-10 md:px-60 py-5 ">
        <div className="sm:block p-4 dark:bg-dark-darkColorNavBar ">
          <h1 className="text-5xl font-bold mb-8">Tecnologías</h1>
          <p>Última actualización: 19/05/2024</p>
          <br />

          <p>
            En ReadMe, nos esforzamos por integrar tecnologías de vanguardia que
            mejoren la experiencia de nuestros usuarios y optimicen la forma en
            que acceden, comparten y disfrutan del contenido literario. Como
            plataforma en línea dedicada a la lectura y el intercambio de
            conocimientos, estamos comprometidos a mantener un equilibrio entre
            la innovación tecnológica y la protección de la privacidad y la
            seguridad de nuestros usuarios.
          </p>
          <p>
            Nuestro enfoque en las tecnologías se alinea con nuestros valores
            fundamentales de transparencia, accesibilidad y confianza. Cada
            avance tecnológico que implementamos está respaldado por una
            evaluación cuidadosa de su impacto en la experiencia del usuario y
            su cumplimiento con los estándares más rigurosos de seguridad y
            privacidad de datos.
          </p>
          <p>
            Además, nuestra dedicación a la privacidad se refleja en nuestros
            Principios de Privacidad, que sirven como guía en cada etapa del
            desarrollo y la implementación de nuevas tecnologías. Nos
            comprometemos a mantener un diálogo abierto con nuestros usuarios
            sobre cómo utilizamos la tecnología para mejorar su experiencia en
            la plataforma, al tiempo que protegemos su privacidad y seguridad en
            línea.
          </p>
          <p>
            En resumen, en ReadMe, abrazamos la innovación tecnológica como un
            medio para mejorar la forma en que los usuarios acceden y disfrutan
            de los libros, al tiempo que nos comprometemos a proteger y
            empoderar a nuestra comunidad de lectores en línea.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
