function gerarImagem() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const fundoSelecionado = document.getElementById('background').value;
  const texto = document.getElementById('texto').value;
  const dedicatoria = document.getElementById('dedicatoria').value;

  const img = new Image();
  img.src = fundoSelecionado;

  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(texto, 30, 50);

    ctx.font = '18px Verdana';
    ctx.fillText(dedicatoria, 30, 100);

    const link = document.getElementById('baixarBtn');
    link.href = canvas.toDataURL();
    link.style.display = 'inline-block';
  };
}

