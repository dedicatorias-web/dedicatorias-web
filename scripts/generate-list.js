// Importa as ferramentas necessárias do Node.js
const fs = require('fs');
const path = require('path');

// Caminho para a pasta onde as imagens estão
const imagesDirectory = path.join(__dirname, '../public/imagens');

// Caminho onde o arquivo com a lista será salvo
const outputPath = path.join(__dirname, '../public/js/imageList.js');

try {
    // 1. Lê todos os arquivos do diretório de imagens e filtra
    const imageFiles = fs.readdirSync(imagesDirectory)
        .filter(file => /\.(jpe?g|png|gif)$/i.test(file));

    // 2. ATENÇÃO AQUI: Monta o caminho relativo para cada imagem
    // O main.js precisa do caminho 'imagens/nome_do_arquivo.png'
    const imagePaths = imageFiles.map(file => `imagens/${file}`);

    // 3. ATENÇÃO AQUI: Cria o conteúdo do arquivo usando "imageDatabase"
    // Esta variável precisa ter o mesmo nome que é usado no import do main.js
    const fileContent = `// Este arquivo é gerado automaticamente. Não edite manualmente.
export const imageDatabase = ${JSON.stringify(imagePaths, null, 2)};`;

    // 4. Escreve o conteúdo no arquivo de saída
    fs.writeFileSync(outputPath, fileContent);

    console.log(`✅ Lista de imagens ("imageDatabase") gerada com sucesso em public/js/imageList.js`);

} catch (error) {
    console.error('❌ Erro ao gerar a lista de imagens:', error.message);
    console.error('Verifique se o diretório "public/imagens" existe e contém imagens.');
}
