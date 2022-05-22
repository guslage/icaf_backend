const test = (sequelize, DataTypes) => {
  return sequelize.define('test', {
    type: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    completedWords: DataTypes.TEXT,
    completed: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
}

module.exports = test