const word = (sequelize, DataTypes) => {
  return sequelize.define('word', {
    description: DataTypes.STRING,
    filename: DataTypes.STRING
  }, {
    timestamps: false
  })
}

module.exports = word