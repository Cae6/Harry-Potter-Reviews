import express from 'express';
import HpottersController from './Hpotters.controller.js';
import AnalysisController from './analysis.controller.js';

const router = express.Router();


router.route('/').get(HpottersController.apiGetHpotters);
router.route('/analysis')
.post(AnalysisController.apiPostAnalysis)
.put(AnalysisController.apiUpdateAnalysis)
.delete(AnalysisController.apiDeleteAnalysis);



export default router;
