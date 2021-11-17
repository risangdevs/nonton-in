'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.Ticket)
    }

    get formatDate() {
      return this.releaseDate.toISOString().split("T")[0]
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    ratingMovie: DataTypes.STRING,
    movieUrl: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};