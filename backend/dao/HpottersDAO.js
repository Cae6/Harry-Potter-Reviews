


import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let Hpotters;
export default class HpottersDAO {
  static async injectDB(conn) {
    if (Hpotters) {
      return;
    }
    try {
      Hpotters = await conn.db(process.env.HPOTTER_NS).collection('Harry_Potter_cae6');
    } catch (e) {
      console.error(`Unable to connect in HpottersDAO: ${e}`);
    }
  }

  static async getHpotters({
    filters = null,
    page = 0,
    HpottersPerPage = 20,
  } = {}) {
    let query 
    
   
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters['name'] } };
      } else if ("species" in filters) {
        query = { species: { $eq: filters['species'] } };
      }
    }

    let cursor
    try {
      cursor = await Hpotters
        .find(query)
        .limit(HpottersPerPage)
        .skip(HpottersPerPage * page);

      const HpottersList = await cursor.toArray();
      const totalNumHpotters = await Hpotters.countDocuments(query);

      return { HpottersList, totalNumHpotters }; 
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { HpottersList: [], totalNumHpotters: 0 };
    }
  }

  static async getSpecies() {
    try{
      return await Hpotters.distinct("species");
    } catch (e) {
      console.error(`Unable to get species, ${e}`);
      return [];
    }
    }

    static async getHpotterByID(id) {
      try {
        return await Hpotters.aggregate([
          { $match: {
            _id: ObjectId.createFromHexString(id),
          }},
          { $lookup: {
            from: 'analysis',
            localField: '_id',
            foreignField: 'Hpotters_id',
            as: 'analysis'    
          }
          }
        ]).next();
        
      }
      catch (e) {
        console.error(`Something went wrong in getHpotterByID: ${e}`);
        throw e;
      }
}}

//Chizorom Ekweghariri
//4/28/25
// IT302-452
//cae6@njit.edu
//IT-302 Phase 5