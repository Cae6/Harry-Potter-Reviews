

let characters;

export default class HpotterDAO {
  static async injectDB(conn) {
    if (characters) {
      return;
    }
    try {
      characters = await conn.db(process.env.HPOTTER_NS).collection('characters');
    } catch (e) {
      console.error(`Unable to connect in HpotterDAO: ${e}`);
    }
  }

  static async getCharacters({
    filters = null,
    page = 0,
    itemsPerPage = 20,
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
      cursor = await characters
        .find(query)
        .limit(itemsPerPage)
        .skip(itemsPerPage * page);

      const charactersList = await cursor.toArray();
      const totalNumCharacters = await characters.countDocuments(query);

      return { charactersList, totalNumCharacters };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { charactersList: [], totalNumCharacters: 0 };
    }
  }
}