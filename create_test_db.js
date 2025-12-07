const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://root:example@db:27017/test?authSource=admin';

(async () => {
  const client = new MongoClient(uri, { connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db(); // will use `test` from the URI
    const res = await db.collection('example').insertOne({ createdAt: new Date(), ok: true });
    console.log('Inserted document id:', res.insertedId.toString());
    // show basic info
    const dblist = await client.db('admin').admin().listDatabases();
    console.log('Databases on server:', dblist.databases.map(d=>d.name));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err && err.message ? err.message : err);
    process.exit(1);
  } finally {
    try { await client.close(); } catch(e){}
  }
})();
