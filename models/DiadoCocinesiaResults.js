const result = (sequelize, DataTypes) => {
  return sequelize.define('diadococinesiaResult', {
    fileId: DataTypes.STRING,
    testId: DataTypes.STRING,
    transcriptions: DataTypes.STRING
  }, {
    timestamps: false
  })
}

module.exports = result