/*!
    * Start Bootstrap - SB Admin v7.0.5 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2022 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 
window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

$(document).ready(function(){
    // Código necessário para o funcionamento do Popover do bootstrap
    $('[data-bs-toggle="popover"]').popover();

    //Inicia a contagem regressiva para o redirecionamento do usuario a pagina de login
    timer();
    
    // Remove os alertas que carregam com a pagina
    setTimeout(function(){
        if ( $('.alertPage').hasClass('show') ) 
        {
            $(".alertPage").fadeTo(5000, 0).slideUp(100, function(){
                $(this).addClass("fade");
                $(this).addClass("d-none");
            });
        }
    },10000);
});

function showFiles(button)
{
    const size = button.getAttribute('data-laudo').split('.').length - 1;
    const url = button.getAttribute('data-laudo');
    const ext = button.getAttribute('data-laudo').split('.')[size];

    if ( ext == 'pdf') 
    {
        $('#modalShowFileImage').css('display','none');
        $('#modalShowFilePdf').css('display','');
        
        $('#modalShowFileImage').empty();
        $('#modalShowFilePdf').empty();
        $('#modalShowFilePdf').append('<div class="col-md-12 mb-3" id="pdfFile" style="width: 100%; min-height: 70vh;"></div>');
        
        if ( PDFObject.supportsPDFs ) 
        {
            PDFObject.embed(button.getAttribute('data-laudo'), $('#pdfFile'));
        }
        else
        {
            $('#pdfFile').empty();
            $('#pdfFile').append('<label><i class="fas fa-exclamation-circle"></i>Seu navegador não possuí suporte a visualização de PDF.</label>');
        }
    }
    else if( ext == 'png' || ext == 'jpg' || ext == 'jpeg')
    {
        $('#modalShowFileImage').css('display','');
        $('#modalShowFilePdf').css('display','none');

        $('#modalShowFilePdf').empty();
        $('#modalShowFileImage').empty();
        $('#modalShowFileImage').append('<div class="col-lg-12 mb-3"><img src="' + url + '" alt="Imagem do laudo" title="Imagem laudo" class="img-fuild" style="width: 100%"></div>');

    }

    abreFechaModalPorId('modalShowFile', '', 'abrir');
}

//Função para limpar os campos de um formulario por Id
function limpaFormularioPorId(id)
{
    $('#'+id).removeClass('was-validated');
    $('#'+id)[0].reset();
    $('#'+id).trigger("reset");
}

//Função para abrir ou fechar a modal, com a opção de limpar ou não o formulario da modal
function abreFechaModalPorId(idModal, idForm, operacao)
{
    // Limpando form caso exista
    if(idForm != "")
    {
      limpaFormularioPorId(idForm);
    }
    // Abrindo modal
    if(operacao === "abrir")
    {
        $("#"+idModal).modal("show");
        $("#"+idModal).modal("handleUpdate");
    }
    // Fechando modal
    else if(operacao === "fechar")
    {
        $("#"+idModal).modal("hide");
    } 
}

// Função responsável de chamar as mensagens padrões
function abreFechaMensagemPadrao(acao, icone = null, tipo = null, texto = null){
    var numberHash = Math.floor(10000 + Math.random() * 90000);
    $("#divMessage").empty();
    
    if(acao)
    {
        $("#divMessage").append('<div class="alert alert-dismissible fixed-top m-2 fade d-none fs-6 position-fixed" role="alert" id="divMensagemPadrao" data-numberHash="'+numberHash+'" style="z-index: 99999999;"><strong><i id="iconeMensagemPadrao" class="fa-solid "></i></strong><label id="descricaoMensagemPadrao" class="ms-2"></label><button type="button" class="btn-close" aria-label="Close" onclick="abreFechaMensagemPadrao(false);"></button></div>');
        $("#divMessage").removeClass('d-none');
        //irá remover que esconde a div e inserir as classes para exibir a div de mensagem
        const divMensagem = document.querySelector('[data-numberHash="'+numberHash+'"]');
        const divMensagemIcone = document.querySelector('[data-numberHash="'+numberHash+'"] > strong > #iconeMensagemPadrao');
        const divMensagemText = document.querySelector('[data-numberHash="'+numberHash+'"] > #descricaoMensagemPadrao');

        divMensagem.classList.remove("alert-info");
        divMensagem.classList.remove("alert-warning");
        divMensagem.classList.remove("alert-danger");
        divMensagem.classList.remove("alert-success");
        divMensagem.classList.remove("fade");
        divMensagem.classList.remove("d-none");
        divMensagem.classList.add("show");
        divMensagem.classList.add(tipo);
        divMensagemIcone.classList.add(icone.split(" "));
        divMensagemText.innerHTML = texto;

        //Removendo a notificação automaticamente apos 5 segundos
        setTimeout(function(){
            divMensagem.classList.add('fadeOut');
            setTimeout(function(){
                divMensagem.remove();
            }, 5000);

        }, 10000);
    }
}

// Função para usar as validações de formulario do bootstrap
(function () {
    'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
    }, false)
})
})();

//Função para alterar a filial de login
$('#formModalSelectCei').submit(function(event)
{
    //Segura o envio padrão do form, para efetuar a validação
    event.preventDefault();
    //Valida se o form não obteve erros de validação
    if ( $('#formModalSelectCei')[0].checkValidity() )
    {
        //Inicializa as variaveis
        var retorno = null;
        var sucesso = false;
        var page = $('#inputPage').val();
        
        //Iniciando a requisição AJAX
        $.ajax({
            url: '/auth/doselectcei',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            beforeSend: function()
            {
                //Abrir o modal carregando
                abreFechaModalPorId('modalLoading', '', 'abrir');
                abreFechaModalPorId('modalChangeCei','','fechar');
            },
            success: function(response)
            {
                //Recebendo os dados da requisição
                retorno = response;
                sucesso = retorno.sucesso;
                //Verificando se teve sucesso no login
                if ( sucesso == true )
                {
                    //Redirecionar
                    location.href = '/' + page;
                    abreFechaModalPorId('modalChangeCei', 'formModalSelectCei', 'fechar');
                }
                else if ( sucesso == false )
                {
                    errors = '';
                    retorno.mensagem.forEach(function(objeto){
                        errors += ' ' + objeto;
                    });
                    abreFechaMensagemPadrao(true,'fa-exclamation-circle','alert-danger', errors);
                }
            },
            error: function(response)
            {
                var retorno = response;
                abreFechaMensagemPadrao(true, 'fa-exclamation-circle', 'alert-danger', 'Não foi possível conectar com o servidor. Erro: ' + response.status + ' - ' + response.statusText);
            },
            complete: function()
            {
                setTimeout(function(){
                    //fecha a modal carregando
                    abreFechaModalPorId('modalLoading', '', 'fechar');
                }, 500);
                if (!sucesso) 
                {   
                    setTimeout(function(){
                        abreFechaModalPorId('modalChangeCei','','abrir');
                    },1000);
                }
            },
        });
    }
});

// Função para validar o CEP
function validaCEP(strCEP)
{
    // verificando se CEP esta vazio
    if(strCEP === '')
    {
        return false;
    }
    // verificando quantidade de caracteres
    else if(strCEP.length != 9)
    {
        return false;
    }
    // verificando formato da string
    else
    {
        // Caso o CEP não esteja nesse formato ele é inválido!
        var objER = /^[0-9]{5}-[0-9]{3}$/;
        if(objER.test(strCEP))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

// Função para ativas a scrolling tabs por ID na nav bar
function ativaScrollingTabs(idNavBar)
{
    setTimeout(function(){
        var navbar = $('#'+idNavBar).scrollingTabs({
            scrollToTabEdge: true,
            disableScrollArrowsOnFullyScrolled: true,
            bootstrapVersion: 4,
        });
    }, 100);
}

//Função para ajustar a tabela por ID
function ajustaDataTablePorId(idTabela)
{
    setTimeout(function(){ 
        var table = $('#'+idTabela).DataTable();
        table.columns.adjust();
    }, 100);
}

// Função padrão bootstrap para validação de Formulários com validação bootstrap
(function() 
{
    'use strict';
    window.addEventListener('load', function() 
    {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) 
        {
            form.addEventListener('submit', function(event) 
            {
                if (form.checkValidity() === false) 
                {
                    event.preventDefault();
                    event.stopPropagation();

                    // Focando e apontando elemento inválido
                    var errorElements = null;
                    errorElements = document.querySelectorAll(".form-control:invalid");

                    if(errorElements.length != 0)
                    {
                        // capturando attr data-localizacaoelemento se houver para ativar a tab
                        var idLocalizacao = null;
                        idLocalizacao = $(errorElements[0]).attr('data-localizacaoelemento');
                        var idDataTable = null;
                        idDataTable = $(errorElements[0]).attr('data-iddatatable');
                        
                        if(idLocalizacao != null)
                        {
                            if(idLocalizacao != "modal")
                            {
                                $('.nav-tabs a[href="#'+idLocalizacao+'"]').tab('show');
                                $('.nav-tabs').scrollingTabs('scrollToActiveTab');
                                setTimeout(function(){ 
                                    $('.nav-tabs').scrollingTabs('refresh');
                                }, 200);
                            }

                            // ajustando data table
                            if(idDataTable != null)
                            {
                                ajustaDataTablePorID(idDataTable);
                            }
                        }

                        if(idLocalizacao != "modal")
                        {
                            setTimeout(function(){
                                errorElements[0].scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center',
                                    inline: 'center'
                                });
                            }, 500);
                            // $('html, body').animate({
                                // scrollTop: $(errorElements[0]).offset().top
                            // }, 300); 
                        }
                        else if(idLocalizacao == "modal")
                        {
                            $('.modal-body').animate({
                                scrollTop: $(errorElements[0]).offset().top - 200
                            }, 300); 
                        }
                        
                        setTimeout(function(){ 
                            $(errorElements[0]).focus();
                        }, 200);   
                        
                    }
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function geraIndicadoresCards(ano = null, capacidade = null, ocupacao = null, feminino = null, masculino = null)
{
    $('#divHeader').empty();
    $('#divCapacidade').empty();
    $('#divOcupacao').empty();
    $('#divFeminino').empty();
    $('#divMasculino').empty();

    $('#divHeader').append('Informações Ano Letivo ' + ano);
    $('#divCapacidade').append(capacidade);
    $('#divOcupacao').append(ocupacao);
    $('#divFeminino').append(feminino);
    $('#divMasculino').append(masculino);
}

function geraOcupacaoSala(salas)
{
    $('#divOcupacaoSala').empty();

    dados = '';

    salas.forEach(function(objeto){
        dados += '<div class="col-md-12 mt-2"><div class="mb-1" style="display: flex; justify-content: space-between; align-items: center "><span> ' + objeto.sal_nome + ' - ' + objeto.sal_periodo + '</span><span class="small"> ' + objeto.matriculados + ' / ' + objeto.asc_quantidadevagas + ' ( ' + (objeto.matriculados / objeto.asc_quantidadevagas * 100).toFixed(2) + '% ) </span></div><div class="progress"><div class="progress-bar progress-bar-striped';

        if ( objeto.sal_periodo == 'Integral')
        {
            dados += ' bg-success';
        }
        else if ( objeto.sal_periodo == 'Vespertino' )
        {
            dados += ' bg-warning';
        }
        else if ( objeto.sal_periodo == 'Matutino' )
        {
            dados += ' bg-primary';
        }

        dados += '" role="progressbar" aria-label="Success striped example" style="width: ' + (objeto.matriculados / objeto.asc_quantidadevagas) * 100 + '%" aria-valuenow="' + objeto.matriculados + '" aria-valuemin="0" aria-valuemax="' + objeto.asc_quantidadevagas + '"></div></div></div>';
    });

    $('#divOcupacaoSala').append(dados);
}

function geraGraficoMatriculas(matriculas = null, cancelados = null, anoletivo = null)
{
    var matriculadosDefault = $('#chartMatriculaMes').attr('data-matriculas');
    var canceladosDefault = $('#chartMatriculaMes').attr('data-cancelados');
    var anoLetivoDefault = $('#chartMatriculaMes').attr('data-ano');

    $('#divMatriculasMes').empty();
    $('#divMatriculasMes').append('<canvas id="chartMatriculaMes" width="400" style="max-height: 40vh;" data-matriculas="" data-cancelados="" data-ano=" "></canvas>');
    $('#chartMatriculaMes').attr('data-matriculas',matriculadosDefault);
    $('#chartMatriculaMes').attr('data-cancelados',canceladosDefault);
    $('#chartMatriculaMes').attr('data-ano',anoLetivoDefault);

    if ( (matriculas != null) && (cancelados != null) ) 
    {
        $('#chartMatriculaMes').attr('data-matriculas', JSON.stringify(matriculas));
        $('#chartMatriculaMes').attr('data-cancelados', JSON.stringify(cancelados));
        $('#chartMatriculaMes').attr('data-ano', JSON.stringify(anoletivo));

        var matriculadosDefault = JSON.parse($('#chartMatriculaMes').attr('data-matriculas'));
        var canceladosDefault = JSON.parse($('#chartMatriculaMes').attr('data-cancelados'));
        var anoLetivoDefault = JSON.parse($('#chartMatriculaMes').attr('data-ano'));
    }
    else
    {
        var matriculadosDefault = JSON.parse($('#chartMatriculaMes').attr('data-matriculas'));
        var canceladosDefault = JSON.parse($('#chartMatriculaMes').attr('data-cancelados'));
        var anoLetivoDefault = JSON.parse($('#chartMatriculaMes').attr('data-ano'));
    }
    console.log(typeof anoLetivoDefault)
    const mesesAnos = [
        'Jan ' + (anoLetivoDefault - 1),
        'Fev ' + (anoLetivoDefault - 1),
        'Mar ' + (anoLetivoDefault - 1), 
        'Abr ' + (anoLetivoDefault - 1), 
        'Mai ' + (anoLetivoDefault - 1), 
        'Jun ' + (anoLetivoDefault - 1), 
        'Jul ' + (anoLetivoDefault - 1), 
        'Ago ' + (anoLetivoDefault - 1), 
        'Set ' + (anoLetivoDefault - 1), 
        'Out ' + (anoLetivoDefault - 1), 
        'Nov ' + (anoLetivoDefault - 1), 
        'Dez ' + (anoLetivoDefault - 1),
        'Jan ' + anoLetivoDefault, 
        'Fev ' + anoLetivoDefault, 
        'Mar ' + anoLetivoDefault, 
        'Abr ' + anoLetivoDefault, 
        'Mai ' + anoLetivoDefault, 
        'Jun ' + anoLetivoDefault, 
        'Jul ' + anoLetivoDefault, 
        'Ago ' + anoLetivoDefault, 
        'Set ' + anoLetivoDefault, 
        'Out ' + anoLetivoDefault, 
        'Nov ' + anoLetivoDefault, 
        'Dez ' + anoLetivoDefault]

    const maiornumgrafico = Math.max(...matriculadosDefault,...canceladosDefault);

    const graficoMatriculas = document.getElementById('chartMatriculaMes').getContext('2d');
    const grafMatriculas = new Chart(graficoMatriculas, {
        type: 'line',
        data: {
            labels: mesesAnos,
            datasets: [{
                label: 'Matrículas',
                data: matriculadosDefault,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.3,
                fill: true,
            },{
                label: 'Cancelados',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderColor: 'rgb(210, 75, 75)',
                tension: 0.3,
                data: canceladosDefault,
                fill: true,
            }]
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: maiornumgrafico + 2,
                    ticks: {
                        stepSize: 1,
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true,
        }
    });
}

function geraGraficoAproveitamento(salas = null, vagas = null, ativos = null, finalizados = null, cancelados = null)
{
    var salasDefault = $('#chartAproveitamentoTurma').attr('data-salas');
    var vagasDefault = $('#chartAproveitamentoTurma').attr('data-vagas');
    var matrAtivosDefault = $('#chartAproveitamentoTurma').attr('data-ativos');
    var matrFinalizadosDefault = $('#chartAproveitamentoTurma').attr('data-finalizados');
    var matrCanceladosDefault = $('#chartAproveitamentoTurma').attr('data-cancelados');
    
    $('#divAproveitamentoTurma').empty();
    $('#divAproveitamentoTurma').append('<canvas id="chartAproveitamentoTurma" width="400" style="max-height: 40vh;" data-salas="" data-ativos="" data-finalizados="" data-cancelados="" data-vagas=""></canvas>');
    $('#chartAproveitamentoTurma').attr('data-salas',salasDefault);
    $('#chartAproveitamentoTurma').attr('data-vagas',vagasDefault);
    $('#chartAproveitamentoTurma').attr('data-ativos',matrAtivosDefault);
    $('#chartAproveitamentoTurma').attr('data-finalizados',matrFinalizadosDefault);
    $('#chartAproveitamentoTurma').attr('data-cancelados',matrCanceladosDefault);

    if ( (salas != null) && (vagas != null) && (ativos != null) && (finalizados != null) && (cancelados != null) ) 
    {
        $('#chartAproveitamentoTurma').attr('data-salas', JSON.stringify(salas));
        $('#chartAproveitamentoTurma').attr('data-vagas', JSON.stringify(vagas));
        $('#chartAproveitamentoTurma').attr('data-ativos', JSON.stringify(ativos));
        $('#chartAproveitamentoTurma').attr('data-finalizados', JSON.stringify(finalizados));
        $('#chartAproveitamentoTurma').attr('data-cancelados', JSON.stringify(cancelados));

        var salasDefault = JSON.parse($('#chartAproveitamentoTurma').attr('data-salas'));
        var vagasDefault = JSON.parse($('#chartAproveitamentoTurma').attr('data-vagas'));
        var matrAtivosDefault = JSON.parse($('#chartAproveitamentoTurma').attr('data-ativos'));
        var matrFinalizadosDefault = JSON.parse($('#chartAproveitamentoTurma').attr('data-finalizados'));
        var matrCanceladosDefault = JSON.parse($('#chartAproveitamentoTurma').attr('data-cancelados'));
    }
    else
    {
        var salasDefault = JSON.parse($('#chartAproveitamentoTurma').attr('data-salas'));
        var vagasDefault = JSON.parse($('#chartAproveitamentoTurma').attr('data-vagas'));
        var matrAtivosDefault = JSON.parse($('#chartAproveitamentoTurma').attr('data-ativos'));
        var matrFinalizadosDefault = JSON.parse($('#chartAproveitamentoTurma').attr('data-finalizados'));
        var matrCanceladosDefault = JSON.parse($('#chartAproveitamentoTurma').attr('data-cancelados'));
    }

    var maiorNumGrafAproveitamento = Math.max(...matrAtivosDefault,...matrFinalizadosDefault, ...matrCanceladosDefault, ...vagasDefault);

    const graficoAproveitamento = document.getElementById('chartAproveitamentoTurma').getContext('2d');
    const grafAproveitamento = new Chart(graficoAproveitamento, {
        type: 'bar',
        data: {
            labels: salasDefault,
            datasets: [{
                label: 'Vagas',
                data: vagasDefault,
                backgroundColor: 'rgb(255, 193, 7)',
                borderColor: 'rgba(0, 0, 0, 0.05)',
                tension: 0.3,
                fill: true,
            },{
                label: 'Ativos',
                data: matrAtivosDefault,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(0, 0, 0, 0.05)',
                tension: 0.3,
                fill: true,
            },{
                label: 'Cancelados',
                backgroundColor: 'rgb(210, 75, 75)',
                borderColor: 'rgba(0, 0, 0, 0.05)',
                tension: 0.3,
                data: matrCanceladosDefault,
                fill: true,
            },{
                label: 'Finalizados',
                backgroundColor: 'rgb(25, 135, 84)',
                borderColor: 'rgba(0, 0, 0, 0.05)',
                tension: 0.3,
                data: matrFinalizadosDefault,
                fill: true,
            }]
        },
         options: {
           scales: {
                    y: {
                        min: 0,
                        max: maiorNumGrafAproveitamento + 2,
                        ticks: {
                            stepSize: 1,
                        }
                    }
                },
            responsive: true,
            maintainAspectRatio: true,
        }
    });
}

function geraGraficoFaixaEtaria(idades = null, qtdIdades = null)
{
    var idadesDefault = $('#chartFaixaEtaria').attr('data-idades');
    var qtdIdadesDefault = $('#chartFaixaEtaria').attr('data-qtdidades');

    $('#divFaixaEtaria').empty();
    $('#divFaixaEtaria').append('<canvas id="chartFaixaEtaria" width="400" style="max-height: 40vh;" data-idades="" data-qtdidades="" ></canvas>');
    $('#chartFaixaEtaria').attr('data-idades',idadesDefault);
    $('#chartFaixaEtaria').attr('data-qtdidades',qtdIdadesDefault);

    if ( (idades != null) && (qtdIdades != null) )
    {
        $('#chartFaixaEtaria').attr('data-idades', JSON.stringify(idades));
        $('#chartFaixaEtaria').attr('data-qtdidades', JSON.stringify(qtdIdades));
        var idadesDefault = JSON.parse($('#chartFaixaEtaria').attr('data-idades'));
        var qtdIdadesDefault = JSON.parse($('#chartFaixaEtaria').attr('data-qtdidades'));
    }
    else
    {
        var idadesDefault = JSON.parse($('#chartFaixaEtaria').attr('data-idades'));
        var qtdIdadesDefault = JSON.parse($('#chartFaixaEtaria').attr('data-qtdidades'));
    }

    var maiorNumGrafFaixaEtaria = Math.max(...qtdIdadesDefault);

    const graficoFaixaEtaria = document.getElementById('chartFaixaEtaria').getContext('2d');
    const grafFaixaEtaria = new Chart(graficoFaixaEtaria, {
        type: 'line',
        data: {
            labels: idadesDefault,
            datasets: [{
                label: 'Alunos',
                data: qtdIdadesDefault,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderColor: 'rgb(255, 193, 7)',
                tension: 0.3,
                fill: true,
            }]
        },
        options: {
           scales: {
                    y: {
                        min: 0,
                        max: maiorNumGrafFaixaEtaria + 2,
                        ticks: {
                            stepSize: 1,
                        }
                    }
                },
            responsive: true,
            maintainAspectRatio: true,
        }
    });
}

function geraGraficoSexo(salas = null, masculino = null, feminino = null)
{
    var salasDefault = $('#chartSexoTurma').attr('data-salas');
    var masculinoDefault = $('#chartSexoTurma').attr('data-masculinos');
    var femininoDefault = $('#chartSexoTurma').attr('data-femininos');

    $('#divSexoTurma').empty();
    $('#divSexoTurma').append('<canvas id="chartSexoTurma" width="400" style="max-height: 40vh;" data-salas="" data-masculinos="" data-femininos=""></canvas>');
    $('#chartSexoTurma').attr('data-salas',salasDefault);
    $('#chartSexoTurma').attr('data-masculinos',masculinoDefault);
    $('#chartSexoTurma').attr('data-femininos',femininoDefault);

    if( (salas != null) && (masculino != null) && (feminino != null) )
    {
        $('#chartSexoTurma').attr('data-masculinos', JSON.stringify(masculino));
        $('#chartSexoTurma').attr('data-salas', JSON.stringify(salas));
        $('#chartSexoTurma').attr('data-femininos', JSON.stringify(feminino));

        var salasDefault = JSON.parse($('#chartSexoTurma').attr('data-salas'));
        var masculinoDefault = JSON.parse($('#chartSexoTurma').attr('data-masculinos'));
        var femininoDefault = JSON.parse($('#chartSexoTurma').attr('data-femininos'));
    }
    else
    {
        var salasDefault = JSON.parse($('#chartSexoTurma').attr('data-salas'));
        var masculinoDefault = JSON.parse($('#chartSexoTurma').attr('data-masculinos'));
        var femininoDefault = JSON.parse($('#chartSexoTurma').attr('data-femininos'));
    }

    var maiorNumGrafSexo = Math.max(...masculinoDefault,...femininoDefault);

    const graficoSexo = document.getElementById('chartSexoTurma').getContext('2d');
    const grafSexo = new Chart(graficoSexo, {
        type: 'bar',
        data: {
            labels: salasDefault,
            datasets: [{
                label: 'Masculino',
                data: masculinoDefault,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(0, 0, 0, 0.05)',
                tension: 0.3,
                fill: true,
            },{
                label: 'Feminino',
                backgroundColor: 'rgb(210, 75, 75)',
                borderColor: 'rgba(0, 0, 0, 0.05)',
                tension: 0.3,
                data: femininoDefault,
                fill: true,
            }]
        },
         options: {
           scales: {
                    y: {
                        min: 0,
                        max: maiorNumGrafSexo + 2,
                        ticks: {
                            stepSize: 1,
                        }
                    }
                },
            responsive: true,
            maintainAspectRatio: true,
        }
    });
}

function geraGraficoReligioes(religioes = null)
{
    var religioesDefault = $('#chartReligiao').attr('data-religioes');

    $('#divReligiao').empty();
    $('#divReligiao').append('<canvas id="chartReligiao" width="400" style="max-height: 40vh;" data-religioes="" ></canvas>');
    $('#chartReligiao').attr('data-religioes', religioesDefault);

    if( religioes != null )
    {
        $('#chartReligiao').attr('data-religioes', JSON.stringify(religioes));
        var religioesDefault = JSON.parse($('#chartReligiao').attr('data-religioes'));
    }
    else
    {
        var religioesDefault = JSON.parse($('#chartReligiao').attr('data-religioes'));
    }

    const graficoReligiao = document.getElementById('chartReligiao').getContext('2d');
    const grafReligiao = new Chart(graficoReligiao, {
        type: 'doughnut',
        data: {
            labels: ['Católico','Evangélico','Espírita','Umbanda','Candomblé','Judaica','Ateu','Outra'],
            datasets: [{
                label: 'Masculino',
                data: religioesDefault,
                backgroundColor: 
                [
                'rgb(54, 162, 235)',
                'rgb(255, 193, 7)',
                'rgb(25, 135, 84)',
                'rgb(210, 75, 75)',
                'rgb(255, 145, 20)',
                'rgb(33, 37, 41)',
                'rgb(125, 38, 219)',
                'rgb(91, 218, 39)',
                ],
                borderColor: 'rgb(255, 255, 255)',
                tension: 0.3,
                fill: true,
                hoverOffset: 10
            }]
        },
         options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: 20
            }
        }
    });
}

function geraGraficoMatRemPorAno(anos = null, matriculas = null, rematriculas = null)
{
    $('#divMatRemPorAno').empty();
    $('#divMatRemPorAno').append('<canvas id="chartMatRemPorAno" width="400" style="max-height: 40vh;" data-anos="" data-matriculas="" data-rematriculas="" ></canvas>');
    
    $('#chartMatRemPorAno').attr('data-anos', JSON.stringify(anos));
    $('#chartMatRemPorAno').attr('data-matriculas', JSON.stringify(matriculas));
    $('#chartMatRemPorAno').attr('data-rematriculas', JSON.stringify(rematriculas));

    var anosDefault = JSON.parse($('#chartMatRemPorAno').attr('data-anos'));
    var matriculasDefault = JSON.parse($('#chartMatRemPorAno').attr('data-matriculas'));
    var rematriculasDefault = JSON.parse($('#chartMatRemPorAno').attr('data-rematriculas'));

    var maiorNumGrafMatRemPorAno = Math.max(...matriculasDefault, ...rematriculasDefault);

    const graficoMatRemPorAno = document.getElementById('chartMatRemPorAno').getContext('2d');
    const grafMatRemPorAno = new Chart(graficoMatRemPorAno, {
        type: 'bar',
        data: {
            labels:anosDefault ,
            datasets: [{
                label: 'Matrículas',
                data: matriculasDefault,
                backgroundColor: 'rgb(54, 162, 235)',
                tension: 0.3,
                fill: true,
            },{
                label: 'Rematrículas',
                data: rematriculasDefault,
                backgroundColor: 'rgb(210, 75, 75)',
                tension: 0.3,
                fill: true,
            }]
        },
         options: {
           scales: {
                    y: {
                        min: 0,
                        max: maiorNumGrafMatRemPorAno + 2,
                        ticks: {
                            stepSize: 1,
                        }
                    }
                },
            responsive: true,
            maintainAspectRatio: true,
        }
    });
}

function geraGraficoRacas(racas = null)
{
    var racasDefault = $('#chartRacas').attr('data-racas');

    $('#divRacas').empty();
    $('#divRacas').append('<canvas id="chartRacas" width="400" style="max-height: 40vh;" data-racas="" ></canvas>');
    $('#chartRacas').attr('data-racas', racasDefault);

    if( racas != null )
    {
        $('#chartRacas').attr('data-racas', JSON.stringify(racas));
        var racasDefault = JSON.parse($('#chartRacas').attr('data-racas'));
    }
    else
    {
        var racasDefault = JSON.parse($('#chartRacas').attr('data-racas'));
    }

    const graficoRacas = document.getElementById('chartRacas').getContext('2d');
    const grafRacas = new Chart(graficoRacas, {
        type: 'pie',
        data: {
            labels: ['Branco','Preto','Pardo','Amarelo','Indígena','Outro'],
            datasets: [{
                label: 'Raças',
                data: racasDefault,
                backgroundColor: 
                [
                'rgb(54, 162, 235)',
                'rgb(255, 193, 7)',
                'rgb(25, 135, 84)',
                'rgb(210, 75, 75)',
                'rgb(255, 145, 20)',
                'rgb(33, 37, 41)',
                ],
                borderColor: 'rgb(255, 255, 255)',
                tension: 0.3,
                fill: true,
                hoverOffset: 10
            }]
        },
         options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: 20
            }
        }
    });
}

$('#checkPolitica').change(function(){
    if ( ($('#checkPolitica').is(':checked')) && ($('#checkTermos').is(':checked')) ) 
    {
        $('#btnPoliticaTermos').removeClass('disabled');
    }
    else
    {
        $('#btnPoliticaTermos').addClass('disabled');   
    }
});
$('#checkTermos').change(function(){
    if ( ($('#checkPolitica').is(':checked')) && ($('#checkTermos').is(':checked')) ) 
    {
        $('#btnPoliticaTermos').removeClass('disabled');
    }
    else
    {
        $('#btnPoliticaTermos').addClass('disabled');   
    }
});

// Requisição da modal Politicas e termos
$('#formpoliticatermos').submit(function(event)
{
    //Segura o envio padrão do form, para efetuar a validação
    event.preventDefault();
    //Valida se o form não obteve erros de validação
    if ( $('#formpoliticatermos')[0].checkValidity() )
    {
        //Inicializa as variaveis
        var retorno = null;
        var sucesso = false;
        //Iniciando a requisição AJAX
        $.ajax({
            url: '/configuracoes/a/acceptpoliticatermos',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            beforeSend: function()
            {
                //Abrir o modal carregando
                abreFechaModalPorId('modalAceitarPoliticasTermos', '', 'fechar');
                abreFechaModalPorId('modalLoading', '', 'abrir');
            },
            success: function(response)
            {
                //Recebendo os dados da requisição
                retorno = response;
                sucesso = retorno.sucesso;

                //Verificando se teve sucesso no login
                if ( sucesso == true )
                {
                    abreFechaMensagemPadrao(true,'fa-check-circle','alert-success', 'Políticas de privacidade e Termos & Condições aceito com sucesso!');
                    //Redirecionar
                    setTimeout(function(){
                        //fecha a modal carregando
                        $('#modalAceitarPoliticasTermos').removeClass('show');
                        $('#modalAceitarPoliticasTermos').css('display', '');
                        $('#sombraDiv').remove(); 
                        abreFechaModalPorId('modalAceitarPoliticasTermos', 'formpoliticatermos', 'fechar');
                    }, 500);
                }
                else if ( sucesso == false )
                {
                    errors = '';
                    retorno.mensagem.forEach(function(objeto){
                        errors += ' ' + objeto;
                    });
                    abreFechaMensagemPadrao(true,'fa-exclamation-circle','alert-danger', errors);
                }
            },
            error: function(response)
            {
                var retorno = response;
                abreFechaMensagemPadrao(true, 'fa-exclamation-circle', 'alert-danger', 'Não foi possível conectar com o servidor. Erro: ' + response.status + ' - ' + response.statusText);
            },
            complete: function()
            {
                setTimeout(function(){
                    //fecha a modal carregando
                    abreFechaModalPorId('modalLoading', '', 'fechar');
                }, 500);
            },
        });
    }
});

$('#sidebarToggle').click(function()
{
    setTimeout(function(){
        $.fn.dataTable.tables( { visible: true, api: true } ).columns.adjust();
    }, 500);
});

//Faz a contagem do tempo e exibição
function timer() {
    var mm = 30;
    var ss = 1;

    var path = window.location.pathname;
    var page = path.split("/").pop();

    if ( page != 'auth' )
    {
        setInterval(() => {  
            ss--; //Incrementa +1 na variável ss

            if (ss == -1) { //Verifica se deu 59 segundos
                mm--; //Adiciona +1 na variável mm
                ss = 59; //Volta os segundos para 0
                if (mm == -1 && ss == 59) { //Verifica se deu 59 minutos
                    location.href = '/auth'
                }
            }


            //Cria uma variável com o valor tratado HH:MM:SS
            var format = (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
            
            contador = document.getElementById('counter');
            if ( contador )
            {
                //Insere o valor tratado no elemento counter
                contador.innerText = format;
            }

            //Retorna o valor tratado
            return format;
        }, 1000);
    }
}