import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // Declare the connection instance.
  const client = await MongoClient.connect(
    "mongodb+srv://Kaisen:Kaisen@nextcluster.omgf0nw.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  // Declare the database instance.
  const db = client.db();
  // Operate with a specific collection in the database.
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter={}) {
  // Declare the database instance.
  const db = client.db();
  // Get all the comments from the collection, sort the _id by descending order and convert it to array.
  const documents = await db.collection(collection).find(filter).sort(sort).toArray();

  return documents;
}
