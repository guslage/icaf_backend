const result = (sequelize, DataTypes) => {
  return sequelize.define('result', {
    audio: DataTypes.STRING,
    wordId: DataTypes.INTEGER,
    transcriptionId: DataTypes.INTEGER,
    testId: DataTypes.INTEGER,
    fileId: DataTypes.STRING
  }, {
    timestamps: false
  })
}

module.exports = result