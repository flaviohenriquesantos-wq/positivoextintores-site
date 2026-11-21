(function () {
  var f = document.getElementById('orc-form');
  if (!f) return;
  var a = document.getElementById('orc-enviar');
  var aviso = document.getElementById('orc-aviso');
  var base = 'https://wa.me/5537991215067?text=';
  function v(n) { var el = f.elements[n]; return el && el.value ? el.value.trim() : ''; }
  function build() {
    var linhas = ['Olá! Vim pelo site e quero um orçamento.'];
    function add(rotulo, n) { var x = v(n); if (x) linhas.push(rotulo + ': ' + x); }
    add('Serviço', 'servico'); add('Nome', 'nome'); add('Cidade', 'cidade');
    add('Tipo de imóvel', 'imovel'); add('Situação', 'situacao');
    add('Quantidade de extintores', 'qtd'); add('Observação', 'obs');
    a.href = base + encodeURIComponent(linhas.join('\n'));
    var ok = !!(v('servico') && v('cidade'));
    a.setAttribute('aria-disabled', ok ? 'false' : 'true');
    a.classList.toggle('is-off', !ok);
    if (ok && aviso) aviso.hidden = true;
  }
  f.addEventListener('input', build);
  f.addEventListener('change', build);
  f.addEventListener('submit', function (e) { e.preventDefault(); });
  a.addEventListener('click', function (e) {
    if (a.getAttribute('aria-disabled') === 'true') {
      e.preventDefault();
      if (aviso) aviso.hidden = false;
      (v('servico') ? f.elements['cidade'] : f.elements['servico']).focus();
    }
  });
  build();
})();
