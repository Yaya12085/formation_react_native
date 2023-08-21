//auth middleware
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.checkAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    //si aucun jeton n'est trouvé
    if (!token) {
      return res.json({
        success: false,
        message: "Pas de jeton d'autentification",
      });
    }
    //si jeton trouvé, vérifiez-le
    const decoded = jwt.verify(token, "secret");

    //si vérifié, trouver l'utilisateur par identifiant
    const user = await User.findById(decoded.id).select("-password");
    //si aucun utilisateur trouvé
    if (!user) {
      return res.json({ success: false, message: "Token n'est pas valide" });
    }
    //si l'utilisateur est trouvé, attribuez l'utilisateur à req.user
    req.user = user;

    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
