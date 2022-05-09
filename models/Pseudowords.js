const Word = (sequelize, DataTypes) => {
  return sequelize.define('Pseudoword', {
    description: DataTypes.STRING,
    filename: DataTypes.STRING
  }, {
    timestamps: false
  })
}

module.exports = Word