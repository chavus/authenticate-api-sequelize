'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('Users', 
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
                                        password: {
                                          type: Sequelize.STRING,
                                          allowNull: false
                                        },
                                        username:{
                                          type: Sequelize.STRING(50),
                                          unique:true
                                        }
                                        ,
                                        firstName: {
                                          type: Sequelize.STRING(50)
                                        },
                                        lastName: {
                                          type: Sequelize.STRING(50)
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

     await queryInterface.dropTable('Users');

  }
};
