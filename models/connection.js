const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

class Connect {
  // #conn = null;
  static async connectDB() {
    if (this.conn) return this.conn;
    let URI=process.env.DATABASE_URI 
    let client = new MongoClient(`${URI}`);
    await client.connect();
    console.log("DataBase Connected successfully to server");
    const db = client.db("flyt");
    this.conn = db;
    return this.conn;
  }
}
Connect.conn = null;

module.exports = Connect;
