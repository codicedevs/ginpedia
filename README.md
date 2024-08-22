<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Description

Nest Base es un repositorio base, ejemplo y documentacion. Sirve como punto de partida para un proyecto en Codice.

# Instalación

- Clona el repositorio con tu usuario de bitbucket : https://miusuario@bitbucket.org/codicedev/nest-base.git || git@bitbucket.org:codicedev/nest-base.git
- Ejecuta el siguiente comando para instalar las dependencias dentro de nest-base:

  ```bash
  yarn install
  ```

- Esto instalará las siguientes dependencias:

  @nestjs/common: Proporciona funcionalidades esenciales para construir aplicaciones Nest.js.<br/>
  @nestjs/config: Módulo para gestionar la configuración de la aplicación.<br/>
  @nestjs/jwt: Módulo para la gestión de JWT en aplicaciones Nest.js.<br/>
  @nestjs/platform-express: Proporciona integración con Express, un marco web para Node.js.<br/>
  @nestjs/typeorm: Integración de TypeORM con Nest.js para la gestión de bases de datos.<br/>
  dotenv: Carga variables de entorno desde un archivo .env para la configuración.<br/>
  pg: Controlador de PostgreSQL para Node.js.<br/>
  reflect-metadata: Biblioteca para reflejar metadata en TypeScript.<br/>
  rxjs: Biblioteca para programación reactiva en JavaScript.<br/>
  typeorm: ORM (Mapeo Objeto-Relacional) para TypeScript y JavaScript.<br/>

# Creacion de una base de datos local con postgres (ubuntu/linux)

- Por consola

  **sudo apt install postgresql** : ese comando instalara postgres <br/>
  **sudo -u postgres psql**, para ingresar a postgres , tambien puede ser : psql -U postgres<br/>
  deberiamos ver en nuestra terminal : postgres=# , lo que indica que estamos dentro de postgres<br/>
  **postgres=# CREATE DATABASE nestbase;** , nuestro comando para crear la base de datos local debe verse asi<br/>
  **postgres=# \l** eso nos permite acceder a todas nuestras bases de datos y deberiamos encontrar una que se llama nestbase<br/>
  antes de empezar a hacer consultas necesitamos asegurarnos que nuestra base de datos local esta activa y eso lo hacemos con <br/>
  este ultimo comando : **sudo systemctl status postgresql**<br/>
  si quisieramos cambiar la contraseña por defecto podemos hacerlo dentro de psql con el comando **postgres=# \password**
  finalmente, en caso de necesitar activacion : sudo systemctl start postgresql<br/>

  Con estos pasos, has creado una base de datos local con PostgreSQL en tu sistema Ubuntu/Linux y <br/>
  Te has asegurado de que esté activa para recibir solicitudes. <br/>
  Ahora puedes proceder con las operaciones necesarias<br/>

# Configuración del entorno (por defecto al crear postgres como base de datos segun lo documentado)

- Crea un archivo `.env` en la raíz del proyecto.
- Agrega las siguientes variables de entorno con los valores apropiados, consultar por el SMTP para el servicio de envio de email:

  DB_TYPE=postgres</br>
  DB_HOST=localhost</br>
  DB_PORT=5432</br>
  DB_USERNAME=postgres</br>
  DB_PASSWORD=postgres</br>
  DB_DATABASE=nestbase</br>
  JWT_ACCESS_SECRET=secretkeyaccesstoken</br>
  JWT_ACCESS_EXPIRES=15m</br>
  JWT_REFRESH_SECRET=secretkeyrefreshtoken</br>
  JWT_REFRESH_EXPIRES=15d</br>
  SERVER_PORT=3001</br>

- La contraseña por defecto es postgres

## Correr la aplicacion (por defecto puerto 3000)

```bash
# development
$ yarn  start

# watch mode 
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

```


```
