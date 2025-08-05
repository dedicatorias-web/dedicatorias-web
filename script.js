function gerarImagem("https://dedicatorias-web.github.io/dedicatorias-web/");
) {
  document.body.style.backgroundImage = `url(${caminho})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("background");
  const carrosselContainer = document.querySelector(".carrossel-container");
  let imagens = [];
  let indice = 0;

  fetch("imagens/imagens.json")
    .then(response => response.json())
    .then(lista => {
      imagens = lista.filter(nome => nome.endsWith(".png"));
      
      imagens.forEach(nome => {
        const option = document.createElement("option");
        option.value = `imagens/${nome}`;
        option.textContent = " ";
        select.appendChild(option);

        const img = document.createElement("img");
        img.src = `imagens/${nome}`;
        carrosselContainer.appendChild(img);
      });

      if (select.options.length > 0) {
        select.selectedIndex = 0;
        gerarImagem(select.value);
      }
    });

  select.addEventListener("change", () => {
    gerarImagem(select.value);
  });

  // Controles do carrossel
  document.getElementById("prev").addEventListener("click", () => {
    indice = (indice - 1 + imagens.length) % imagens.length;
    carrosselContainer.style.transform = `translateX(-${indice * 100}%)`;
  });

  document.getElementById("next").addEventListener("click", () => {
    indice = (indice + 1) % imagens.length;
    carrosselContainer.style.transform = `translateX(-${indice * 100}%)`;
  });
});
