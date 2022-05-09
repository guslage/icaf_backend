const Test = (sequelize, DataTypes) => {
  return sequelize.define('Test', {
    type: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
}

module.exports = Test