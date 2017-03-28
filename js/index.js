/*
    Trabalho de Contabilidade
    Desenvolvido por: Victor Ribeiro
    FB: fb.com/OVictorRibeiro
    Email: victor_ribeiro135@hotmail.com
    Github: github.com/JVRibeiro
*/

  var

  primeiraEntrada = true,

  // Cria variaveis para o controle de datas
  date = new Date(),
  d = date.getDate(),
  m = date.getMonth(),
  y = date.getFullYear(),
  now = new Date( y, m, d ),

// DOM
  entrSaida_data = document.querySelector( '#entrSaida_data' ),
  entrSaida_tipo = document.querySelector( '#entrSaida_tipo' ),
  entrSaida_qtd = document.querySelector( '#entrSaida_qtd' ),
  entrSaida_vUn = document.querySelector( '#entrSaida_vUn' ),

  $_entrSaida_data = window.localStorage.getItem( 'entrSaida_data' ),
  $_entrSaida_tipo = window.localStorage.getItem( 'entrSaida_tipo' ),
  $_entrSaida_qtd = window.localStorage.getItem( 'entrSaida_qtd' ),
  $_entrSaida_vUn = window.localStorage.getItem( 'entrSaida_vUn' ),

  qtd_total = document.querySelector( '#qtd_total' ),
  vUn_total = document.querySelector( '#vUn_total' ),
  valor_total = document.querySelector( '#valor_total' ),



// Objeto de dados do programa
  data =
  {
    saldo:
    {
      qtd: 0,
      vUn: 0,
      vTo: 0
    },

    // Métodos
    _cadastrar: function ()
    {
      if ( entrSaida_tipo.value === 'entrada'
        && entrSaida_data.value != ''
        && entrSaida_qtd.value != ''
        && entrSaida_vUn.value != '' )
      {

        data.saldo.qtd += Number( entrSaida_qtd.value );
        data.saldo.vUn += Number( entrSaida_vUn.value );
        data.saldo.vTo += Number( entrSaida_qtd.value ) * Number( entrSaida_vUn.value );
        data.saldo.vUn = data.saldo.vTo / data.saldo.qtd;

        qtd_total.innerHTML = data.saldo.qtd;
        vUn_total.innerHTML = moneyFix(data.saldo.vUn);
        valor_total.innerHTML = moneyFix(data.saldo.vTo);

        if ( localStorage['primeiraEntrada'] === 'false'
          && $( '#entrSaida_tipo option' ).size() === 1 )
        {
          $( '#entrSaida_tipo' ).append('<option value=\'saida\'>Saída</option>');
        }

        $( '#itens' ).append(
            '<li style=\'background-color: #dafff0;\'>'
            + 'Tipo: <strong>' + entrSaida_tipo.value + '</strong><br>'
            + 'Data: <strong>' + d + '/' + m + '/' + y + '</strong><br>'
            + 'Quantidade: <strong>' + Number( entrSaida_qtd.value ) + '</strong><br>'
            + 'Valor Unitário: <strong><span class=\'money_value\'>' + moneyFix(Number( entrSaida_vUn.value )) + '</span></strong><br>'
            + 'Valor Total: <strong><span class=\'money_value\'>'  + moneyFix((Number( entrSaida_qtd.value ) * Number( entrSaida_vUn.value ))) + '</span></strong><br>'
          + '</li>'
        );

        replaceComma();

        $( '#itens' ).animate({'scrollTop': $( '#itens' )[0].scrollHeight}, 'slow');

        window.localStorage.setItem( 'saldo_final', JSON.stringify( data.saldo ) );
        window.localStorage.setItem( 'primeiraEntrada', 'false');
        window.localStorage.setItem( 'produtos_cadastrados', $( '#itens' ).html() );

        if ( $( '#entrSaida_tipo option' ).size() === 1 )
        {
          $( '#entrSaida_tipo' ).append('<option value=\'saida\'>Saída</option>');
        }

        console.log(
          'Entrada:\nQuantidade: ' + data.saldo.qtd + '\n'
        + 'Valor unitário: ' + data.saldo.vUn + '\n'
        + 'Valor Total: ' + data.saldo.vTo + '\n----------------'
         );
      }
      else
      if ( entrSaida_tipo.value === 'saida'
        && entrSaida_data.value != ''
        && entrSaida_qtd.value != ''
        && entrSaida_vUn.value != '' )
      {
        data.saldo.qtd -= Number( entrSaida_qtd.value );
        data.saldo.vUn -= Number( entrSaida_vUn.value );
        data.saldo.vTo -= Number( entrSaida_qtd.value ) * Number( entrSaida_vUn.value );
        data.saldo.vUn = data.saldo.vTo / data.saldo.qtd;

        qtd_total.innerHTML = data.saldo.qtd;
        vUn_total.innerHTML = moneyFix(data.saldo.vUn);
        valor_total.innerHTML = moneyFix(data.saldo.vTo);

        $( '#itens' ).append(
            '<li style=\'background-color: #ffdada;\'>'
            + 'Tipo: <strong>' + entrSaida_tipo.value + '</strong><br>'
            + 'Data: <strong>' + d + '/' + m + '/' + y + '</strong><br>'
            + 'Quantidade: <strong>' + Number( entrSaida_qtd.value ) + '</strong><br>'
            + 'Valor Unitário: <strong><span class=\'money_value\'>' + moneyFix(Number( entrSaida_vUn.value )) + '</span></strong><br>'
            + 'Valor Total: <strong><span class=\'money_value\'>'  + moneyFix((Number( entrSaida_qtd.value ) * Number( entrSaida_vUn.value ))) + '</span></strong><br>'
          + '</li>'
        );

        replaceComma();

        window.localStorage.setItem( 'saldo_final', JSON.stringify( data.saldo ) );
        window.localStorage.setItem( 'primeiraEntrada', 'false');
        window.localStorage.setItem( 'produtos_cadastrados', $( '#itens' ).html() );

        if ( $( '#entrSaida_tipo option' ).size() === 1 )
        {
          $( '#entrSaida_tipo' ).append('<option value=\'saida\'>Saída</option>');
        }

        console.log(
          'Saída:\nQuantidade: ' + data.saldo.qtd + '\n'
        + 'Valor unitário: ' + data.saldo.vUn + '\n'
        + 'Valor Total: ' + data.saldo.vTo + '\n----------------'
         );
      }
      else
      {
        alert( 'Você esqueceu campos vazios' );
      }

      entrSaida_tipo.focus();
    }
  };



  m += 1; if ( m < 10 ) {m = 0 + '' + m}; entrSaida_data.value = y + '-' + m + '-' + d;


  setInterval(function ()
  {
    var nD = new Date();
    document.querySelector( '#currentTime' )
    .innerHTML = nD.toLocaleString();
  }, 1000);




  $( '#_cadastrar' ).on( 'click', function ()
  {
    data._cadastrar();
  });



  $( '#menu_btn' ).on( 'click', function ()
  {
    if ( !$( '#menu_btn' ).hasClass( 'is-active' ) )
    {
      $( '#menu_btn' )
      .addClass( 'is-active' );

      $( '#menu' )
      .removeClass('menu-closed')
      .addClass( 'menu-open' );
    }
    else
    {
      $( '#menu_btn' )
      .removeClass( 'is-active' );

      $( '#menu' )
      .removeClass('menu-open')
      .addClass( 'menu-closed' );
    }
  });



  $( '#menu ul li' ).on( 'click', function ()
  {
    $( '#menu_btn' )
    .removeClass( 'is-active' );

    $( '#menu' )
    .removeClass('menu-open')
    .addClass( 'menu-closed' );
  });


  $( '#info-btn' ).on( 'click', function ()
  {
    alert( 'Alunos:  \nJOÃO VICTOR RIBEIRO\nIASMYN REIS\nGEORGE LUCAS VIEIRA' );
  });



$( document ).ready(function ()
{
  if ( localStorage['saldo_final'] )
  {
    data.saldo = JSON.parse( localStorage.getItem('saldo_final') );
  }

  if ( localStorage['primeiraEntrada'] === 'false' )
  {
    $( '#entrSaida_tipo' ).append('<option value=\'saida\'>Saída</option>');

    $( '#itens' ).append(
        window.localStorage.getItem( 'produtos_cadastrados' )
    );
  }

  window.setTimeout(function()
  {
    $( '#itens' ).animate({'scrollTop': $( '#itens' )[0].scrollHeight}, 'slow');
  },1000);

  qtd_total.innerHTML = data.saldo.qtd;
  vUn_total.innerHTML = moneyFix(data.saldo.vUn);
  valor_total.innerHTML = moneyFix(data.saldo.vTo);

  replaceComma();
});


function moneyFix (val)
{
  var x = Number(Math.round(val + 'e2') + 'e-2').toFixed(3);
  return x;
}


function replaceComma ()
{
  var itens = [document.querySelector('#itens') ,document.querySelector('#vUn_total'), document.querySelector('#valor_total')];

  itens[0].innerHTML = itens[0].innerHTML.replace(/(\d)\.(\d)/gi, '$1,$2');
  itens[1].innerHTML = itens[1].innerHTML.replace(/(\d)\.(\d)/gi, '$1,$2');
  itens[2].innerHTML = itens[2].innerHTML.replace(/(\d)\.(\d)/gi, '$1,$2');
}
