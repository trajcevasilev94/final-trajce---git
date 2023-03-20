const mongoose = require('mongoose');

const User = mongoose.model(
   'user',
   {
      image_url: {
         type: String
      },
      first_name: {
         type: String,
         required: true
      },
      last_name: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true
      },
      birthday: {
         type: Date,
         required: true
      },
      password: {
         type: String,
         required: true
      },
      created_on: {
         type: Date,
         required: true
      }
   }
);

const create = async (data) => {
   try {
      let u = new User(data);
      return u.save();
   } catch (error) {
      console.log(error);
      return error;
   }
};

const getUserByEmail = async (email) => {
   try {
      return User.findOne({ email });
   } catch (error) {
      console.log(error);
      return error;
   }
}
   ;
const get = async (uid) => {
   try {
      return User.findOne({ _id: uid });
   } catch (error) {
      console.log(error);
      return error;
   }
};

const update = async (uid, data) => {
   try {
      return User.updateOne({ _id: uid }, data);
   } catch (error) {
      console.log(error);
      return error;
   }
};

const remove = async (id) => {
   try {
      return User.remove({ _id: id });
   } catch (error) {
      console.log(error);
      return error;
   }
};

module.exports = {
   create,
   getUserByEmail,
   get,
   update,
   remove
};
