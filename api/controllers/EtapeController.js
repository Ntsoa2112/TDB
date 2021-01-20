/**
 * EtapeController
 *
 * @description :: Server-side logic for managing Etapes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findEtape: function(req, res)
  {
    Etape.find({}, function(err, found){
      if(err){
        console.log(err);
      }
      var retVal = [];
      retVal['etapes'] = found;
      //console.log(found);
    });
  },

  createEtape: function (req, res)
  {
    var id = req.param('id'); //id dossier
    var libelle = req.param('libelle');
    var parent = req.param('parent');
    Etape.create({libelle:libelle,parent_etape:req.param('typeTest')}).exec(function(err,model)
    {
      if (err) {
        console.log(err);
      }
      return res.redirect('http://localhost:1340/findDossierById?id='+id);
    });
  },

  createEtapeDossier: function (req, res)
  {
    //console.log("fonction  ajout ETAPE");

    var idDossier = req.param('id_dossier'); // id dossier
    var libelle = req.param('libelle'); // libelle
    var parent = req.param('parent'); // parent etape

    //var id_oper = 0;
    //console.log("ID DOSSIER =============> "+idDossier);
    //console.log("LIBELLE =============> "+libelle);
    //console.log("PARENT =============> "+parent);

    Etape.findOne({libelle:libelle}).exec(function (err1, etape){
      //console.log("FIND ONE");
      if (err1){
        //console.log(err1);
      }
      //console.log("*************************************************************************************************************************");
      //console.log("ETAPE FOUND   ====> "+etape);
      if(typeof etape == 'undefined'){ // ra tsis etape
        //console.log("SI ETAPE DOESN'T EXIST ");
        Etape.create({libelle:libelle,parent_etape:req.param('typeTest')}).exec(function(err2,model)
        {
          //console.log("CREATE ETAPE ");
          if (err2) {
            //console.log(err2);
          }
          //console.log("FIND ONE ETAPE CREATED");
          Etape.findOne({libelle:libelle}).exec(function (err3, etapeFound){
            //console.log("FIND ONE ETAPE CREATED 2");
            if (err3){
              //console.log(err3);
            }
            var associateQuery = "INSERT INTO p_lien_oper_dossier (id_dossier,id_oper) VALUES (" + idDossier + "," + etapeFound.id_etape + ")";
            Etape.query(associateQuery, function(eror2, testInsert)
            {
              //console.log("CREATE LIEN OPER DOSSIER ");
              if (eror2){
                //console.log(eror2);
              }else{
                return res.redirect('http://localhost:1340/findDossierById?id='+idDossier);
              }
            });
          });
        });
      }else{ // ra misy etape
        //console.log("SI ETAPE EXIST ");
        var testExistence = "SELECT id_dossier,id_oper FROM  p_lien_oper_dossier WHERE id_dossier=" + idDossier + " AND id_oper=" + etape.id_etape;
        Etape.query(testExistence, function(eror, testExist)
        {
          //console.log("test existence ==== ");
          if (eror){
            //console.log(eror);
          }else{
            var associateQuery = "INSERT INTO p_lien_oper_dossier (id_dossier,id_oper) VALUES (" + idDossier + "," + etape.id_etape + ")";
            Etape.query(associateQuery, function(eror2, testInsert)
            {
              //console.log("test associateQuery ==== ");
              if (eror2){
                //console.log(eror2);
              }else{
                return res.redirect('http://localhost:1340/findDossierById?id='+idDossier);
              }
            });
          }
        });
      }
    });
  },

  deleteEtape: function (req, res)
  {
    var id = req.param('id');
    var idEtape = req.param('idEtape');
    //console.log("=========================================== id Etape suppr ======= " + id);
    Etape.update({id_etape: idEtape},{suppr:true}).exec(function (err, updated){
      if (err) {
        console.log(err);
        return;
      }
      else return res.redirect('http://localhost:1340/findDossierById?id='+id);
    });
  },

  getEtapeByDossier: function (req, res) {
    var id = req.param('id');
    Etape.query('select id_lien, p_etape.libelle from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = '+id+' order by id_lien', function(eror, test)
    {
      if (eror)
      {
        return res.send('erreur 2018');
      }else{
        var retVal = [];
        retVal['etapes'] = test.rows;
      }
    });
  },


};

