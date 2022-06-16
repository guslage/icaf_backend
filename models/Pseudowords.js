const Word = (sequelize, DataTypes) => {
  return sequelize.define('pseudoword', {
    description: DataTypes.STRING,
    filename: DataTypes.STRING
  }, {
    timestamps: false
  })
}

module.exports = Word