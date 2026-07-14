import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => { res.json({ message: 'Media API - coming soon' }); });
export default router;
