module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define("result", {
    rollNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    studenName: {
      type: DataTypes.STRING,
    },

    dateOfBirth: {
      type: DataTypes.STRING,
    },
    score: {
      type: DataTypes.INTEGER,
    },
  });

  return Result;
};
