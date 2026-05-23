import express from 'express';
import cors from 'cors';
import { connectToMongoDB } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Bienvenido al cine Iplacex'
    });
});

app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

connectToMongoDB()
    .then(() => {
        console.log('Conexion a MongoDB Atlas exitosa');

        app.listen(PORT, () => {
            console.log(`Servidor Express iniciado en puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error conectando a MongoDB Atlas');
        console.error(error);
    });