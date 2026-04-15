import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization')

    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token, access denied'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);

    return res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

export default authMiddleware;