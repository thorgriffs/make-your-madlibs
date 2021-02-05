//create Template story model
module.exports = (sequelize, DataTypes) => {
    const Templates = sequelize.define('Templates', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        templateBody: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Templates;
}