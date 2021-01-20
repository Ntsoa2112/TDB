/**
 * Plogon.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'p_logon', // nom du table qui est associé avec le modele Dossier
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: { //id du dossier
      type: 'integer',
      columnName: 'id_pers'
    },
    id_pers: { //id du dossier
      type: 'integer',
      columnName: 'id_pers'
    },

    ip: { //numero du dossier
      type: 'string',
      columnName: 'ip'
    },
    connected: {
      type: 'boolean',
      columnName: 'connected'
    },
    id_droit_menu: {
      type: 'integer',
      columnName: 'id_droit_menu'
    },
    last_connected_time: {
      type: 'datetime',
      columnName: 'last_connected_time'
    }
  }

  ,
  getPlogon: function(callback) {

  Plogon.find().sort('last_connected_time ASC').sort('connected DESC').sort('id ASC').exec(function (err, res) {
    if (err) return callback(err);

    ////console.log("result"+res);
    return callback(null, res);
  });

}

};

