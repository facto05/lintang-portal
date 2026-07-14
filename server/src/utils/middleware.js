import jwt from 'jsonwebtoken';

export function authMiddleware(roles = []) {
  return (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const token = auth.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
}
