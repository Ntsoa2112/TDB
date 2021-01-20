/**
 * Created by 01020 on 24-Jan-17.
 */
module.exports = {
  //calcule echantillonage ISO CQ


  setEchantillon : function(callback){
    var math = require('mathjs');

    var dateess = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);


    //Recuperation des populations
    async.series([
      function(callback){
        CQAlmerys.getLot(null,callback);
      }
    ],function (err,resultat) {
      if(resultat[0].length!=0){
        // parcour des liste des lot
        async.eachSeries(resultat[0],function (lot,callback) {
          var pop = lot.qte;
          var lcl = lot.id_lot_client;
          var opt = [];
          opt.pop = pop;
          async.series([
            function (callback) {
                CQAlmerys.getCategorie(opt,callback);
            }
          ],function (err,ress) {
            if(err) callback();

            if(ress[0].length==0)callback();


            var nbEch = ress[0][0].echant;
            //console.log(nbEch);

            var rest = 0;
            var listLot = [];
            var option = [];
            option.date = dateess;
            async.series([
              function (callback) {
                CQAlmerys.getLsMatOp(option,callback);
              }
            ],function (err,result) {
              if(err) return callback(null,false);

              var listMatricule = result[0];

              var nbMat = listMatricule.length;
              var nbEchPmat = parseInt(nbEch/nbMat);
              var rst = nbEch - nbEchPmat*nbMat;


              async.eachSeries(result[0],function (prime,callback) {
                var id_pers = prime.list;
                option.id_pers = id_pers;
                option.id_lc = lcl;
                //select des lot by matricule

                async.series([
                  function (callback) {
                    CQAlmerys.getLsByMat(option,callback);
                  }
                ],function (err,result) {
                  if (err) return console.log(err);
                  //console.log(id_pers+":"+result[0].length);

                  var obj = {};
                  obj.id = id_pers;
                  obj.listLot = [];
                  var i = 0 ;

                  var t = nbEchPmat;
                  if(rst>0){
                    t += 1;
                    rst -=1;
                  }
                  while ( i< t){
                    var tmp = result[0][math.floor(math.random() * result[0].length)].id;
                    if(obj.listLot.indexOf(tmp)==-1){
                      obj.listLot.push(tmp);
                      if(listLot.indexOf(tmp)==-1){
                        listLot.push(tmp);
                      }
                      i++;
                      var pt = [];
                      pt.id= tmp;
                      async.series([
                        function(callback){
                          CQAlmerys.setEchant(pt,callback);
                        }
                      ],function (err,res) {
                        //console.log("fait");
                      })
                    }




                  }
                  rst
                  if((result[0].length-nbEchPmat)<0){
                    //rest += (-1*(result[0].length-nbEchPmat));
                    rest += 1;
                  }else {
                    //console.log("===========rst:"+(result[0].length-nbEchPmat));
                  }

                  //console.log("===========obj:"+JSON.stringify(obj));
                  /*//console.log("===========lst:"+JSON.stringify(listLot));
                   //console.log("===========rst:"+rest);*/
                })

                callback();
              },function (err) {
                //console.log("nbmat = "+nbMat);
                //console.log("rst = "+rst);
                //console.log("nbEchPmat = "+nbEchPmat);
                //console.log("lst = "+listLot.length);

                return callback(null,true);
              });



            });
          });


          //callback();
        },function (err) {
          return callback(null,true);
        })
      }

      //return callback(null,true);
      //return callback(null,"veuiller entrer les quantite du jour");
    });




  },

  /*
  recuperation des cq almerys ISO par list client
  aucun parametre
   */

  setEchantillonOp : function (options,callback) {
    //recuperation des echantillons repartie
    var math = require('mathjs');
    async.series([
      function (callback) {
        CQAlmerys.getAllEchantNow(null,callback);
      }
    ],function (err,result) {
      async.eachSeries(result[0],function (prime,callback) {
        var id_pers = prime.id_pers;
        var echant_tot = prime.echant_total;
        var echant_choisie = prime.echant_choisie || 0;
        var id_lot_client = prime.id_lot_client;

        // recuperation des almerys_p_lot_new par id_pers
        var option = [];
        option.id_pers = id_pers;
        option.id_lc = id_lot_client;
        option.date = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
        //select des lot by matricule

        var listLot = [];
        if(Number(prime.etape_rst) != 0){
          async.series([
            function (callback) {
              CQAlmerys.getLsByMat(option,callback);
            }
          ],function (err,result2) {
            if (err) return callback(null,err);
            ////console.log(id_pers+":"+result2[0].length);
            if(result2[0].length ==0 ){
              //callback();
            }

            var obj = {};
            obj.id = id_pers;
            obj.listLot = [];
            var i = 0 ;

            var echant_temp = parseInt(echant_tot/4);//Diviser en 4 crenaux
            if((echant_tot-echant_choisie)<echant_temp){
              echant_temp = Number(echant_tot)-Number(echant_choisie);

            }else{
              if(Number(prime.etape_rst) == 1){// verification si on est en dernier crenaux
                echant_temp = Number(echant_tot)-Number(echant_choisie);
              }

            }

            if(echant_temp>result2[0].length){
              echant_temp = result2[0].length;
            }

            var t = echant_temp;
            while ( i< t){
              var tmp = result2[0][math.floor(math.random() * result2[0].length)].id;
              if(obj.listLot.indexOf(tmp)==-1){
                obj.listLot.push(tmp);
                if(listLot.indexOf(tmp)==-1){
                  listLot.push(tmp);
                }
                i++;
                var pt = [];
                pt.id= tmp;

                var opti = [];
                opti.echant_choisie = Number(echant_choisie) + Number(echant_temp);
                opti.rst = Number(prime.etape_rst) -1;
                opti.id_lot_client = id_lot_client;
                opti.id_pers = id_pers;
                async.series([
                  function(callback){
                    CQAlmerys.setEchant(pt,callback);
                  },function(callback){
                    CQAlmerys.updateExEchantLot(opti,callback);
                  }
                ],function (err,res) {
                  ////console.log("fait");
                })
              }
            }
          });
        }


       callback();

      },function (err) {
        return callback(null,true);
      });
    });
  },

  /*
  * selection par defaut des personne a echantilloner par sous specialite
  * */

  setPersEchant : function (option,callback) {
    //recuperation des listes dans la table almerys_affectation_sspe
    async.series([
      function (callback) {
        Almerys.get_list_pers_sspec(null,callback);
      }
    ],function (err,result) {

      if(err) return callback(null,err);
      //Insertion dans almerys_echant_pers
      async.eachSeries(result[0],function (prime,callback) {
        var option = [];
        option.id_pers = prime.id_pers;
        option.id_lot_client = prime.id_pole_new;

        async.series([
          function (callback) {
            CQAlmerys.addEchantByMt(option,callback);
          }
        ],function (erreurAdd,reslt) {
          if(erreurAdd) return callback(null,erreurAdd);
        });

        callback();
      },function (erreur) {
        if(erreur) return callback(null,erreur);
        return callback(null,true);
      })
    })
  }
}
