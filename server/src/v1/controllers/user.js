const CryptoJS = require("crypto-js");
const { response } = require("express");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  //パスワード受け取り
  const password = req.body.password;

  try {
    //パスワード暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    //ユーザーの新規作成
    const user = await User.create(req.body);
    //JWTの発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//ログインAPI
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //DBからユーザーが存在するか探してくる
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: {
          param: "username",
          message: "ユーザー名かパスワードが無効です",
        },
      });
    }
    //パスワードが合っているか照合
    const descryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (descryptedPassword !== password) {
      return res.status(401).json({
        errors: {
          param: "password",
          message: "ユーザー名かパスワードが無効です",
        },
      });
    }
    //JWTを発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
