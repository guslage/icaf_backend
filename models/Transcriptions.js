const transcription = (sequelize, DataTypes) => {
  return sequelize.define('transcription', {
    description: DataTypes.STRING,
    wordId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
}

module.exports = transcription