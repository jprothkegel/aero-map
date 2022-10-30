import express from 'express';
import cors from 'cors';
import mapRoutes from './routes/mapRoutes';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const baseUrl = '/api/v1';
app.use(baseUrl, mapRoutes);
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`The application is listening on PORT=${PORT}`);
});

export default server;
