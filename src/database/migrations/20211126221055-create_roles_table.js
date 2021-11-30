'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Roles', 
                          { 
                            id: {
                              allowNull: false,
                              autoIncrement: true,
                              primaryKey: true,
                              type: Sequelize.INTEGER
                            },
                            role: {
                              type: Sequelize.STRING
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
     await queryInterface.dropTable('Roles');
  }
};
