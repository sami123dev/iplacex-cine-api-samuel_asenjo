import { ObjectId } from 'mongodb';
import { db } from '../common/db.js';

const peliculaCollection = db.collection('peliculas');

export const handleInsertPeliculaRequest = async (req, res) => {
    peliculaCollection.insertOne(req.body)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

export const handleGetPeliculasRequest = async (req, res) => {
    peliculaCollection.find().toArray()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

export const handleGetPeliculaByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        peliculaCollection.findOne({ _id: id })
            .then(result => {
                if (!result) {
                    return res.status(404).json({ mensaje: 'Pelicula no encontrada' });
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

export const handleUpdatePeliculaByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        peliculaCollection.updateOne(
            { _id: id },
            {
                $set: req.body
            }
        )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });

    } catch {
        res.status(400).json({ mensaje: 'Id mal formado' });
    }
};

export const handleDeletePeliculaByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        peliculaCollection.deleteOne({ _id: id })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json(error);
            });

    } catch {
        res.status(400).json({ mensaje: 'Id mal formado' });
    }
};