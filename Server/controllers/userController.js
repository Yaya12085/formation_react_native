const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Controller d'inscription
const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({
        success: false,
        message: "Veuillez remplir tous les champs",
      });
    }

    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.json({
        success: false,
        message: "Ce nom d'utilisateur est déjà pris",
      });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, "secret", {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Compte créé avec succès",
      token: token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Controller de connexion
const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({
        success: false,
        message: "Veuillez remplir tous les champs",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        success: false,
        message: "Cet username n'est pas enregistré",
      });
    }

    const isPasswordMatch = user.password === password;

    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Mot de passe incorrect",
      });
    }
    const token = jwt.sign({ id: user._id }, "secret", {
      expiresIn: "7d",
    });

    res.send({
      success: true,
      message: "Connexion réussie",
      token: token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Controller de mise à jour
const Update = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.json({
        success: false,
        message: "Utilisateur introuvable",
      });
    }

    const checkUsernameExist = await User.findOne({ username });

    if (checkUsernameExist) {
      return res.json({
        success: false,
        message: "Ce nom d'utilisateur est déjà pris",
      });
    }

    const checkEmailExist = await User.findOne({ email });

    if (checkEmailExist) {
      return res.json({
        success: false,
        message: "Ce mail est déjà pris",
      });
    }
    user.username = username;
    user.email = email;
    await user.save();

    res.send({
      success: true,
      message: "Mise à jour réussie",
      user: user,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const Current = async (req, res) => {
  try {
    res.send({
      success: true,
      message: "Utilisateur récupéré avec succès",
      user: req.user,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = { Register, Login, Update, Current };
