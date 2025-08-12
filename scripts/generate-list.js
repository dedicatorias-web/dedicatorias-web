// Importa as ferramentas necessárias do Node.js
const fs = require('fs');
const path = require('path');

// Caminho para a pasta onde as imagens estão
const imagesDirectory = path.join(__dirname, '../public');
// Caminho onde o arquivo com a lista será salvo
const outputPath = path.join(__dirname, '../public/js/imageList.js');

// Lê todos os arquivos do diretório de imagens
const imageFiles = fs.readdirSync(imagesDirectory)
    // Filtra para pegar apenas arquivos de imagem
    .filter(file => /\.(jpe?g|png|gif)$/i.test(file));

// Cria o conteúdo do arquivo JavaScript
// Ex: export const imageDatabase = ["imagem1.jpg", "imagem2.jpg"];
const fileContent = `export const imageDatabase = ${JSON.stringify(imageFiles)};`;

// Escreve o conteúdo no arquivo de saída
fs.writeFileSync(outputPath, fileContent);

console.log('Lista de imagens gerada com sucesso!', fileContent);
