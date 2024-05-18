"use client";
import Link from "next/link";
import { useEffect } from "react";
import { VscChevronRight } from "react-icons/vsc";

const PolicyPage = () => {
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
         
          <h1 className="text-5xl font-bold mb-8">
            Política de Privacidad
          </h1>
          <p>Última actualización: 06/05/2024</p>
          <br></br>
          <p>
            ReadMe respeta su privacidad y se compromete a protegerla mediante
            esta Política de Privacidad. Esta Política describe cómo
            recopilamos, usamos y compartimos su información cuando utiliza
            nuestra aplicación ReadMe (en adelante, "ReadMe").
          </p>
          <br></br>
          <ul className="space-y-4 space">
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#informacion-recopilada-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                1. Información que recopilamos
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#como-utilizamos-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                2. Cómo utilizamos su información
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#compartir-informacion-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                3. Compartir su información
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#seguridad-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                4. Seguridad
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#cambios-politica-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                5. Cambios en esta Política de Privacidad
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#contacto-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                6. Contacto
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#derechos-usuario-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                7. Derechos del usuario
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#retencion-datos-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                8. Retención de datos
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#politica-cookies-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                9. Política de cookies
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#enlaces-externos-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                10. Enlaces a sitios web externos
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#menores-edad-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                11. Privacidad de los menores de edad
              </a>
            </li>
          </ul>

          <br></br>
          <section id="informacion-recopilada" className="mb-8">
            <h2
              id="informacion-recopilada-title"
              className="text-3xl font-semibold"
            >
              1. Información que recopilamos
            </h2>
            <br />
            <p>
              Cuando utiliza nuestra Aplicación, recopilamos diversos tipos de
              información para diversos fines para brindar y mejorar nuestros
              servicios. Podemos recopilar información personalmente
              identificable que nos proporciona directamente, como su nombre,
              dirección de correo electrónico, dirección postal, número de
              teléfono, detalles de contacto y otros datos similares.
            </p>
            <p>
              Además, cuando utiliza nuestra Aplicación, podemos recopilar
              cierta información automáticamente, incluida información sobre su
              dispositivo, su dirección IP, su ubicación, el tipo de navegador
              que utiliza, los sitios web que visita antes y después de utilizar
              nuestra Aplicación, y otra información de uso.
            </p>
          </section>
          <section id="como-utilizamos" className="mb-8">
            <h2 id="como-utilizamos-title" className="text-3xl font-semibold">
              2. Cómo utilizamos su información
            </h2>
            <br />
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
                Para comprender y analizar cómo interactúa con nuestra
                Aplicación y para comunicarnos con usted.
              </li>
              <li>Para proporcionar asistencia y soporte técnico.</li>
              <li>Para cumplir con cualquier requisito legal o normativo.</li>
            </ul>
          </section>
          <section id="compartir-informacion" className="mb-8">
            <h2
              id="compartir-informacion-title"
              className="text-3xl font-semibold"
            >
              3. Compartir su información
            </h2>
            <br />
            <p>
              En ReadMe, valoramos enormemente su privacidad y nos comprometemos
              a protegerla en todo momento. Es fundamental para nosotros
              garantizar la confidencialidad y seguridad de su información
              personal. En este sentido, queremos transmitirle total
              transparencia sobre cómo manejamos sus datos y bajo qué
              circunstancias los compartimos.
            </p>

            <p>
              Es importante destacar que en ningún caso vendemos, alquilamos ni
              compartimos su información personal identificable con terceros sin
              su consentimiento expreso. Consideramos que su privacidad es una
              prioridad absoluta y respetamos su derecho a controlar cómo se
              utilizan sus datos. Esta política se aplica rigurosamente y
              cualquier excepción está sujeta a las disposiciones establecidas
              en esta Política de Privacidad o requerimientos legales
              aplicables.
            </p>

            <p>
              Sin embargo, es posible que compartamos información no
              identificable con terceros con el fin de realizar análisis,
              mejorar nuestros servicios, llevar a cabo actividades de
              publicidad o para otros fines relacionados con el funcionamiento
              de la aplicación. Este tipo de información no identificable no
              incluye datos personales específicos que puedan ser directamente
              asociados con usted. Se trata de datos agregados o anonimizados
              que no permiten identificarlo de manera individual.
            </p>

            <p>
              En el caso de compartir información no identificable, lo hacemos
              con el propósito de mejorar continuamente la experiencia del
              usuario y garantizar un servicio de calidad. Estos datos pueden
              ser utilizados para entender mejor cómo se utilizan nuestros
              servicios, qué funcionalidades son más populares, cómo podemos
              personalizar la experiencia del usuario y otros aspectos
              relacionados con la optimización de la plataforma.
            </p>

            <p>
              Queremos subrayar que siempre nos comprometemos a proteger su
              información y a utilizarla de manera responsable y ética. Nuestro
              objetivo es proporcionarle un servicio seguro y confiable que
              respete su privacidad en todo momento. Si tiene alguna pregunta o
              inquietud sobre cómo manejamos sus datos, no dude en ponerse en
              contacto con nosotros a través de los canales de comunicación
              proporcionados en esta Política de Privacidad.
            </p>

            <p>
              En resumen, en ReadMe nos comprometemos a proteger su privacidad y
              a garantizar que su información se utilice de manera segura y
              ética en todo momento. Siempre respetaremos su derecho a controlar
              cómo se utilizan sus datos y nos esforzaremos por ofrecerle una
              experiencia positiva y confiable mientras utiliza nuestra
              aplicación.
            </p>
          </section>
          <section className="mb-8">
            <h2 id="seguridad-title" className="text-3xl font-semibold">
              4. Seguridad
            </h2>
            <br />
            <p>
              En ReadMe, la seguridad de su información personal es de suma
              importancia para nosotros. Reconocemos la confianza que deposita
              en nosotros al proporcionarnos sus datos, y nos comprometemos a
              utilizar todos los medios disponibles para protegerlos de manera
              efectiva.
            </p>
            <p>
              Implementamos rigurosas medidas de seguridad para salvaguardar su
              información contra accesos no autorizados, uso indebido, pérdida o
              alteración. Utilizamos tecnologías y prácticas de seguridad de
              última generación para garantizar la integridad y confidencialidad
              de sus datos.
            </p>
            <p>
              Nuestro equipo de expertos en seguridad está constantemente
              monitoreando y mejorando nuestros sistemas para adaptarse a las
              amenazas emergentes y garantizar que nuestras defensas estén
              siempre actualizadas y efectivas.
            </p>
            <p>
              Sin embargo, es importante tener en cuenta que, a pesar de todos
              nuestros esfuerzos, ningún sistema de seguridad es infalible.
              Debido a la naturaleza de la tecnología y las amenazas en
              constante evolución, no podemos garantizar una seguridad absoluta
              en todo momento.
            </p>
            <p>
              Es importante que usted también tome medidas para proteger su
              información personal. Recomendamos encarecidamente que elija
              contraseñas seguras y únicas, evite compartir información
              confidencial en lugares públicos o redes no seguras, y esté atento
              a posibles intentos de phishing o fraudes en línea.
            </p>
            <p>
              Además, es esencial que esté al tanto de los dispositivos y redes
              que utiliza para acceder a nuestros servicios. Mantener su
              software actualizado, utilizar software de seguridad confiable y
              tomar precauciones básicas de seguridad en línea son pasos
              importantes para proteger su información.
            </p>
            <p>
              En resumen, en ReadMe nos tomamos muy en serio la seguridad de su
              información personal. Implementamos medidas sólidas para proteger
              sus datos, pero también reconocemos la importancia de su
              participación activa en la protección de su propia privacidad en
              línea.
            </p>
            <p>
              Si tiene alguna pregunta o inquietud sobre la seguridad de sus
              datos o nuestras prácticas de seguridad, no dude en ponerse en
              contacto con nosotros. Estamos aquí para ayudar y asegurarnos de
              que su experiencia con nuestra aplicación sea lo más segura y
              satisfactoria posible.
            </p>
          </section>

          <section id="cambios-politica" className="mb-8">
            <h2 id="cambios-politica-title" className="text-3xl font-semibold">
              5. Cambios en esta Política de Privacidad
            </h2>
            <br />
            <p>
              En ReadMe, entendemos la importancia de mantener a nuestros
              usuarios informados sobre cualquier cambio en nuestras políticas y
              procedimientos, especialmente cuando se trata de su privacidad y
              seguridad. Por lo tanto, nos comprometemos a proporcionar
              transparencia y comunicación abierta cuando realizamos
              modificaciones en nuestra Política de Privacidad.
            </p>
            <p>
              Nos reservamos el derecho de actualizar o cambiar nuestra Política
              de Privacidad en cualquier momento y sin previo aviso. Sin
              embargo, nos esforzamos por notificar a nuestros usuarios sobre
              cualquier cambio significativo mediante la publicación de la nueva
              Política de Privacidad en esta página. Esta notificación puede
              incluir un aviso destacado en nuestro sitio web o aplicación, así
              como un correo electrónico enviado a todos los usuarios
              registrados.
            </p>
            <p>
              Es importante para nosotros que nuestros usuarios estén al tanto
              de cualquier modificación en nuestra Política de Privacidad. Por
              lo tanto, recomendamos encarecidamente que revisen periódicamente
              esta página para mantenerse informados sobre cualquier cambio. Al
              hacerlo, los usuarios pueden comprender cómo se maneja su
              información personal y qué derechos tienen en relación con su
              privacidad.
            </p>
            <p>
              Los cambios en esta Política de Privacidad entrarán en vigencia
              tan pronto como se publiquen en esta página. Por lo tanto, es
              responsabilidad del usuario estar al tanto de cualquier
              actualización y comprender cómo afecta a su relación con nuestra
              aplicación y servicios.
            </p>
            <p>
              Entendemos que los cambios en la Política de Privacidad pueden
              generar preguntas o inquietudes entre nuestros usuarios. Por esta
              razón, estamos disponibles para responder cualquier pregunta o
              proporcionar aclaraciones sobre los cambios realizados. Si tiene
              alguna duda, no dude en ponerse en contacto con nuestro equipo de
              atención al cliente.
            </p>
            <p>
              En resumen, nos comprometemos a mantener a nuestros usuarios
              informados sobre cualquier cambio en nuestra Política de
              Privacidad y a proporcionar la asistencia necesaria para
              garantizar que comprendan completamente cómo afectan esos cambios
              a su privacidad y seguridad mientras utilizan nuestra aplicación
              ReadMe.
            </p>
          </section>
          <section id="contacto" className="mb-8">
            <h2 id="contacto-title" className="text-3xl font-semibold">
              6. Contacto
            </h2>
            <br />
            <p>
              En ReadMe, valoramos la comunicación abierta y estamos aquí para
              ayudarlo con cualquier pregunta o inquietud que pueda tener sobre
              nuestra Política de Privacidad. Creemos en la importancia de
              mantener una línea de contacto directa con nuestros usuarios para
              garantizar que se sientan seguros y confiados en relación con su
              privacidad mientras utilizan nuestra aplicación.
            </p>
            <p>
              Si tiene alguna pregunta específica sobre nuestra Política de
              Privacidad o desea obtener más información sobre cómo manejamos
              sus datos personales, no dude en ponerse en contacto con nosotros.
              Estamos aquí para proporcionarle la información y el apoyo que
              necesita para comprender completamente nuestros procesos y
              políticas relacionadas con la privacidad.
            </p>
            <p>
              Puede comunicarse con nosotros a través de correo electrónico
              escribiendo a readmeapp@yopmail.com. Nuestro equipo de atención al
              cliente estará encantado de responder a sus preguntas y brindarle
              cualquier aclaración que necesite. Nos esforzamos por ofrecer
              respuestas rápidas y útiles para garantizar su completa
              satisfacción y tranquilidad.
            </p>
            <p>
              Además, queremos recordarle que al utilizar nuestra Aplicación,
              usted acepta los términos de nuestra Política de Privacidad. Estos
              términos están diseñados para proteger su privacidad y garantizar
              que sus datos se manejen de manera segura y ética en todo momento.
              Apreciamos su confianza en nosotros y nos comprometemos a mantener
              esa confianza a través de nuestras prácticas transparentes y
              responsables.
            </p>
            <p>
              No dude en contactarnos si tiene alguna pregunta adicional o si
              necesita más información sobre cualquier aspecto de nuestra
              Política de Privacidad. Estamos aquí para ayudarlo y queremos
              asegurarnos de que tenga una experiencia positiva y segura
              mientras utiliza nuestra aplicación ReadMe.
            </p>
          </section>
          <section id="derechos-usuario" className="mb-8">
            <h2 id="derechos-usuario-title" className="text-3xl font-semibold">
              7. Derechos del usuario
            </h2>
            <br />
            <p>
              Como usuario, es importante que esté plenamente informado sobre
              sus derechos con respecto a su información personal. Entendemos la
              importancia de la privacidad y la transparencia en el manejo de
              sus datos, por lo que nos comprometemos a garantizar que pueda
              ejercer estos derechos de manera efectiva y sin obstáculos.
            </p>
            <p>
              Sus derechos incluyen, entre otros, el derecho a acceder a los
              datos personales que tenemos sobre usted. Esto significa que tiene
              el derecho de solicitar y recibir una copia de los datos que
              tenemos en nuestro poder. También tiene derecho a corregir
              cualquier información inexacta o incompleta que tengamos sobre
              usted.
            </p>
            <p>
              Además, tiene derecho a actualizar su información personal si ha
              cambiado o ha habido alguna modificación relevante. Es fundamental
              que sus datos estén actualizados y precisos, por lo que nos
              comprometemos a procesar cualquier solicitud de actualización de
              manera oportuna y eficiente.
            </p>
            <p>
              Del mismo modo, tiene derecho a eliminar su información personal
              de nuestros sistemas si ya no desea que la conservemos. Esto se
              conoce como el derecho al olvido y significa que podemos eliminar
              todos sus datos personales de nuestra base de datos, siempre que
              no haya una razón legal o legítima para retenerlos.
            </p>
            <p>
              Para ejercer cualquiera de estos derechos, todo lo que necesita
              hacer es ponerse en contacto con nosotros utilizando la
              información de contacto proporcionada en esta Política de
              Privacidad. Estamos aquí para ayudarlo y facilitar el proceso de
              ejercicio de sus derechos de privacidad de datos.
            </p>
            <p>
              Nos comprometemos a procesar todas las solicitudes relacionadas
              con sus derechos de privacidad de manera rápida y eficiente.
              Valoramos su privacidad y respetamos su derecho a controlar cómo
              se utilizan sus datos personales en nuestra aplicación ReadMe.
            </p>
            <p>
              Si tiene alguna pregunta adicional sobre sus derechos de
              privacidad de datos o necesita más información sobre cómo
              ejercerlos, no dude en comunicarse con nuestro equipo de atención
              al cliente. Estamos aquí para ayudarlo y garantizar que tenga una
              experiencia positiva y segura mientras utiliza nuestra aplicación.
            </p>
          </section>
          <section id="retencion-datos" className="mb-8">
            <h2 id="retencion-datos-title" className="text-3xl font-semibold">
              8. Retención de datos
            </h2>
            <br />
            <p>
              En ReadMe, nos comprometemos a gestionar su información personal
              de manera responsable y ética. Esto significa que retenemos su
              información solo durante el tiempo necesario para cumplir con los
              fines establecidos en esta Política de Privacidad. Nos esforzamos
              por garantizar que su información se maneje de manera segura y que
              se utilice únicamente para los fines para los que fue recopilada.
            </p>
            <p>
              Nuestro objetivo es retener su información solo durante el tiempo
              que sea necesario para brindarle nuestros servicios de manera
              efectiva. Esto significa que conservaremos su información durante
              el tiempo que sea razonablemente necesario para cumplir con
              nuestros compromisos contractuales con usted, proporcionarle los
              servicios que ha solicitado y cumplir con cualquier obligación
              legal o regulatoria que podamos tener.
            </p>
            <p>
              Sin embargo, también reconocemos que puede haber circunstancias en
              las que se requiera o permita un período de retención más largo
              por ley. En tales casos, cumpliremos con cualquier requisito legal
              aplicable y retendremos su información durante el período
              requerido por la ley.
            </p>
            <p>
              Una vez que ya no necesitemos su información personal para los
              fines establecidos, nos comprometemos a eliminarla de manera
              segura o a anonimizarla para que ya no pueda identificarlo de
              manera directa. Esto significa que eliminaremos sus datos
              personales de nuestros sistemas de manera que no se puedan
              recuperar ni utilizar para identificarlo.
            </p>
            <p>
              Nuestro compromiso con la seguridad y la privacidad de sus datos
              es fundamental para nosotros. Nos esforzamos por garantizar que su
              información se maneje de manera segura y que se respeten sus
              derechos de privacidad en todo momento. Si tiene alguna pregunta
              sobre cómo gestionamos su información personal o cuál es nuestro
              período de retención de datos, no dude en ponerse en contacto con
              nuestro equipo de atención al cliente.
            </p>
            <p>
              Valoramos su confianza en nosotros y nos comprometemos a mantener
              altos estándares de protección de datos mientras utiliza nuestra
              aplicación ReadMe.
            </p>
          </section>
          <section id="politica-cookies" className="mb-8">
            <h2 id="politica-cookies-title" className="text-3xl font-semibold">
              9. Política de cookies
            </h2>
            <br />
            <p>
              En ReadMe, nos tomamos en serio la privacidad y la transparencia
              en el uso de tecnologías como las cookies en nuestra aplicación.
              Nuestra política de cookies es parte integral de nuestros
              esfuerzos para garantizar que usted tenga control sobre cómo se
              utilizan estas tecnologías y cómo afectan su experiencia de
              usuario.
            </p>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su
              dispositivo cuando visita nuestro sitio web o utiliza nuestra
              aplicación. Estas cookies nos permiten recopilar información sobre
              cómo interactúa con nuestra aplicación, qué páginas visita y qué
              funcionalidades utiliza. Esta información nos ayuda a mejorar y
              personalizar su experiencia, así como a comprender mejor cómo se
              utiliza nuestra aplicación.
            </p>
            <p>
              Nuestra Política de Cookies describe en detalle qué tipos de
              cookies utilizamos, cómo las utilizamos y con qué fines. Esto
              incluye cookies esenciales que son necesarias para el
              funcionamiento básico de nuestra aplicación, así como cookies de
              rendimiento, publicidad y seguimiento que nos ayudan a analizar el
              rendimiento de nuestra aplicación y a mostrar publicidad relevante
              para usted.
            </p>
            <p>
              Es importante destacar que usted tiene el control sobre cómo se
              utilizan las cookies en su dispositivo. Nuestra Política de
              Cookies explica cómo puede administrar y controlar estas
              tecnologías, incluida la opción de aceptar o rechazar cookies, así
              como cómo eliminar cookies que ya se han almacenado en su
              dispositivo.
            </p>
            <p>
              Al leer nuestra Política de Cookies, podrá comprender mejor cómo
              utilizamos estas tecnologías y cómo pueden afectar su privacidad y
              experiencia de usuario. Queremos asegurarnos de que tenga toda la
              información necesaria para tomar decisiones informadas sobre el
              uso de cookies en nuestra aplicación.
            </p>
            <p>
              Si tiene alguna pregunta sobre nuestra Política de Cookies o cómo
              utilizamos las cookies en nuestra aplicación, no dude en ponerse
              en contacto con nuestro equipo de atención al cliente. Estamos
              aquí para ayudarlo y proporcionarle la información y el apoyo que
              necesita para tener una experiencia segura y satisfactoria
              mientras utiliza nuestra aplicación ReadMe.
            </p>
          </section>
          <section id="enlaces-externos" className="mb-8">
            <h2 id="enlaces-externos-title" className="text-3xl font-semibold">
              10. Enlaces a sitios web externos
            </h2>
            <br />
            <p>
              En ReadMe, valoramos la transparencia y queremos asegurarnos de
              que esté completamente informado sobre cómo interactúa con nuestra
              aplicación, especialmente cuando se trata de enlaces a sitios web
              externos. Es posible que nuestra aplicación contenga enlaces a
              sitios web de terceros que no están operados ni controlados por
              nosotros.
            </p>
            <p>
              Si hace clic en un enlace que lo dirige a un sitio web de un
              tercero, es importante que tenga en cuenta que ya no está bajo
              nuestra jurisdicción. No tenemos control sobre el contenido, las
              políticas de privacidad o las prácticas de seguridad de estos
              sitios web de terceros. Por lo tanto, le recomendamos
              encarecidamente que revise la Política de Privacidad de cada sitio
              web que visite antes de proporcionar cualquier información
              personal o realizar cualquier transacción en esos sitios.
            </p>
            <p>
              Entendemos la importancia de proteger su privacidad y seguridad en
              línea, y queremos que se sienta seguro al navegar por la web.
              Siempre recomendamos ejercer precaución y diligencia al
              interactuar con sitios web de terceros. Asegúrese de revisar
              detenidamente sus políticas de privacidad y términos de uso para
              comprender cómo manejan su información y qué medidas de seguridad
              tienen en vigor.
            </p>
            <p>
              Si tiene alguna pregunta o inquietud sobre los enlaces a sitios
              web externos en nuestra aplicación o si encuentra algún enlace
              roto o inapropiado, no dude en ponerse en contacto con nuestro
              equipo de atención al cliente. Estamos aquí para ayudarlo y
              garantizar que tenga una experiencia segura y positiva mientras
              utiliza nuestra aplicación ReadMe.
            </p>
            <p>
              Nuestro compromiso es proporcionarle un servicio confiable y
              seguro, y esto incluye informarle sobre los riesgos potenciales
              asociados con el acceso a sitios web de terceros. Valoramos su
              confianza en nosotros y estamos comprometidos a proteger su
              privacidad y seguridad en todo momento.
            </p>
          </section>
          <section id="menores-edad" className="mb-8">
            <h2 id="menores-edad-title" className="text-3xl font-semibold">
              11. Privacidad de los menores de edad
            </h2>
            <br />
            <p>
              En ReadMe, nos tomamos muy en serio la protección de la privacidad
              de los niños en línea. Por esta razón, queremos asegurarnos de que
              sea plenamente consciente de nuestra política con respecto a la
              recopilación de información personal de personas menores de 18
              años.
            </p>
            <p>
              Es importante destacar que nuestra aplicación no está dirigida a
              personas menores de 18 años. No recopilamos intencionalmente
              información personal identificable de personas menores de esta
              edad. Si usted es padre, madre o tutor y tiene conocimiento de que
              su hijo o hija nos ha proporcionado información personal, le
              rogamos que se ponga en contacto con nosotros de inmediato.
            </p>
            <p>
              En el caso de que nos demos cuenta de que hemos recopilado
              información personal de un menor sin la verificación del
              consentimiento parental, tomaremos medidas inmediatas para
              eliminar esa información de nuestros servidores. Valoramos la
              seguridad y privacidad de todos nuestros usuarios, especialmente
              de los más jóvenes, y nos comprometemos a cumplir con las leyes y
              regulaciones pertinentes relacionadas con la protección de datos
              de menores en línea.
            </p>
            <p>
              Si usted es un padre, madre o tutor preocupado por la privacidad y
              seguridad en línea de su hijo o hija, le recomendamos
              encarecidamente que supervise y guíe su actividad en línea. Hay
              muchas herramientas y recursos disponibles para ayudarlo a
              proteger a sus hijos mientras navegan por Internet, y estamos aquí
              para brindarle el apoyo y la información que necesite para
              garantizar una experiencia en línea segura y positiva para toda la
              familia.
            </p>
            <p>
              Su confianza es importante para nosotros, y nos comprometemos a
              mantener altos estándares de protección de la privacidad y
              seguridad de los datos en nuestra aplicación ReadMe. Si tiene
              alguna pregunta o inquietud sobre nuestra política de privacidad
              para menores o si necesita más información, no dude en ponerse en
              contacto con nuestro equipo de atención al cliente.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
