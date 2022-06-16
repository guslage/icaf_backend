const Result = (sequelize, DataTypes) => {
  return sequelize.define('Result', {
    audio: DataTypes.STRING,
    wordId: DataTypes.INTEGER,
    transcriptionId: DataTypes.INTEGER,
    testId: DataTypes.INTEGER,
    fileId: DataTypes.STRING
  }, {
    timestamps: false
  })
}

module.exports = Result