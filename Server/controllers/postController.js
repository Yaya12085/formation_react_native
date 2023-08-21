const Post = require("../models/postModel");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "-password").sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      message: "Récupération des posts réussie",
      posts: posts,
    });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};
const addPost = async (req, res) => {
  try {
    const { description, lienImage } = req.body;

    if (!description) {
      return res.json({
        success: false,
        message: "Veuillez remplir tous les champs",
      });
    }

    const post = new Post({
      description,
      lienImage,
      user: req.user._id,
    });
    await post.save();
    res.send({
      success: true,
      message: "Post ajouté avec succès",
      post: post,
    });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};
const updatePost = async (req, res) => {
  try {
    const { title, description, lienImage } = req.body;
    //verify if current logged user equal to post user before
    if (!description) {
      return res.json({
        success: false,
        message: "Veuillez remplir tous les champs",
      });
    }

    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId, user: req.user._id },
      { title, description, lienImage },
      { new: true }
    );
    res.send({
      success: true,
      message: "Post modifié avec succès",
      post: post,
    });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    res.send({
      success: true,
      message: "Post supprimé avec succès",
      post: post,
    });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

module.exports = { getPosts, addPost, updatePost, deletePost };
