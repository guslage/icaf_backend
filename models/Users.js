const User = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    name: DataTypes.STRING,
    school: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    motherName: DataTypes.STRING,
    phone: DataTypes.STRING,
    residentialPhone: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps: false
  })
}

module.exports = User