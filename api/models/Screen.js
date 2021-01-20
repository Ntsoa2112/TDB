/**
 * Screen.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'p_print_screen',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  attributes: {
    id : {
      type : 'integer',
      unique: true,
      primaryKey: true,
      columnName : 'id_pr_sc'
    },
    id_pers :{
      type : 'integer',
      columnName : 'id_pers'
    },
    time :{
      type : 'datetime',
      columnName : 'createTime'
    },

    photo : {
      type : 'binary',
      columnName : 'photo'
    }
  }
};

