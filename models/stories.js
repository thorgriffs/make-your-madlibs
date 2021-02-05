//create stories model
module.exports = (sequelize, DataTypes) => {
    const Stories = sequelize.define('Stories', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        storyBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        upvotes: {
            type: DataTypes.INTEGER,
        }
    });

    return Stories;
}
