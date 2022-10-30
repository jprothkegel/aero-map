import express from 'express';
import cors from 'cors';
import mapRoutes from "./routes/mapRoutes";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const baseUrl = '/api/v1';
app.use(baseUrl, mapRoutes);

const server = app.listen(3000, () => {
  console.log('The application is listening on PORT=3000')
})

export default server;