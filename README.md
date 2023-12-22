# Reto Side Project

![imng](https://github.com/Sergio-Prada-963/Perfiles/assets/133453267/7c429cad-5b35-43b8-908e-84cd1112d78b)

### Video descriptivo 

[Descripcion](https://youtu.be/KyqxN8Um1Lg)

Este proyecto se basa en la creación de una aplicación web cuyo objetivo es mostrar los perfiles laborales de los campers a las empresas. Estos perfiles deben pasar por revisión y autorización de un administrador, quien determinará si el perfil está listo y apto para ser visualizado.

## Tecnologías Utilizadas

Para este proyecto, empleamos las tecnologías _Node.js_ y _Express_ para el backend, y _React_ y _Sass_ para el frontend.

## Requisitos

Para ejecutar este proyecto, es necesario tener instalados _Node_ y _npm_ en su equipo.

### Pasos para Visualizar el Proyecto:

* Descargue el archivo o clone el repositorio desde GitHub.

* Acceda a la carpeta "Perfiles" ya sea a través de Visual Studio Code o la terminal.

* Luego de acceder a esta carpeta, ingrese a la carpeta _backend_ y ejecute el comando `npm i` para instalar todas las dependencias. Repita el mismo proceso en la carpeta _package_.

* Para ejecutar el proyecto, acceda a la carpeta _backend_ y ejecute el comando `npm run dev`, que ejecutará toda la parte del backend. Después, acceda a la carpeta _package_ y ejecute el comando `npm start`. Después de un breve momento, se abrirá una ventana en su navegador con el proyecto en ejecución.

## Funcionalidades

### Home

* En la primera sección, se puede ver el home donde se muestran los perfiles de los campers aprobados por un supervisor.

* En los perfiles de los campers, se pueden visualizar sus datos y descargar certificados o hojas de vida. También hay un botón de contacto para que la empresa interesada ingrese su correo, un mensaje de información sobre la entrevista y pueda ingresar un enlace para la entrevista, si lo desea.

* También se puede acceder a las secciones de _Registro_ y _Logueo_.

### Registro y Logueo

* En la sección de registro, los campers deben registrarse con los datos solicitados en el formulario. Estos datos se validan en el backend para evitar la repetición de información.

* Deben aceptar los términos y condiciones para poder registrarse. Después de esto, se redireccionarán a la sección de _logueo_, donde deben iniciar sesión con su correo y contraseña. Luego, irán a la sección de home pero con un nuevo botón de __currículum__ con una nueva función.

### Currículum

* En esta sección, el camper puede actualizar sus datos, foto y certificados de estudios o hoja de vida, los cuales se pueden descargar.

* Al actualizar la información, el administrador o supervisor decide si aprueba o no.

### Administrador

* Para ingresar como administrador, se debe cerrar la sesión del camper si está abierta, en la sección de currículum, hacer clic en "Salir".

* En el inicio de sesión, ingrese el correo `admin@gmail.com` y la contraseña `1234567890`. Se redirigirá a la sección de home pero con un nuevo botón de _Administrar_.

* En la sección de administración, se pueden ver en tablas los campers en espera de aprobación y los activos. Se puede ver y decidir si se aprueban o eliminan. Al aprobarlos, pasarán a la tabla de Activos y serán visibles desde la página de inicio.

* En la tabla de Activos, se puede gestionar si devolver al camper a la espera para que modifique su perfil o si está en proceso de contratación para moverlo a la sección de _Contratados_.

* En la sección de Contratados, se puede gestionar si devolver al camper a _Activos_ o a _Espera_.
