const Result = (sequelize, DataTypes) => {
  return sequelize.define('Result', {
    audio: DataTypes.STRING,
    wordId: DataTypes.INTEGER,
    transcriptionId: DataTypes.INTEGER,
    testId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
}

module.exports = Result