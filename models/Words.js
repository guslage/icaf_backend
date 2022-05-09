const Word = (sequelize, DataTypes) => {
  return sequelize.define('Word', {
    description: DataTypes.STRING,
    filename: DataTypes.STRING
  }, {
    timestamps: false
  })
}

module.exports = Word