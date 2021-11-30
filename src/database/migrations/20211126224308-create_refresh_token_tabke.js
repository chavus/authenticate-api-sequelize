'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('RefreshTokens', 
              { id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER},
                email: {
                  type: Sequelize.STRING(100),
                  allowNull: false,
                  unique: true
                },
                token:{
                  type: Sequelize.TEXT
                },
                UserId: {
                  type: Sequelize.INTEGER,
                  references: {model: {tableName:'Users'}, key:'id'},
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
                },
                createdAt:{
                  type: Sequelize.DATE,
                  allowNull:false
                },
                updatedAt:{
                  type: Sequelize.DATE,
                  allowNull:false
                }
              });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('RefreshTokens')
  }
};
