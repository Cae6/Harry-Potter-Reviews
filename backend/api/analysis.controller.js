import AnalysisDAO from '../dao/analysisDAO.js';
export default class AnalysisController {
    static async apiPostAnalysis(req, res, next) {
        try {
        const HpottersId = req.body.Hpotters_id;
        const text = req.body.analysis;
        const UserInfo = {
            name: req.body.name,
            _id: req.body.user_id
        
        }
        const lastModified = new Date();

        const AnalysisResponse = await AnalysisDAO.addAnalysis(
            HpottersId,
            UserInfo,
            text,
            lastModified
        )
        res.json( AnalysisResponse)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

static async apiUpdateAnalysis(req, res, next) {
    try {
        const analysisId = req.body.analysis_id;
        const text = req.body.analysis;
        const lastModified = new Date();

        const analysisResponse = await AnalysisDAO.updateAnalysis(
            analysisId,
            req.body.user_id,
            text,
            lastModified
        )
        var { error } = analysisResponse
        if (error) {
            res.status.json({ error })
        }
        if (analysisResponse.modifiedCount === 0) {
            throw new Error(
                "unable to update analysis - user may not be original poster"
            )
        }
        res.json(analysisResponse)
    } catch (e) {
        res.status(500).json({ error: e.message })

    
        
    
    }
}

static async apiDeleteAnalysis(req, res, next) {
    try {
        const analysisId = req.body.analysis_id;
        const userId = req.body.user_id;
        const analysisResponse = await AnalysisDAO.deleteAnalysis(
            analysisId,
            userId
        )
        res.json(analysisResponse)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
}