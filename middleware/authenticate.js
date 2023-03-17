import jwt from "jsonwebtoken";

const secret = 'mysecretkey';


// middleware function to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access token not provided.' });
    }
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid or expired access token.' });
      }
      req.user = user;
      next();
    });
  }

export default authenticateToken;