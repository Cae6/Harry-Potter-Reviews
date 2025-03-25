import HpottersDAO from '../dao/HpottersDAO.js';

export default class HpottersController {

  static async apiGetHpotters(req, res, next) {
    const HpottersPerPage = req.query.HpottersPerPage ? parseInt(req.query.HpottersPerPage) : 20; 
    const page = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1; 
    let filters = {};

    if (req.query.name) {
      filters.name = req.query.name;
    } if (req.query.house) {
      filters.house = req.query.house;
    } if (req.query.actor) {
      filters.actor = req.query.actor;
    }

    
    const { HpottersList, totalCount } = await HpottersDAO.getHpotters({
      filters, page, HpottersPerPage
    });

    console.log("______________");
    console.log("page:", page);
    console.log("filters", filters);
    console.log("HpottersPerPage", HpottersPerPage);
    console.log("total results", totalCount);
    console.log("______________");



    let response = {
      Hpotters: HpottersList,
      page: page,
      filters: filters,
      entries_per_page: HpottersPerPage,
      total_results: totalCount,
    };
    
    res.json(response);
  }

 

}
