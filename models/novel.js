'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Novel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Novel.belongsToMany(models.User, { through: "Subscribes" })
    }

    static List(search) {

      if (search) {
        console.log(search)

        const options = {
          where: {
            [Op.or]: [
              {
                title: {
                  [Op.iLike]: `%${search}%`
                }
              },
              {
                authorName: {
                  [Op.iLike]: `%${search}%`
                }
              }
            ]
          }
        }
        return Novel.findAll(options)
      } else {
        return Novel.findAll()

      }
    }

  }
  Novel.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title Required"
        },
        notNull: {
          msg: "Title required"
        }
      }
    },
    imageURL: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "URL Required"
        },
        notNull: {
          msg: "URL required"
        },
        isUrl: {
          msg: "needs to be a url"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "description Required"
        },
        notNull: {
          msg: "description required"
        }
      }
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "AuthorName Required"
        },
        notNull: {
          msg: "AuthorName required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Novel',
  });
  return Novel;
};