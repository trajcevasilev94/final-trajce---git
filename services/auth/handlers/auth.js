const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../../../pkg/user/index');
const config = require('../../../pkg/config/index');

const create = async (req, res) => {
   try {
      if (
         req.body.password.length === 0 ||
         req.body.password !== req.body.password2
      ) {
         return res.status(400).send(`Passwords don't match`);
      }
      let u = await user.getUserByEmail(req.body.email);
      if (u) {
         return res.status(409).send('User already exists!');
      }
      req.body.password = bcrypt.hashSync(req.body.password);
      req.body.created_on = new Date();
      user.create(req.body);
      return res.status(201).send('User created!');
   } catch (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
   }
};

const login = async (req, res) => {
   try {
      let u = await user.getUserByEmail(req.body.email);
      if (!u) {
         return res.status(400).send('Bad login credentials');
      }
      if (!bcrypt.compareSync(req.body.password, u.password)) {
         return res.status(400).send("Password don't match");
      }
      let payload = {
         uid: u._id,
         email: u.email,
         full_name: u.full_name
      };
      let token = jwt.sign(payload, config.get('security').jwt_secret);
      return res.status(200).send({
         token,
         uid: u._id,
         email: u.email,
         isLoggedIn: true
      });
   } catch (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
   }
};

const getUser = async (req, res) => {
   try {
      let u = await user.get(req.auth.uid);
      if (u.length === null) {
         return res.status(404).send('There is no user logged in!');
      }
      return res.status(200).send(u);
   } catch (error) {
      console.log(error);
      return res.status(500).send('ISE');
   }
};

const updateUser = async (req, res) => {
   try {
      if (
         req.body.password.length === 0 ||
         req.body.password !== req.body.password2
      ) {
         return res.status(400).send(`Passwords don't match`);
      }
      req.body.password = bcrypt.hashSync(req.body.password);
      let payload = {
         ...req.body,
         last_updated: new Date()
      };
      let u = await user.update(req.auth.uid, payload);
      return res.status(200).send(req.body);
   } catch (error) {
      console.log(error);
      return res.status(500).send('ISE');
   }
};

const validate = (req, res) => {
   console.log(req.auth);
   return res.status(200).send(req.auth); // return the token payload
};

const remove = async (req, res) => {
   try {
      await users.remove(req.auth.uid);
      if (users.deletedCount === 0) {
         return res.status(400).send('Bad request');
      }
      return res.status(200).send('User deleted!');
   } catch (error) {
      console.log(error);
      return res.status(500).send('ISE');
   }
};

module.exports = {
   create,
   login,
   getUser,
   validate,
   updateUser,
   remove
};
