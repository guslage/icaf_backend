const Transcription = (sequelize, DataTypes) => {
  return sequelize.define('Transcription', {
    description: DataTypes.STRING,
    wordId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
}

module.exports = Transcription