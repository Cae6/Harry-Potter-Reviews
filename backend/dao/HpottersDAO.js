

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
        query = {  $text: {$search: filters['name'] } }; 
      }
      if ("house" in filters) {
        query.house = { $eq: filters['house'] };
      }
      if ("actor" in filters) {
        query.actor = { $eq: filters['actor'] };
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
}