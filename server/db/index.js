"use strict";

const db = require("./db");

// Require your models and make your associations
const { DataTypes } = require('sequelize');

// Define the WizardingSchool model
const WizardingSchool = db.define('WizardingSchool', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmagic-words&psig=AOvVaw2MYOY3xb42PQAqwajX6Mjs&ust=1692034292404000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIjdvcKV2oADFQAAAAAdAAAAABBA',
  },
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
});

// Define the Student model
const Student = db.define('Student', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://stock.adobe.com/images/wizard-with-gray-beard-with-magic-wand-with-hat-and-cloak-mascot/239859371',
  },
  magicalAbilityScore: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 10,
    },
  },
});

// Set up associations
Student.belongsTo(WizardingSchool); // Each student belongs to a wizarding school
WizardingSchool.hasMany(Student);    // Each wizarding school has many students

// Export models
module.exports = {
  db,
  WizardingSchool,
  Student,
};
