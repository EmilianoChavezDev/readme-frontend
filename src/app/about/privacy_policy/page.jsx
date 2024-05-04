"use client";

const PolicyPage = () => {
  return (
    <div className="flex">
      <div className="hidden sm:block w-1/6 bg-gray-300 p-4 dark:bg-dark-darkColorNavBar h-screen border-2 border-r-gray-500">
        <ul className="space-y-2 ">
          <li>
            <a
              href="#informacion-recopilada"
              className="hover:text-black text-gray-700"
            >
              1. Información que recopilamos
            </a>
          </li>
          <li>
            <a
              href="#como-utilizamos"
              className="hover:text-black text-gray-700"
            >
              2. Cómo utilizamos su información
            </a>
          </li>
          <li>
            <a
              href="#compartir-informacion"
              className="hover:text-black text-gray-700"
            >
              3. Compartir su información
            </a>
          </li>
          <li>
            <a href="#seguridad" className="hover:text-black text-gray-700">
              4. Seguridad
            </a>
          </li>
          <li>
            <a
              href="#cambios-politica"
              className="hover:text-black text-gray-700"
            >
              5. Cambios en esta Política de Privacidad
            </a>
          </li>
          <li>
            <a href="#contacto" className="hover:text-black text-gray-700">
              6. Contacto
            </a>
          </li>
        </ul>
      </div>
      <div className="w-5/6 p-10">
        <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
        <section id="informacion-recopilada" className="mb-8">
          <h2 className="text-2xl font-semibold">
            1. Información que recopilamos
          </h2>
          <p>
            Cuando utiliza nuestra Aplicación, recopilamos diversos tipos de
            información para diversos fines para brindar y mejorar nuestros
            servicios. Podemos recopilar información personalmente identificable
            que nos proporciona directamente, como su nombre, dirección de
            correo electrónico, dirección postal, número de teléfono, detalles
            de contacto y otros datos similares.
          </p>
          <p>
            Además, cuando utiliza nuestra Aplicación, podemos recopilar cierta
            información automáticamente, incluida información sobre su
            dispositivo, su dirección IP, su ubicación, el tipo de navegador que
            utiliza, los sitios web que visita antes y después de utilizar
            nuestra Aplicación, y otra información de uso.
          </p>
        </section>
        <section id="como-utilizamos" className="mb-8">
          <h2 className="text-2xl font-semibold">
            2. Cómo utilizamos su información
          </h2>
          <p>
            Utilizamos la información que recopilamos para diversos fines,
            incluidos, entre otros, los siguientes:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Para proporcionarle nuestros servicios y productos.</li>
            <li>
              Para mejorar, personalizar y expandir nuestros servicios y
              productos.
            </li>
            <li>
              Para comprender y analizar cómo interactúa con nuestra Aplicación
              y para comunicarnos con usted.
            </li>
            <li>Para proporcionar asistencia y soporte técnico.</li>
            <li>Para cumplir con cualquier requisito legal o normativo.</li>
          </ul>
        </section>
        <section id="compartir-informacion" className="mb-8">
          <h2 className="text-2xl font-semibold">
            3. Compartir su información
          </h2>
          <p>
            No vendemos, alquilamos ni compartimos información personal
            identificable con terceros sin su consentimiento, excepto según lo
            permita esta Política de Privacidad o según lo exija la ley. Podemos
            compartir información no identificable con terceros para fines de
            análisis, publicidad u otros fines.
          </p>
        </section>
        <section id="seguridad" className="mb-8">
          <h2 className="text-2xl font-semibold">4. Seguridad</h2>
          <p>
            Valoramos su confianza al proporcionarnos su información personal,
            por lo que nos esforzamos por utilizar medios comercialmente
            aceptables para protegerla. Sin embargo, recuerde que ningún método
            de transmisión a través de Internet o método de almacenamiento
            electrónico es 100% seguro y confiable, y no podemos garantizar su
            seguridad absoluta.
          </p>
        </section>
        <section id="cambios-politica" className="mb-8">
          <h2 className="text-2xl font-semibold">
            5. Cambios en esta Política de Privacidad
          </h2>
          <p>
            Nos reservamos el derecho de actualizar o cambiar nuestra Política
            de Privacidad en cualquier momento. Le notificaremos cualquier
            cambio publicando la nueva Política de Privacidad en esta página. Se
            le recomienda revisar periódicamente esta Política de Privacidad
            para cualquier cambio. Los cambios en esta Política de Privacidad
            son efectivos cuando se publican en esta página.
          </p>
        </section>
        <section id="contacto" className="mb-8">
          <h2 className="text-2xl font-semibold">6. Contacto</h2>
          <p>
            Si tiene alguna pregunta o inquietud sobre esta Política de
            Privacidad, no dude en contactarnos a través de
            readmeapp@yopmal.com. Al utilizar nuestra Aplicación, usted acepta
            los términos de esta Política de Privacidad.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PolicyPage;
