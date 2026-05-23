import { ObjectId } from 'mongodb';
import { db } from '../common/db.js';

const actorCollection = db.collection('actores');
const peliculaCollection = db.collection('peliculas');

export const handleInsertActorRequest = async (req, res) => {

    peliculaCollection.findOne({
        nombre: req.body.idPelicula
    })
    .then(async pelicula => {

        if (!pelicula) {
            return res.status(404).json({
                mensaje: 'Pelicula no encontrada'
            });
        }

        const actorData = {
            ...req.body,
            idPelicula: pelicula._id.toString()
        };

        actorCollection.insertOne(actorData)
            .then(result => {
                res.status(201).json(result);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    })
    .catch(error => {
        res.status(500).json(error);
    });
};

export const handleGetActoresRequest = async (req, res) => {
    actorCollection.find().toArray()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

export const handleGetActorByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        actorCollection.findOne({ _id: id })
            .then(result => {
                if (!result) {
                    return res.status(404).json({ mensaje: 'Actor no encontrado' });
                }

                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json(error);
            });

    } catch {
        res.status(400).json({ mensaje: 'Id mal formado' });
    }
};

export const handleGetActoresByPeliculaRequest = async (req, res) => {
    actorCollection.find({
        idPelicula: req.params.pelicula
    }).toArray()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json(error);
    });
};