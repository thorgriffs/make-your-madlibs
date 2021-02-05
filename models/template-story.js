//create Template story model
module.exports = (sequelize, DataTypes) => {
    const Templates = sequelize.define('Templates', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        templateBody: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });

    return Templates;
}