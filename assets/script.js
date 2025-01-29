confirm("Are you sure you want to delete?")
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "23/12": titulo = "23 de desembro de 2024"; mensagem = "<p>Esse foi o dia que a gente saiu a primeira vez, a gente foi no bosque e conversou por horas queria tanto de dar um beijo mais voce so sabia falar q tava ferrada kkk</p>";break;
            case "24/12": titulo = "24 de dezembro de 2024"; mensagem = "<p>um dia antes do natal e vode desidio parar de falar comigo oque não funcinol pq logo logo a gente ja tava conversando.</p>enfim foi uma dia trsite pq fiquei sem falar com voce, acabei percebendo q não consigo ficar sem voce</p>";break;
            case "25/12": titulo = "25 de dezembro de 2024"; mensagem = "<p>Natal voce ate tendou parar de falar comigo de novo mais não deu certo kkk.</p>enfim isso so servio para perceber q te amo de mais e um dia sem falar com voce parece um ano</p>";break;
            case "28/12": titulo = "28 de dezembro de 2024"; mensagem = "<p>Enfim o tão sonhado dia do primeiro beijo, a gente foi para aquela festa em q a ronice ficou dando encima de mim kkkk</p>Pelo menos acabou bem ne, dei o melhor beijo do mundo, parecia q tinha tirado um peso das minhas costa foi um beijo maravilho e eu nem acreditava no que tava acontecendo </p>";break;
            case "31/12": titulo = "31 de dezembro de 2024"; mensagem = "<p>enfim ano novo um dia maravilhoso de dança na chuva e muito mais serio todo momento com voce é especial🤣<br></p><p>Nesse dia serio eu não consiguia acreditar no que estava acontecendo pra mim era seila um sonho, um sonho q acabou no 2x3kkkkkk não leva a mal<small><del></del></small>.</p>";break;
            case "01/01": titulo = "01 de janeiro de 2025"; mensagem = "<p>Dia 01 de janeiro o dia q a gente ficou horas e horas na rede conversando entre aspas e sua mãe de olho na gente kkk bom de mais </p>";break;
            case "02/01": titulo = "02 de janeiro de 2025"; mensagem = "<p> foi o dia q a gente foi no bosque caminhar mais a gente so sento e ficou conversando com a dani kkk</p>";break;
            case "03/01": titulo = "03 de janeiro de 2025"; mensagem = "<p>dia 3 a gente foi tomar umas ice la na conveniencia depois foi para a rede e ficou la por mais alguma horas kkkkkkk o resto eu não preciso falar ne kkk </p>";break;
            case "04/01": titulo = "04 de janeiro de 2025"; mensagem = "<p> Sabado voce me chamou para ir na pops chegando la sua irmã o mauro e o conrado tava la a gente foi para sua casa e ficou o dia todo junto kkk ";break;
            case "05/01": titulo = "05 de janeiro de 2025"; mensagem = "<p>domingo a gente foi no bosque com os meninos tiramos a foto q a gente uso como foto de fundo no celular e voce quebro a unha jogando volei </p>";break;
            case "07/01": titulo = "07 de janeiro de 2025"; mensagem = "<p>dia 7 de janeiro fui na sua casa e a gente ficou conversando no seu quarto seria nada de mais porem foi com voce então foi foda</p>";break;
            case "08/01": titulo = "08 de janeiro de 2025"; mensagem = " <p> dia 8 o dia q foi dentro kkkkkkkkkkkkkkkkk vou parar por aqui pq foi muitos encontros invrivei cada um deles especiais esse foi mas ainda te amo muito</p>";break; 
            case "final": titulo = "28 de janeiro de 2025"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela disse<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}