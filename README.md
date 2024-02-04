# PRUEBA DE INGRESO A BEMASTER - PARTE 2 - DESARROLLADOR FULLSTACK / BACKEND GABRIEL OLIVEIRA

En el presente repositorio se encuentra la API-REST solicitada para la gestión de videos, a continuación se detallan algunas consideraciones y se expone una breve documentación de la misma.


### Desarrollo

> Se presenta una API-REST **con autenticación mediante JWT utilizando passport.js** como middleware. Con MongoDB como base de datos no-Sql, para alamacenar los datos de usuarios y videos. Asi mismo, se han cumplido todas las historias de usuario descritas en el PDF enviado. He tenido las ganas de extenderme mucho más a través de la construcción de mas endpoints y propiedades pero el tiempo apremia un poco.

> Se ha hecho énfasis principalmente en la validación de los datos de entrada y respuestas para cada endpoint, **se utiliza express-validator** para validar los datos de entrada y logica de programación adicional para validar ciertos casos que requieren respuestas especificas.

> Se han cubierto los casos de autenticación para videos de acuerdo a su privacidad.

> Utilizo un cluster sencillo de MongoDB atlas que se conecta a la API, de esta forma solo es necesario correr la app y automáticamente se conecta a la nube.




### Rutas implementadas:

## Usuario


Registrar Usuario: POST 
- http://localhost:5000/api/auth/register
 
Iniciar Sesión: POST
- http://localhost:5000/api/auth/login

Modificar usuario: PATCH
- http://localhost:5000/api/user

Eliminar Usuario: DELETE 
- http://localhost:5000/api/user

Obtener usuario por Id: GET
- http://localhost:5000/api/user/:id

Obtener usuario por username: GET
- http://localhost:5000/api/user/:username



## Videos


Crear video: POST 
- http://localhost:5000/api/video
- Autenticación requerida

```
BODY: {
    "owner": "owner/userId",
    "video_name": "nombre de video, no puede ser vacío",
    "privacy": "public/private",
    "file_url": "https://www....",
    "description": "descripción corta, no puede ser vacía"
}
```

Dar LIKE a un video: POST

- http://localhost:5000/api/video/addLike
- Sin autenticación 

```
BODY: {
    "videoId": "VideoId"
}
```

Dar DISLIKE a un video: POST
- http://localhost:5000/api/video/addDislike
- Sin autenticación 

```
BODY: {
    "videoId": "VideoId"
}
```

Comentar un video: POST
- http://localhost:5000/api/video/addComment
- Sin autenticación 

```
BODY: {
    "videoId": "VideoId",
    "text":"Este es mi comentario"
}
```


Agregar un colaborador al video: POST
- http://localhost:5000/api/video/:USER_ID
* Autenticación requerida (se valida que el usuario que hace la petición sea el dueño del video)

```
BODY: {
    "videoId": "VideoId",
    "userId": "usercolaboratorId"
}
```

Modificar datos de un video: PATCH
- http://localhost:5000/api/video/
* Autenticación requerida (se valida que no se puedan modificar de esta forma, los likes, dislikes, comentarios y colaboradores) 

```
BODY: {
    "videoId": "",
    "owner": "owner/userId",
    "video_name": "Nombre de video",
    "privacy": "public/private",
    "file_url": "https://www.youtube.com/watch?v=P7iC-fbdKmQ&t=597s",
    "description": "Nueva descripción",
}
```


Eliminar un video: DELETE
- http://localhost:5000/api/video/
* Autenticación requerida

```
BODY: {
    "videoId": "65bfb5d2dd713aaf13f5df75"
}
```

Obtener el Top 10 de videos (con más likes): GET
- http://localhost:5000/api/video/top
* Si el usuario está autenticado, regresa videos públicos y privados, si no hay autenticación se regresan solo los videos públicos


Obtener video por Id: GET
- http://localhost:5000/api/video/:ID
* Si el usuario está autenticado y el video es privado, regresa su info, si no está autenticado, regresa un 401, 


Obtener todos los videos de un usuario: GET
- http://localhost:5000/api/video/:USER_ID
* Autenticación requerida 



## Abrir la carpeta y en una terminal ejecutar:


```
npm install
```

y posterior a ello

```
npm run start
```


*Nota importante: Debido a una situación familiar delicada, no pude dedicar tiempo al desarollo de la prueba el dia sábado, esto me imposibilitó dedicar tiempo a la creación de pruebas unitarias y a la creación del Swagger. Para compensar un poco la documentación en Swagger, he organizado la colección de Postman que creé para realizar pruebas locales, la exporté y la incluyo acá, allí está una breve documentación. Y en cuanto a la realización de las pruebas, puedo garantizar que poseo conocimiento en la escritura de las mismas puesto que he trabajado previamente con jest y supertest*