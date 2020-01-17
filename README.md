# rocketseat-bootcamp

Sistema criado durante o bootcamp da Rocketseat para agendamentos de serviços de beleza.

Consiste de:

- API REST desenvolvida em <b>Nodejs</b>
- site em <b>React</b> para os fornecedores dos serviços
- app em <b>React Native</b> para os clientes.

## Instalação e execução

- Backend:
  1. Na pasta backend:
  ```bash
      yarn
  ```
  2. executar a fila
  ```bash
      yarn queue
  ```
  3. executar o servidor express
  ```bash
      yarn dev
  ```
- Web:
  1. Na pasta web:
  ```bash
      yarn
  ```
  2.
  ```bash
      yarn start
  ```

Algumas das biliotecas/ferramentas utilizadas:

- Backend:

  - express
  - sequelize
  - mongoose
  - be-queue: para processamento de jobs de envio de email
  - nodemailer
  - io-redis: cache de alguns endpoints
  - yup: validação de dados
  - jsonwebtoken
  - bcryptjs
  - sentry
  - date-fns

- Web:
  - react
  - styled-components
  - redux
  - redux-saga
  - redux-persist
  - reactotron
  - immer
  - polished
  - date-fns
  - yup
