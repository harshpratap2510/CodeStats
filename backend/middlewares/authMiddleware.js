import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token  = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

const adminMiddleware = (req, res, next) => {
    try {
        if(!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if(req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    } catch (error) {
        return res.
        status(403).json({ message: 'Forbidden' });
    }};

    const verifyToken = (req, res, next) => {
        const token = req.cookies.jwt; // Get the token from the cookie
      
        if (!token) {
          return res.status(403).json({ message: 'Token required' });
        }
      
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded; // Attach decoded user data to the request object
          next();
        } catch (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
      };

      export { authMiddleware, adminMiddleware, verifyToken };