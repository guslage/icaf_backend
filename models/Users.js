const user = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    name: DataTypes.STRING,
    school: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    motherName: DataTypes.STRING,
    phone: DataTypes.STRING,
    residentialPhone: DataTypes.STRING,
    tutorId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
}

module.exports = user