import HpottersDAO from '../dao/HpottersDAO.js';

export default class HpottersController {

    static async apiGetHpotters(req, res, next) {
        const HpottersPerPage = req.query.HpottersPerPage ? parseInt(req.query.HpottersPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        let filters = {};

        if (req.query.name) {
            filters.name = req.query.name;
        } else if (req.query.species) {
            filters.species = req.query.species;
        }

        try {
            const { HpottersList, totalNumHpotters } = await HpottersDAO.getHpotters({
                filters, page, HpottersPerPage
            });

            console.log("______________");
            console.log("page:", page);
            console.log("filters:", filters);
            console.log("HpottersPerPage:", HpottersPerPage);
            console.log("total results:", totalNumHpotters);
            console.log("______________");

            let response = {
                Hpotters: HpottersList,
                page: page,
                filters: filters,
                entries_per_page: HpottersPerPage,
                total_results: totalNumHpotters,
            };

            res.json(response);
        } catch (e) {
            console.error(`apiGetHpotters error: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetHpotterById(req, res, next) {
        try {
            let id = req.params.id;
            let Hpotter = await HpottersDAO.getHpotterByID(id);
            if (!Hpotter) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(Hpotter);
        } catch (e) {
            console.error(`apiGetHpotterById error: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetSpecies(req, res, next) {
        try {
            let propertyTypes = await HpottersDAO.getSpecies();
            res.json(propertyTypes);
        } catch (e) {
            console.error(`apiGetSpecies error: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }
}

//Chizorom Ekweghariri
//4/28/25
// IT302-452
//cae6@njit.edu
//IT-302 Phase 5