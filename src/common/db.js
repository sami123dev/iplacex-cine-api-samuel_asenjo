import { MongoClient } from 'mongodb';

const uri = process.env.EXPRESS_URI;

const client = new MongoClient(uri);

export const connectToMongoDB = async () => {
    await client.connect();
};

export const db = client.db('cine-db');