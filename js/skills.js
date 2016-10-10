$(function() {
var sections = [];               // Nos sections correspondants aux ancres
var $navbar = $('.navbar-nav');  // L'élément contenant nos liens
var $navbara = $('a', $navbar);  // Nos liens 
var id=false;

var timelineBlocks = $('.cd-timeline-block'),
offset = 0.8;
    
    $('.btnScrollDown a, .navbar-nav a').click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop:$($(this).attr('href')).offset().top-$navbar.height()
        },1000);
        hash($(this).attr('href'));
    });

    $('.menuMobile').click(function(e){
        $('.menuDs').toggle();
        e.stopPropagation();
    }); 

    $navbara.each(function(){
    // On incrémente notre super tableau section avec les sections correspondant aux liens
    // <a href="HREF"...
    // $(HREF) <= l'élément correspondant au lien dans mon code HTML
    sections.push($($(this).attr('href')));     
    });

    function textReplace(){
        var text=$(".Title");
        var alltext=["Dessinateur Projeteur","Développeur Intégrateur Web","Directeur de magasin"];
        var i=0;
        // console.log(alltext[i]);
        setInterval(function(){
            text.fadeOut("slow",function(){
                $(this).html(alltext[i]);
            });
            text.fadeIn("slow",function(){});
            if (i<2){
                i++
            }else{
                i=0;
            }
            // console.log(i);
        },3000,text,alltext,i);
    }
    textReplace();

    $(window).scroll(function(e){
        var scrollTipTop = $(this).scrollTop()+150;
        var scrollTop = $(this).scrollTop() + ($(window).height() / 2.5);
        // La position du scroll + moitié de la fenêtre
        // On parcourt nos sections stocké préalablement

        if (scrollTipTop>($(window).height())){               
            $('.navbar-nav').fadeIn();
        }
        else{
             $('.navbar-nav').fadeOut();
        }
        for(var i in sections){
            var section = sections[i];
            // cette section est dépassé par le scroll ?
            if (scrollTop > section.offset().top) {
                scrolled_id = section.attr('id');   // On stocke son ID
            }
        }
        if(scrolled_id !== id){
            id=scrolled_id
            $navbara.removeClass('selected');
            $('a[href="#'+id+'"]', $navbar).addClass('selected');
        }

        //hide timeline blocks which are outside the viewport
        hideBlocks(timelineBlocks, offset);
        //on scolling, show/animate timeline blocks when enter the viewport
         (!window.requestAnimationFrame) 
                ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
                : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
        function hideBlocks(blocks, offset) {
            blocks.each(function(){
                ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
            });
        }
        function showBlocks(blocks, offset) {
            blocks.each(function(){
                ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            });
        }
        /////////   ANIMATION DIAGRAMME CIRCULAIRE ///////////////////////// 
        /* Check the location of each desired element */
        $('.chart').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight()+30;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            /* If the object is completely visible in the window, fade it in */
            if( bottom_of_window > bottom_of_object ){
                $(this).easyPieChart({
                easing: 'easeOutBack',
                delay: 3000,
                barColor: '#418FCD',
                trackColor: '#eee',
                scaleColor: false,
                lineWidth: 2.5,
                lineCap: 'square',
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }       
                });
            }
        });
    });

    var btn=document.querySelector('#btnInscr');    
        function controlForm(){
            // var mail=document.querySelector("#email").value;
            var nom=document.querySelector("#nom").value;
            var msg=document.querySelector("#msg").value;
            
            var errorNom=document.querySelector("#errorNom");
            // var errorMail=document.querySelector("#errorMail");
            // var mailInvalide=document.querySelector("#mailInvalide");
            var errorMsg=document.querySelector("#errorMsg");
            var error=0;
            // var succes=document.querySelector("#succes");
            


            /*condition*/
            // si champ mail vide
            // if(!mail){
            //     errorMail.style.display="block";                
            //     error+=1;
            // }
            // // si format mail invalide
            // else if(!/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(mail)){
            //     errorMail.style.display="none";
            //     mailInvalide.style.display="block";
            //     error+=1;
            // }
            // else{
            //     errorMail.style.display="none";
            //     mailInvalide.style.display="none";
            // }
            // si champ nom vide
            if(!nom){
                errorNom.style.display="block";
                error+=1;
            }
            else{
                errorNom.style.display="none";
            }
            // si champ message vide
            if(!msg){
                errorMsg.style.display="block";
                error+=1;
            }
            else{               
                errorMsg.style.display="none";              
            }

            // console.log(error);

            // si pas d'erreur
            if(error<1){        
                // alert message envoyé     
                // succes.style.display="block";  
               
                $(location).attr('href', 'mailto:contact@tom75.fr?subject='
                             + encodeURIComponent(nom)
                             + "&body=" 
                             + encodeURIComponent(msg)
                );
            }
            else{
                // succes.style.display="none";
            }
        }
    btn.addEventListener('click',controlForm,false);

});



hash=function(h){
    if(history.pushState){
        history.pushState(null, null, h);
    }else{
        location.hash=h;   
    }
    
}