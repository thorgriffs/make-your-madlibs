//create model
module.exports = (sequelize, DataTypes) => {
    const Template = sequelize.define('Template', {
        id: {
            type: DataTypes.INTERGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        storyBody: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });

    return Template;
}