import express from 'express';
import HpotterController from './Hpotter.controller.js';

const router = express.Router();


router.route('/').get(HpotterController.apiGetCharacters);

export default router;
