/**
 * Crenaux.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql',
  tableName: 'tdb_crenaux',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id : {
      type : 'integer',
      unique: true,
      columnName : 'id'
    },
    libelle : {
      type : 'string',
      columnName : 'libelle'
    },
  },

  finCrenaux : function (option,callback) {
    Crenaux.find().sort('id asc').exec(function (err, records) {
        if(err) return callback(err);

      return callback(null,records);
    });
  }
};

