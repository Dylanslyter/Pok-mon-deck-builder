const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const validationRules = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING.trim(),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING.trim(),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6 - 255]
        }
    },
    };

class user extends model {
    checkPassword(password) {
        return bcrypt.compare(password, this.password);}
}    

user.init(validationRules, {
    sequelize,
    modelName: 'user',
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }
});