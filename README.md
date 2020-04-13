# Policy
Proyecto que calcula la poliza de seguro.

Se asume por la respuesta del servicio que obtiene la info de datos para calcular la poliza que el campo `has_dental_care` si viene en falso no se debe sumar del costo total de la poliza.


#### Requirements
- Node.js 13.6.0

## Development

#### Instalar dependencias
Ejecuta `npm install` o `npm i` para instalar las dependencias del proyecto.

#### Ejecutar localmente
Ejecuta `npm start` para levantar localmente el proyecto.
Para acceder a la aplicación puedes ir a: http://localhost:4242/policy

#### Ejecutar test
Ejecuta `npm run test` para ejecutar los unit test e integration test.

### Serverless
No se pudo lograr la integracion con Serverless ya que pedía una cuenta en AWS la cual tuvo un problema al ser creada obteniendo el mensaje de:
````Your service sign-up is almost complete!

Thanks for signing up with Amazon Web Services. Your services may take up to 24 hours to fully activate. If you’re unable to access AWS services after that time, here are a few things you can do to expedite the process:

    Make sure you provided all necessary information during signup. Complete your AWS registration.
    Check your email to see if you have received any requests for additional information. If you have, please respond to those emails with the information requested.
    Verify your credit card information is correct. Also, check your credit card activity to see if there’s a $1 authorization (this is not a charge). You may need to contact your card issuer to approve the authorization.

If the problem persists, please contact Support: ```
