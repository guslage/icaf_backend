const user = (sequelize, DataTypes) => {
  return sequelize.define('user', {
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

module.exports = user