const mongoose = require('mongoose');

const Recipe = mongoose.model(
   'recipe',
   {
      image_url: {
         type: String,
         required: true
      },
      author_id: {
         type: String,
         required: true
      },
      title: {
         type: String,
         required: true
      },
      category: {
         type: String,
         required: true
      },
      preparation_time: {
         type: Number,
         required: true
      },
      number_persons: {
         type: Number,
         required: true
      },
      short_description: {
         type: String,
         required: true
      },
      long_description: {
         type: String,
         required: true
      },
      likes: {
         type: Number,
         required: true
      },
      created_on: {
         type: Date,
         required: true
      },
      last_updated: {
         type: Date,
         required: true
      }
   }
);

const create = async (data) => {
   try {
      const r = new Recipe(data);
      return r.save();
   } catch (error) {
      console.log(error);
      return error;
   }
};

const update = async (id, uid, data) => {
   try {
      return Recipe.updateOne({ _id: id, author_id: uid }, data);
   } catch (error) {
      console.log(error);
      return error;
   }
};

const getAll = async () => {
   try {
      return Recipe.find({}).sort({ created_on: -1 });
   } catch (error) {
      console.log(error);
      return error;
   }
};

const getById = async (id) => {
   try {
      return Recipe.findOne({ _id: id });
   } catch (error) {
      console.log(error);
      return error;
   }
};

const getUserRecipes = async (uid) => {
   try {
      return Recipe.find({ author_id: uid });
   } catch (error) {
      console.log(error);
      return error;
   }
};

const getCategory = async (name) => {
   try {
      return Recipe.find({ category: name });
   } catch (error) {
      console.log(error);
      return error;
   }
};

const remove = async (id, uid) => {
   try {
      return Recipe.deleteOne({ _id: id, author_id: uid });
   } catch (error) {
      console.log(error);
      return error;
   }
};

module.exports = {
   getAll,
   getById,
   getUserRecipes,
   getCategory,
   create,
   update,
   remove
};