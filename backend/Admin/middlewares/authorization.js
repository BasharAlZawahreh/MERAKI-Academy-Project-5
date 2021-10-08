const authorization = (string) => {
    return (req, res, next) => {
      if (!req.token || !req.token.role || string !== "SuperAdmin") {
        return res.status(403).json({
          success: false,
          message: `Unauthorizd`,
        });
      }
  
      next();
    };
  };
  
  module.exports = authorization;
  