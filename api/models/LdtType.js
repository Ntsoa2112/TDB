/**
 * LdtType.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'p_type_ldt',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,

  attributes: {

    id : { type: 'integer',columnName: 'id_type_ldt' },

    libelle : { type: 'string',columnName: 'libelle' },

    commentaires : { type: 'string',columnName: 'commentaires' },

   // get_type : { type: 'string' }
  },

  get_list_type: function(callback){
      LdtType.find(function(err,result){
          if (err) return callback(err);
          ////console.log(result);
          return callback(null, result);
      })
  },

  get_ldt_by_spec_alm: function(option,callback){
      var query = "select SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as somme,"+
          " sum(to_number('0'||quantite,'99999')) as qte,"+
          " id_type_ldt,tb_specialite.id_spec,tb_specialite.libelle, "+
          " sum(to_number('0'||nbre_erreur,'99999')) as err "+
          " FROM tb_specialite "+
          " LEFT JOIN tb_lien_sp_dossier ON tb_specialite.id_spec=tb_lien_sp_dossier.id_spec "+
          " LEFT JOIN p_ldt ON tb_lien_sp_dossier.id_dossier=p_ldt.id_dossier "+
          " where 1=1 AND id_type_ldt = "+option.type+" "+
          " AND to_date(date_deb_ldt,'yyyymmdd') between to_date('20160101','yyyymmdd') and to_date('20161031','yyyymmdd')"+
          " GROUP BY id_type_ldt,tb_specialite.id_spec,tb_specialite.libelle "+
          " order by tb_specialite.id_spec ";
      LdtType.query(sql, function(err, res){
          if(err) return callback(err);

          //console.log("ldt====================>"+res.rows);
          return callback(null, res.rows);
        });


  }
};

