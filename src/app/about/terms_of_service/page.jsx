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
          <h1 className="text-5xl font-bold mb-8">Términos de Servicio</h1>
          <p>Última actualización: 19/05/2024</p>
          <br />
          <ul className="space-y-4 space">
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#aceptacion-terminos-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                1. Aceptación de los Términos
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#descripcion-servicio-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                2. Descripción del Servicio
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#registro-cuenta-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                3. Registro de Cuenta
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#uso-sitio-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                4. Uso del Sitio
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#propiedad-intelectual-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                5. Derechos de Propiedad Intelectual
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#privacidad-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                6. Privacidad
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#terminacion-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                7. Terminación
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#exencion-responsabilidad-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                8. Exención de Responsabilidad
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#limitacion-responsabilidad-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                9. Limitación de Responsabilidad
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#modificaciones-terminos-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                10. Modificaciones a los Términos
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#ley-aplicable-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                11. Ley Aplicable
              </a>
            </li>
            <li className="transition duration-300 ease-in-out transform hover:translate-x-1">
              <a
                href="#contacto-title"
                className="hover:text-blue-500 text-colorPrimario policy-link"
                onClick={handleClick}
              >
                12. Contacto
              </a>
            </li>
          </ul>

          <br />
          <section id="aceptacion-terminos" className="mb-8">
            <h2
              id="aceptacion-terminos-title"
              className="text-3xl font-semibold"
            >
              1. Aceptación de los Términos
            </h2>
            <br />
            <p>
              Bienvenido a ReadMe. Al acceder o utilizar nuestro sitio web,
              usted acepta cumplir y estar sujeto a los siguientes términos y
              condiciones ("Términos de Servicio"). Estos términos constituyen
              un acuerdo legalmente vinculante entre usted y ReadMe, y rigen su
              acceso y uso de nuestros servicios. Si no está de acuerdo con
              estos términos, no utilice nuestro sitio web.
            </p>
            <p>
              Es importante que lea detenidamente estos Términos de Servicio
              antes de comenzar a utilizar nuestra plataforma. Al aceptar estos
              términos, usted declara que tiene al menos 18 años de edad, o que
              tiene el consentimiento de un tutor legal para utilizar el
              servicio. Si está accediendo o utilizando el servicio en nombre de
              una empresa u otra entidad legal, usted declara y garantiza que
              tiene la autoridad para vincular a esa entidad a estos términos.
            </p>
            <p>
              Nuestro servicio, ReadMe, permite a los usuarios subir, leer y
              compartir libros, así como seguir a otros perfiles dentro de la
              plataforma. Al utilizar cualquier parte de nuestro sitio web,
              usted acepta estar sujeto a estos términos, independientemente de
              si se ha registrado en el sitio o no. Además, nos reservamos el
              derecho de modificar estos términos en cualquier momento, y
              cualquier cambio será efectivo inmediatamente después de su
              publicación en el sitio web. Es su responsabilidad revisar
              periódicamente estos términos para estar al tanto de cualquier
              modificación. Su uso continuado del sitio web después de la
              publicación de cualquier cambio constituirá su aceptación de
              dichos cambios.
            </p>
            <p>
              También es fundamental que comprenda que, al utilizar ReadMe, está
              sujeto a nuestras políticas de privacidad, que detallan cómo
              recopilamos, utilizamos y protegemos su información personal. Al
              aceptar estos Términos de Servicio, usted también acepta las
              prácticas descritas en nuestra Política de Privacidad.
            </p>
            <p>
              Si tiene alguna pregunta sobre estos términos, le recomendamos que
              se ponga en contacto con nosotros antes de continuar utilizando el
              sitio web. Nuestra intención es proporcionar una plataforma segura
              y justa para todos nuestros usuarios, y apreciamos su cooperación
              en mantener este entorno. Gracias por elegir ReadMe, y esperamos
              que disfrute de la experiencia de lectura y compartir libros en
              nuestra plataforma.
            </p>
          </section>
          <section id="descripcion-servicio" className="mb-8">
            <h2
              id="descripcion-servicio-title"
              className="text-3xl font-semibold"
            >
              2. Descripción del Servicio
            </h2>
            <br />
            <p>
              ReadMe es una plataforma en línea dedicada a los amantes de la
              lectura y la literatura. Nuestra plataforma permite a los usuarios
              subir, leer y compartir libros de una manera sencilla y accesible.
              Además, ofrecemos la posibilidad de seguir a otros perfiles, lo
              que fomenta una comunidad dinámica y participativa donde los
              usuarios pueden descubrir nuevos autores, géneros y
              recomendaciones de lectura.
            </p>
            <p>
              El objetivo principal de ReadMe es proporcionar un espacio
              inclusivo y enriquecedor para el intercambio de conocimientos
              literarios. Creemos firmemente en el poder de los libros para
              educar, inspirar y conectar a las personas. Por ello, hemos
              diseñado nuestra plataforma para ser intuitiva y fácil de usar,
              permitiendo que cualquier persona, independientemente de su nivel
              de experiencia con la tecnología, pueda disfrutar de nuestras
              funcionalidades.
            </p>
            <p>
              En ReadMe, los usuarios pueden subir sus propias obras literarias,
              ya sean libros completos, capítulos o extractos, y compartirlos
              con una audiencia global. Esta característica no solo permite a
              los autores emergentes encontrar una plataforma para sus trabajos,
              sino que también ofrece a los lectores una vasta biblioteca de
              contenidos diversos y enriquecedores. Los usuarios pueden navegar
              por una amplia variedad de géneros y estilos, desde ficción y no
              ficción hasta poesía y ensayos.
            </p>
            <p>
              Además, ReadMe facilita la interacción social entre los usuarios
              mediante la opción de seguir perfiles. Al seguir a otros usuarios,
              puede mantenerse actualizado sobre sus actividades, nuevas
              publicaciones y recomendaciones de libros. Esta funcionalidad
              ayuda a construir una comunidad de lectores y escritores que
              comparten intereses y pasiones similares.
            </p>
            <p>
              Nuestro compromiso es crear un entorno seguro y respetuoso donde
              se valoren las contribuciones de todos los usuarios. Por eso,
              contamos con políticas claras y herramientas de moderación para
              asegurar que el contenido compartido en nuestra plataforma cumpla
              con nuestros estándares de calidad y respeto.
            </p>
            <p>
              En resumen, ReadMe es más que una simple plataforma de lectura; es
              una comunidad vibrante de personas unidas por el amor a los libros
              y la literatura. Invitamos a todos a unirse a nosotros en este
              viaje literario y a contribuir al crecimiento y enriquecimiento de
              nuestra biblioteca compartida.
            </p>
          </section>
          <section id="registro-cuenta" className="mb-8">
            <h2 id="registro-cuenta-title" className="text-3xl font-semibold">
              3. Registro de Cuenta
            </h2>
            <br />
            <p>
              Para utilizar ciertas funciones de ReadMe, es necesario que se
              registre y cree una cuenta. Este proceso es sencillo y está
              diseñado para asegurar que cada usuario tenga una experiencia
              personalizada y segura en nuestra plataforma. Al registrarse, se
              le pedirá que proporcione cierta información personal, como su
              nombre, dirección de correo electrónico y una contraseña única.
            </p>
            <p>
              Usted es responsable de mantener la confidencialidad de su cuenta
              y contraseña. Esto incluye tomar medidas adecuadas para proteger
              su información de acceso y asegurarse de que no se comparta con
              terceros. ReadMe recomienda utilizar una contraseña fuerte, que
              combine letras mayúsculas y minúsculas, números y caracteres
              especiales, para maximizar la seguridad de su cuenta.
            </p>
            <p>
              Al crear una cuenta, usted acepta proporcionar información veraz,
              precisa y completa, y mantener esta información actualizada en
              todo momento. ReadMe se reserva el derecho de suspender o cancelar
              su cuenta si se descubre que ha proporcionado información falsa o
              engañosa, o si ha violado estos Términos de Servicio.
            </p>
            <p>
              En caso de que sospeche o tenga conocimiento de cualquier uso no
              autorizado de su cuenta, usted se compromete a notificar a ReadMe
              de inmediato. Puede hacerlo poniéndose en contacto con nuestro
              equipo de soporte a través de [correo electrónico de contacto]. Al
              recibir su notificación, tomaremos las medidas necesarias para
              proteger su cuenta, lo que puede incluir la suspensión temporal de
              su cuenta para investigar la actividad sospechosa.
            </p>
            <p>
              ReadMe no será responsable de ninguna pérdida o daño que surja del
              incumplimiento de estas responsabilidades de seguridad. Es
              fundamental que tome todas las precauciones necesarias para
              proteger su información personal y asegurarse de que su cuenta se
              utilice de manera segura y apropiada.
            </p>
            <p>
              Además, usted se compromete a no utilizar la cuenta de otra
              persona en ningún momento sin el permiso expreso del titular de la
              cuenta. Respetar la privacidad y la seguridad de las cuentas de
              otros usuarios es crucial para mantener la confianza y la
              integridad de nuestra comunidad.
            </p>
            <p>
              En resumen, la creación y gestión de su cuenta en ReadMe es un
              paso esencial para disfrutar de todas las funcionalidades que
              ofrecemos. Su diligencia en proteger su información de acceso y en
              notificar cualquier uso no autorizado contribuirá a una
              experiencia segura y positiva para todos los usuarios de nuestra
              plataforma.
            </p>
          </section>
          <section id="uso-sitio" className="mb-8">
            <h2 id="uso-sitio-title" className="text-3xl font-semibold">
              4. Uso del Sitio
            </h2>
            <br />
            <p>
              Al subir contenido a ReadMe, usted garantiza que posee los
              derechos necesarios para hacerlo y que dicho contenido no infringe
              los derechos de terceros. Usted conserva todos los derechos sobre
              su contenido, pero otorga a ReadMe una licencia mundial, no
              exclusiva, libre de regalías para utilizar, reproducir, distribuir
              y mostrar dicho contenido en relación con la operación del sitio.
            </p>
            <p>
              Esto significa que, como usuario de ReadMe, usted tiene la
              libertad de compartir sus obras literarias y creativas con otros
              usuarios de la plataforma. Sin embargo, es importante que el
              contenido que comparta cumpla con ciertos estándares de calidad y
              legalidad. No se permite la publicación de contenido que viole los
              derechos de autor de terceros, sea difamatorio, obsceno, ofensivo,
              amenazante, acosador o ilegal de alguna manera.
            </p>
            <p>
              Al compartir su contenido en ReadMe, usted contribuye al
              enriquecimiento de nuestra comunidad y a la diversidad de opciones
              disponibles para los lectores. Nuestra plataforma está diseñada
              para ser un espacio inclusivo donde los usuarios pueden explorar
              una amplia variedad de géneros y estilos literarios, así como
              descubrir nuevos talentos y perspectivas.
            </p>
            <p>
              Sin embargo, es importante recordar que con la libertad de
              compartir contenido viene una responsabilidad. Usted debe
              asegurarse de que su contenido no solo sea legal, sino también
              respetuoso y apropiado para un público diverso. Nos reservamos el
              derecho de eliminar cualquier contenido que consideremos
              inapropiado o que viole nuestros términos de servicio, y podemos
              tomar medidas adicionales si es necesario para garantizar la
              integridad de nuestra plataforma.
            </p>
            <p>Usted se compromete a no utilizar ReadMe para:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                Publicar contenido ilegal, ofensivo, difamatorio, o que infrinja
                los derechos de autor.
              </li>
              <li>
                Participar en actividades que interfieran o interrumpan el
                funcionamiento del sitio.
              </li>
              <li>
                Usar el sitio para cualquier propósito comercial no autorizado.
              </li>
            </ul>
          </section>
          <section id="propiedad-intelectual" className="mb-8">
            <h2
              id="propiedad-intelectual-title"
              className="text-3xl font-semibold"
            >
              5. Derechos de Propiedad Intelectual
            </h2>
            <br />
            <p>
              En ReadMe, reconocemos la importancia de proteger los derechos de
              propiedad intelectual de todos los elementos que componen nuestro
              sitio. Todo el contenido presente en nuestra plataforma,
              incluyendo el diseño, textos, gráficos y logotipos, es propiedad
              exclusiva de ReadMe o de terceros con los que tenemos acuerdos de
              licencia, y está protegido por las leyes de derechos de autor y
              otras leyes de propiedad intelectual.
            </p>
            <p>
              Los derechos de propiedad intelectual otorgan a los creadores y
              propietarios de contenido el control sobre el uso y la
              distribución de sus creaciones. En el caso de ReadMe, esto
              significa que no puedes copiar, reproducir, modificar, distribuir
              o utilizar de ninguna manera el contenido del sitio sin el
              consentimiento expreso de los titulares de los derechos. Cualquier
              uso no autorizado del contenido de ReadMe constituiría una
              violación de estos derechos y estaría sujeto a medidas legales.
            </p>
            <p>
              Es importante respetar los derechos de propiedad intelectual no
              solo como una obligación legal, sino también como una cuestión
              ética. Al respetar los derechos de los creadores y propietarios de
              contenido, contribuimos a fomentar un entorno en línea más justo y
              equitativo donde se valora y protege el trabajo creativo.
            </p>
            <p>
              Además, en ReadMe nos esforzamos por garantizar que todo el
              contenido que aparece en nuestro sitio cumpla con las leyes de
              derechos de autor y otros requisitos legales. Si detectas algún
              contenido en nuestro sitio que crees que infringe tus derechos de
              propiedad intelectual, te alentamos a que nos lo hagas saber de
              inmediato para que podamos tomar las medidas adecuadas.
            </p>
            <p>
              En resumen, los derechos de propiedad intelectual son
              fundamentales para proteger la creatividad y la innovación en
              línea. En ReadMe, nos comprometemos a respetar y proteger estos
              derechos, tanto los nuestros como los de otros, y a promover un
              entorno en línea donde la creatividad pueda florecer y ser
              valorada adecuadamente.
            </p>
          </section>
          <section id="privacidad" className="mb-8">
            <h2 id="privacidad-title" className="text-3xl font-semibold">
              6. Privacidad
            </h2>
            <br />
            <p>
              En ReadMe, entendemos la importancia de proteger su privacidad y
              la confidencialidad de su información personal. Por eso, hemos
              desarrollado una Política de Privacidad detallada que explica cómo
              recopilamos, utilizamos y compartimos su información cuando
              utiliza nuestros servicios en línea. Esta política está diseñada
              para proporcionar transparencia sobre nuestras prácticas de
              privacidad y para garantizar que usted tenga control sobre su
              información.
            </p>
            <p>
              Nuestra Política de Privacidad abarca diversos aspectos,
              incluyendo qué tipo de información recopilamos, cómo la
              utilizamos, con quién la compartimos y qué medidas de seguridad
              implementamos para protegerla. Al utilizar ReadMe, usted acepta
              los términos de esta política y comprende que su información
              personal será recopilada y utilizada de acuerdo con dichos
              términos.
            </p>
            <p>
              Es importante destacar que solo recopilamos la información
              necesaria para proporcionarle nuestros servicios y mejorar su
              experiencia como usuario. Esto puede incluir información como su
              nombre, dirección de correo electrónico, detalles de contacto y
              preferencias de lectura. Nunca compartiremos su información
              personal con terceros sin su consentimiento, excepto en los casos
              descritos en nuestra Política de Privacidad o cuando sea requerido
              por ley.
            </p>
            <p>
              Además, nos comprometemos a proteger su información contra el
              acceso no autorizado, el uso indebido o la divulgación.
              Implementamos medidas de seguridad técnicas y organizativas para
              proteger su información y garantizar su confidencialidad. Sin
              embargo, es importante tener en cuenta que ninguna medida de
              seguridad en línea es completamente infalible, y usted también
              juega un papel importante en proteger su propia información al
              utilizar contraseñas seguras y mantener su cuenta segura.
            </p>
            <p>
              En resumen, en ReadMe nos tomamos muy en serio su privacidad y nos
              esforzamos por cumplir con los más altos estándares de protección
              de datos. Si tiene alguna pregunta o inquietud sobre nuestra
              Política de Privacidad o cómo manejamos su información personal,
              no dude en ponerse en contacto con nuestro equipo de atención al
              cliente. Estamos aquí para ayudar y asegurarnos de que se sienta
              seguro y protegido mientras disfruta de nuestros servicios.
            </p>
          </section>
          <section id="terminacion" className="mb-8">
            <h2 id="terminacion-title" className="text-3xl font-semibold">
              7. Terminación
            </h2>
            <br />
            <p>
              En ReadMe, nos comprometemos a mantener un entorno seguro y
              respetuoso para todos nuestros usuarios. Sin embargo, en ciertas
              circunstancias, podemos encontrarnos en la necesidad de suspender
              o terminar su cuenta y acceso al sitio. Esta medida puede ser
              tomada con o sin causa, y con o sin previo aviso, de acuerdo con
              nuestros Términos de Servicio.
            </p>
            <p>
              La terminación de su cuenta puede ocurrir por varias razones, que
              pueden incluir, entre otras, la violación de nuestros Términos de
              Servicio, el incumplimiento de nuestras políticas y directrices, o
              el comportamiento que consideramos inapropiado o perjudicial para
              nuestra comunidad de usuarios. Si su cuenta es suspendida o
              terminada, ya no tendrá acceso a los servicios de ReadMe y
              cualquier contenido asociado con su cuenta puede ser eliminado.
            </p>
            <p>
              Es importante tener en cuenta que la terminación de su cuenta no
              eximirá su responsabilidad por cualquier actividad previa que haya
              violado nuestros Términos de Servicio. Además, nos reservamos el
              derecho de tomar medidas legales o tomar otras medidas apropiadas
              si consideramos que su conducta ha causado daño a ReadMe, a otros
              usuarios o a terceros.
            </p>
            <p>
              Si su cuenta es suspendida o terminada, puede que recibas una
              notificación explicando las razones detrás de esta acción. Sin
              embargo, nos reservamos el derecho de suspender o terminar cuentas
              sin previo aviso si consideramos que es necesario proteger la
              seguridad y la integridad de nuestra plataforma.
            </p>
            <p>
              En resumen, la terminación de su cuenta en ReadMe es una medida
              que tomamos en circunstancias específicas para garantizar un
              entorno seguro y respetuoso para todos nuestros usuarios. Si tiene
              alguna pregunta o inquietud sobre la terminación de su cuenta, no
              dude en ponerse en contacto con nuestro equipo de atención al
              cliente. Estamos aquí para ayudar y proporcionar la información
              que necesite.
            </p>
          </section>
          <section id="exencion-responsabilidad" className="mb-8">
            <h2
              id="exencion-responsabilidad-title"
              className="text-3xl font-semibold"
            >
              8. Exención de Responsabilidad
            </h2>
            <br />
            <p>
              En ReadMe, nos esforzamos por proporcionar un servicio de alta
              calidad a nuestros usuarios. Sin embargo, es importante entender
              que el sitio se proporciona "tal cual" y "según disponibilidad".
              Esto significa que no podemos garantizar que el sitio esté libre
              de errores o que el acceso será continuo y sin interrupciones. Por
              lo tanto, al utilizar ReadMe, usted acepta que su acceso y uso del
              sitio son bajo su propio riesgo.
            </p>
            <p>
              Es importante destacar que, en la medida máxima permitida por la
              ley, ReadMe renuncia a todas las garantías, ya sean explícitas o
              implícitas, relacionadas con el sitio y su uso. Esto incluye, pero
              no se limita a, garantías de comerciabilidad, idoneidad para un
              propósito particular, no infracción, seguridad o precisión de la
              información.
            </p>
            <p>
              Nos esforzamos por proporcionar un sitio seguro y confiable para
              nuestros usuarios, pero no podemos garantizar que el sitio esté
              libre de errores, virus u otros componentes dañinos. Tampoco
              podemos garantizar que el acceso al sitio será ininterrumpido o
              que estará disponible en todo momento. Por lo tanto, usted acepta
              que no somos responsables de ningún daño o perjuicio que pueda
              surgir del uso o la imposibilidad de uso del sitio, incluyendo
              cualquier pérdida de datos o interrupción del servicio.
            </p>
            <p>
              Es importante entender que ReadMe no asume ninguna responsabilidad
              por cualquier daño o perjuicio que pueda surgir del uso del sitio,
              ya sea directo, indirecto, incidental, especial, consecuente o de
              otro tipo, incluso si se nos ha informado de la posibilidad de
              tales daños. Esto incluye, pero no se limita a, pérdida de
              beneficios, pérdida de datos, interrupción del negocio o cualquier
              otro daño similar.
            </p>
            <p>
              En resumen, al utilizar ReadMe, usted acepta que el sitio se
              proporciona "tal cual" y que renunciamos a todas las garantías
              relacionadas con el mismo. Si tiene alguna pregunta o inquietud
              sobre esta exención de responsabilidad, no dude en ponerse en
              contacto con nuestro equipo de atención al cliente. Estamos aquí
              para ayudar y proporcionar la información que necesite.
            </p>
          </section>
          <section id="limitacion-responsabilidad" className="mb-8">
            <h2
              id="limitacion-responsabilidad-title"
              className="text-3xl font-semibold"
            >
              9. Limitación de Responsabilidad
            </h2>
            <br />
            <p>
              En ningún caso, ReadMe será responsable de cualquier daño
              indirecto, incidental, especial, o consecuente que surja de su uso
              del sitio o de cualquier contenido proporcionado por el sitio.
            </p>
          </section>
          <section id="modificaciones-terminos" className="mb-8">
            <h2
              id="modificaciones-terminos-title"
              className="text-3xl font-semibold"
            >
              10. Modificaciones a los Términos
            </h2>
            <br />
            <p>
              En ReadMe, nos reservamos el derecho de modificar estos Términos
              de Servicio en cualquier momento y a nuestra entera discreción.
              Las modificaciones entrarán en vigor inmediatamente después de su
              publicación en el sitio web. Es importante que revise
              periódicamente estos términos para estar al tanto de cualquier
              cambio, ya que su uso continuado del sitio después de la
              publicación de las modificaciones constituirá su aceptación de los
              nuevos términos.
            </p>
            <p>
              Las modificaciones a los Términos de Servicio pueden ser
              necesarias debido a cambios en la legislación aplicable, nuevas
              características del sitio, o cualquier otra razón que consideremos
              necesaria. Nos comprometemos a comunicar cualquier cambio de
              manera clara y transparente, y haremos todo lo posible para
              notificar a los usuarios sobre cualquier modificación
              significativa con anticipación.
            </p>
            <p>
              Sin embargo, es su responsabilidad revisar regularmente estos
              términos para asegurarse de estar al tanto de cualquier cambio. Su
              uso continuado del sitio después de la publicación de las
              modificaciones indicará su aceptación de los nuevos términos. Si
              no está de acuerdo con los términos modificados, le recomendamos
              que cese el uso del sitio.
            </p>
            <p>
              En resumen, en ReadMe nos reservamos el derecho de actualizar y
              modificar nuestros Términos de Servicio en cualquier momento y le
              animamos a revisarlos periódicamente para estar al tanto de
              cualquier cambio. Su uso continuado del sitio después de la
              publicación de las modificaciones indicará su aceptación de los
              nuevos términos. Si tiene alguna pregunta o inquietud sobre estos
              términos, no dude en ponerse en contacto con nuestro equipo de
              atención al cliente.
            </p>
          </section>
          <section id="ley-aplicable" className="mb-8">
            <h2 id="ley-aplicable-title" className="text-3xl font-semibold">
              11. Ley Aplicable
            </h2>
            <br />
            <p>
              Estos Términos de Servicio se regirán e interpretarán de acuerdo
              con las leyes del país en el que ReadMe tenga su sede principal,
              sin dar efecto a sus disposiciones sobre conflicto de leyes.
            </p>
          </section>
          <section id="contacto" className="mb-8">
            <h2 id="contacto-title" className="text-3xl font-semibold">
              12. Contacto
            </h2>
            <br />
            <p>
              Si tiene alguna pregunta sobre estos Términos de Servicio, puede
              contactarnos en readmeapp@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
