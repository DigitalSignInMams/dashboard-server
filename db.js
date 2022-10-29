const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.

const uri =
  "MONGO URL";
const client = new MongoClient(uri);
var ObjectId = require("mongodb").ObjectId;

/**
 * Inserts a calendar event document into MongoDB
 * @param {JSONObject} doc
 * @returns ID of the inserted document, type ObjectID
 */




//// everything in here from another project, being left here for Mongo referncing



exports.insertDocument = async function insertDocument(doc) {
  let result;
  try {
    await client.connect();
    const database = client.db("calendardb");
    const eventsCollection = database.collection("events");

    result = await eventsCollection.insertOne(doc);

    if (!result.acknowledged) {
      throw "Document could not be inserted!";
    }
  } finally {
    await client.close();

    return result.insertedId;
  }
};

exports.getAllDocuments = async function getAllDocuments() {
  //MongoRuntimeError: Connection pool closed
  let results;

  try {
    await client.connect();
    const database = client.db("BlogInformation");
    const eventsCollection = database.collection("Blogs");
    await eventsCollection
      .find({})
      .toArray()
      .then((ans) => {
        results = ans;
   
      });
  } finally {
    await client.close();
    return results;
  }
};
exports.getDocument = async function getDocument(id) {
    //MongoRuntimeError: Connection pool closed
    let results;
  
    try {
      await client.connect();
      const database = client.db("BlogInformation");
      const eventsCollection = database.collection("Blogs");
      await eventsCollection
        .find({ "_id": ObjectId(id) } ) // find one doc with specific _id (mongodb id)
        .toArray()
        .then((ans) => {
          results = ans;
        });
    } finally {
      await client.close();
      return results;
    }
};


exports.getSixMostRecentDocuments = async function getSixMostRecentDocuments() {
  //MongoRuntimeError: Connection pool closed
  let results;

  try {
    await client.connect();
    const database = client.db("BlogInformation");
    const eventsCollection = database.collection("Blogs");
    await eventsCollection
      .find({}, { html: 0 })
      .sort({ date: -1 })
      .limit(6)
      .toArray()
      .then((ans) => {
        // filter out html
        results = ans;
      });
  } finally {
    await client.close();
    return results;
  }
};

/**
 * Deletes the document with the given _id
 * @param {ObjectId} _id
 */
exports.deleteDocument = async function deleteDocument(_id) {
  try {
    await client.connect();
    const database = client.db("calendardb");
    const eventsCollection = database.collection("events");
    // ObjectID not defined
    const result = await eventsCollection.deleteOne({ _id: ObjectId(_id) });
    // db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );

    if (!result.acknowledged) {
      throw "Document could not be deleted!";
    }
  } finally {
    await client.close();
  }
};
