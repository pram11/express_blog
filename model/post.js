module.exports = (sequelize, DataTypes) => {
    return sequelize.define('post',{
        title:{
            type:DataTypes.STRING(40),
            allowNull:false
        },

        text:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
    },{
        timestamps: false,
      })
}