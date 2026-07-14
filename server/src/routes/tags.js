import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => { res.json({ message: 'Tags API - coming soon' }); });
export default router;
