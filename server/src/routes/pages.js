import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => { res.json({ message: 'Pages API - coming soon' }); });
export default router;
