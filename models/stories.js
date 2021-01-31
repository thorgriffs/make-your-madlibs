const { Model, DataTypes } = require("sequelize/types");

//create stories model
module.exports = (sequelize, DataTypes) => {
    const Stories = sequelize.define('Stories', {
        id: {
            type: DataTypes.INTERGER,
            autoIncrement: true,
            primaryKey: true,
        },
        storyBody: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        upvotes: {
            type: DataTypes.INTERGER,
        }
    });

    return Stories;
}
