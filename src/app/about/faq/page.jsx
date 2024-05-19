"use client";
import Link from "next/link";
import { useEffect } from "react";

const FaqPage = () => {
  const handleClick = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const links = document.querySelectorAll(".faq-link");
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
          <h1 className="text-5xl font-bold mb-8">Preguntas Frecuentes</h1>
          <br />
          <ul className="space-y-4 space">
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <Link
                href="#pregunta-1"
                className="hover:text-blue-500 text-colorPrimario faq-link"
                onClick={handleClick}
              >
                1. ¿Cómo puedo subir un libro a ReadMe?
              </Link>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <Link
                href="#pregunta-2"
                className="hover:text-blue-500 text-colorPrimario faq-link"
                onClick={handleClick}
              >
                2. ¿Cómo puedo seguir a otros usuarios en ReadMe?
              </Link>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <Link
                href="#pregunta-3"
                className="hover:text-blue-500 text-colorPrimario faq-link"
                onClick={handleClick}
              >
                3. ¿Puedo leer libros en ReadMe sin registrarme?
              </Link>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <Link
                href="#pregunta-4"
                className="hover:text-blue-500 text-colorPrimario faq-link"
                onClick={handleClick}
              >
                4. ¿Cómo puedo reportar contenido inapropiado en ReadMe?
              </Link>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <Link
                href="#pregunta-5"
                className="hover:text-blue-500 text-colorPrimario faq-link"
                onClick={handleClick}
              >
                5. ¿Qué debo hacer si olvidé mi contraseña de ReadMe?
              </Link>
            </li>
          </ul>

          <br />
          <section id="pregunta-1" className="mb-8">
            <h2 className="text-3xl font-semibold">
              1. ¿Cómo puedo subir un libro a ReadMe?
            </h2>
            <br />
            <p>
              Para subir un libro a ReadMe, primero debes iniciar sesión en tu
              cuenta. Una vez que hayas iniciado sesión, ve al apartado de
              "escribe" y busca la opción de "Crear nuevo libro". Desde allí,
              podrás agregar cualquier información, como el título, la portada,
              la categoria y la descripción. Finalmente, simplemente sigue las
              instrucciones para completar el proceso de subida del libro.
            </p>
          </section>

          <section id="pregunta-2" className="mb-8">
            <h2 className="text-3xl font-semibold">
              2. ¿Cómo puedo seguir a otros usuarios en ReadMe?
            </h2>
            <br />
            <p>
              Para seguir a otros usuarios en ReadMe, simplemente ve al perfil
              del usuario que deseas seguir y busca el botón o enlace que dice
              "Seguir". Haz clic en ese botón y automáticamente comenzarás a
              seguir al usuario.
            </p>
          </section>

          <section id="pregunta-3" className="mb-8">
            <h2 className="text-3xl font-semibold">
              3. ¿Puedo leer libros en ReadMe sin registrarme?
            </h2>
            <br />
            <p>
              No, no puedes leer libros en ReadMe sin necesidad de registrarte.
              Sin embargo, al registrarte, tendrás acceso a una amplia variedad
              de libros y funcionalidades adicionales, como subir tus propios
              libros, seguir a otros usuarios y guardar tus libros favoritos.
            </p>
          </section>

          <section id="pregunta-4" className="mb-8">
            <h2 className="text-3xl font-semibold">
              4. ¿Cómo puedo reportar contenido inapropiado en ReadMe?
            </h2>
            <br />
            <p>
              Si encuentras contenido inapropiado en ReadMe, como libros que
              violan los derechos de autor o que contienen material ofensivo,
              puedes reportarlo fácilmente haciendo clic en el botón de
              "Reportar" que generalmente se encuentra cerca del contenido en
              cuestión. Esto alertará a nuestros moderadores, quienes revisarán
              el contenido y tomarán las medidas necesarias.
            </p>
          </section>

          <section id="pregunta-5" className="mb-8">
            <h2 className="text-3xl font-semibold">
              5. ¿Qué debo hacer si olvidé mi contraseña de ReadMe?
            </h2>
            <br />
            <p>
              Si olvidaste tu contraseña de ReadMe, puedes restablecerla
              fácilmente siguiendo los pasos de recuperación de contraseña en la
              página de inicio de sesión. Por lo general, esto implicará
              ingresar tu dirección de correo electrónico asociada con tu cuenta
              de ReadMe y seguir las instrucciones que te enviaremos por correo
              electrónico para restablecer tu contraseña.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
