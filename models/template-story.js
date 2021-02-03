//create Template story model
module.exports = (sequelize, DataTypes) => {
    const Template = sequelize.define('Template', {
        id: {
            type: DataTypes.INTERGER,
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

    return Template;
}