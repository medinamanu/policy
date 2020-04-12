import express from 'express';
import App from './app';

const server = express();

server.use("/", App.getPublicRoutes());


server.listen(4242, () => {
  console.log('Express Server is running...');
});

export default server;
