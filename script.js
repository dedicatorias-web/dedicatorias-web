// Função que aplica o fundo com base na imagem selecionada
function gerarImagem(caminho) {
  document.body.style.backgroundImage = `url(${caminho})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}

// Lê o JSON com os arquivos de imagem e preenche o <select>
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("background");

  fetch("imagens/imagens.json")
    .then(response => response.json())
    .then(imagens => {
      imagens.forEach((nome, index) => {
        if (nome.endsWith(".png")) {
          const option = document.createElement("option");
          option.value = `imagens/${nome}`;
          option.textContent = `Imagem ${index + 1}`;
          select.appendChild(option);
        }
      });

      // Aplica a primeira imagem como fundo padrão (opcional)
      if (select.options.length > 0) {
        select.selectedIndex = 0;
        gerarImagem(select.value);
      }
    })
    .catch(error => {
      console.error("Erro ao carregar imagens:", error);
    });

  // Atualiza o fundo ao mudar a seleção
  select.addEventListener("change", () => {
    gerarImagem(select.value);
  });
});


