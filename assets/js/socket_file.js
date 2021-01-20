/**
 * Created by Mirah on 05/03/2016.
 */


    var id;
    var date = new Date();

    function socketListen(_id){
        id=_id;
        io.socket.on(_id, function (data) {
            var msg = data;
            var typeMess = (msg.type != undefined)?Number(msg.type):99;

                switch (typeMess)
                {
                    case 6:
                        $("#chat_from").html("MyBurgerNow");
                        $('.modal-backdrop').remove();

                        //append du contenu dans le chatForm
                       var templateChat = '<div class="row"><div class="col-lg-12"><div class="media"><a class="pull-left" href="#">';
                        templateChat += '<img style="maxwidth:40px;maxheight:40px" class="media-object img-circle" src="http://dev.myburgernow.com/data_cni/default/cartoon.png" alt=""></a><div class="media-body">';
                        templateChat += '<h4 class="media-heading">MyBurgerNow<span class="small pull-right">' + date.getHours() + ":" + date.getMinutes() +'</span></h4>';
                        templateChat += '<p>' + "Attente de livraison ..."+ '</p></div></div></div></div><hr>';
                        $("#chat_content").append(templateChat);
                        $('#chat_content').stop().animate({
                            scrollTop: $("#chat_content")[0].scrollHeight
                        }, 800);

                        var param =  {action:"unset_livraison"};
                        $.get('fonctions.php', param);
                        $("#data-socket-test").prop("value","Attente livraison ...");


                        $("#valider_livraison").toggle( false );
                        $("#refuser_livraison").toggle( false );

                        //$("#map_canvas").toggle( true );
                        $("#modal_chat").modal( 'hide' );
                        $("#modal_livreur").modal( 'hide' );
                        $("#modal_login").modal( 'hide' );
                        //

                        $("#logout").removeClass( 'hidden' );
                        $("#map").removeClass( 'hidden' );
                        break;
                    case 4:
                        $("#chat_from").html("MyBurgerNow");

                        //append du contenu dans le chatForm
                        var templateChat = '<div class="row"><div class="col-lg-12"><div class="media"><a class="pull-left" href="#">';
                        templateChat += '<img style="maxwidth:40px;maxheight:40px" class="media-object img-circle" src="http://dev.myburgernow.com/data_cni/default/cartoon.png" alt=""></a><div class="media-body">';
                        templateChat += '<h4 class="media-heading">MyBurgerNow<span class="small pull-right">' + date.getHours() + ":" + date.getMinutes() +'</span></h4>';
                        templateChat += '<p>' + "Payement effectué ..."+ '</p></div></div></div></div><hr>';
                        $("#chat_content").append(templateChat);
                        $('#chat_content').stop().animate({
                            scrollTop: $("#chat_content")[0].scrollHeight
                        }, 800);

                        var param =  {action:"payement_effectue"};
                        $.get('fonctions.php', param, function (req, res) {
                            document.location.reload(true);
                        });
                        break;
                    case 0:
                        //alert(msg.type);
                        var param =   {'action':'chat', 'client':msg.fn};
                        $.get('fonctions.php', param);

                        $("#map_canvas").toggle( false );

                        $("#modal_livreur").modal( 'hide' );
                        $("#modal_panier").modal( 'hide' );

                        $("#logout").removeClass( 'hidden' );
                        $("#map").removeClass( 'hidden' );
                        $("#chat").removeClass( 'hidden' );

                        var pathImage = (msg.img =='cartoon.png')?'default':img.from;
                        $("#chat_from").html(msg.fn);

                        $("#chat").addClass("red");
                        $("#chat").html("<sup style='font-size:xx-small'>(1)</sup>");

                //append du contenu dans le chatForm
                        var templateChat = '<div class="row"><div class="col-lg-12"><div class="media"><a class="pull-left" href="#">';
                        templateChat += '<img style="maxwidth:40px;maxheight:40px" class="media-object img-circle" src="http://dev.myburgernow.com/data_cni/'+pathImage+'/'+msg.img+'" alt=""></a><div class="media-body">';
                        templateChat += '<h4 class="media-heading">' + msg.fn+'<span class="small pull-right">' +msg.h +'</span></h4>';
                        templateChat += '<p>'+msg.msg+'</p></div></div></div></div><hr>';
                        $("#chat_content").append(templateChat);
                        $('#chat_content').stop().animate({
                            scrollTop: $("#chat_content")[0].scrollHeight
                        }, 800);
                        $("#modal_chat").modal( 'show' );
                        break;
                    default:
                        msg = JSON.parse(data);
                        // alert(msg);

                        $("#livraison").addClass("red");

                        var param =  {id_enseigne:msg.e,prix_produit:msg.p,action:'livraison',nom_enseigne:msg.e,livraison:msg.em,id_operation:msg.o, id_restaurant:msg.r, id_client:msg.c, distance:msg.d, address_client:msg.ac};
                        $.get('fonctions.php', param);

                        $('#lib_enseigne').html(msg.e);
                        $('#enseigne-nom').html(msg.e);
                        $('#data-socket-test').html(msg.em);
                        $('#adresse_livraison').html(msg.ac);
                        $('#prix_produit').html(msg.p);

                        $("#id_operation").prop('value', msg.o);
                        $("#id_restaurant").prop('value',msg.r);
                        $("#id_livreur").prop('value', msg.l);
                        $("#id_client").prop('value', msg.c);
                        $("#bloc-valider").prop("style", "display:block");
                        $("#bloc-attente-livraison").prop("style", "display:none");


                        $("#valider_livraison").removeClass( 'hidden' );
                        $("#refuser_livraison").removeClass( 'hidden' );
                        $("#valider_livraison").removeClass( 'disabled' );
                        $("#refuser_livraison").removeClass( 'disabled' );

                        $("#valider_livraison").toggle( true );
                        $("#refuser_livraison").toggle( true );

                        $("#chat_from").html("MyBurgerNow");

                        //append du contenu dans le chatForm
                        var templateChat = '<div class="row"><div class="col-lg-12"><div class="media"><a class="pull-left" href="#">';
                        templateChat += '<img style="maxwidth:40px;maxheight:40px" class="media-object img-circle" src="http://dev.myburgernow.com/data_cni/default/cartoon.png" alt=""></a><div class="media-body">';
                        templateChat += '<h4 class="media-heading">MyBurgerNow<span class="small pull-right">' + date.getHours() + ":" + date.getMinutes() +'</span></h4>';
                        templateChat += '<p>' + "vous avez une proposition de livraison "+msg.e+" à " + msg.d + '</p></div></div></div></div><hr>';
                        $("#chat_content").append(templateChat);
                        $('#chat_content').stop().animate({
                            scrollTop: $("#chat_content")[0].scrollHeight
                        }, 800);

                        $("#modal_chat").modal( 'hide' );
                        $("#modal_login").modal( 'hide' );
                        $("#modal_panier").modal( 'hide' );
                        $("#modal_livreur").modal( 'show' );
                        break;
                }
            });
        };



    $("#close_chat").click(function () {
        $("#modal_chat").modal('hide');
    });
    $("#show_chat").click(function () {
        $("#modal_chat").modal('show');
    });

    $("#send_chat").click(function () {
        var from = $("#chat_id_from").prop('value');
        //alert(from);
        if(from == '' || from == undefined) return;
        var data =
        {
            to: from,
            from: id,
            type: 0,
            msg:  $("#message_value").val()
        }

        $.ajax({
            type: "GET",
            dataType: "json",
            data: data,

            url: "http://62.73.5.5:1337/message",
            //url: "http://62.73.5.5:1337/validate/"+JSON.stringify(id),
            success: function (msg) {

                var pathImage = (msg.img =='cartoon.png')?'default':img.from;
                var templateChat = '<div class="row"><div class="col-lg-12"><div class="media"><a class="pull-left" href="#">';
                templateChat += '<img class="media-object img-circle" src="http://dev.myburgernow.com/data_cni/'+pathImage+'/'+msg.img+'" alt=""></a><div class="media-body">';
                templateChat += '<h4 class="media-heading">Moi<span class="small pull-right">' +msg.h +'</span></h4>';
                templateChat += '<p>'+msg.msg+'</p></div></div></div></div><hr>';
                $("#chat_content").append(templateChat);
                $('#chat_content').stop().animate({
                    scrollTop: $("#chat")[0].scrollHeight
                }, 800);
                $("#message_value").prop('value', '');
                $("#modal_chat").modal('show');
            }
        });
    });


