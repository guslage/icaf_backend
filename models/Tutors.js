const tutor = (sequelize, DataTypes) => {
  return sequelize.define('tutor', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    timestamps: false
  })
}

module.exports = tutor