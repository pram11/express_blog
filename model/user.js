module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      password_hash: {
          type: DataTypes.TEXT,
          allowNull:false
    
        },
      password: {
        type: DataTypes.VIRTUAL,
        set: function (val) {
           this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
           this.setDataValue('password_hash', this.salt + val);
         },
        validate: {
            isLongEnough: function (val) {
              if (val.length < 7) {
                throw new Error("Please choose a longer password")
             }
          }
        },
        
      },

    }, {
      timestamps: false,
    });
  };
  