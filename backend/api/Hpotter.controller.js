import HpotterDAO from '../dao/HpotterDAO.js';

export default class HpotterController {

  static async apiGetCharacters(req, res, next) {
    const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : 20; 
    const page = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1; 
    let filters = {};

    if (req.query.name) {
      filters.name = req.query.name;
    } if (req.query.house) {
      filters.house = req.query.house;
    } if (req.query.actor) {
      filters.actor = req.query.actor;
    }

    
    const { characters, totalCount } = await HpotterDAO.getCharacters({
      filters, page, itemsPerPage
    });


    let response = {
      characters: characters,
      page: page,
      filters: filters,
      entries_per_page: itemsPerPage,
      total_results: totalCount,
    };
    
    res.json(response);
  }

 

}
