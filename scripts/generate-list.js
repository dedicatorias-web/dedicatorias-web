// ATUALIZADO: Usando a sintaxe moderna de 'import'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Correção para __dirname em ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// O resto do código permanece o mesmo

// Caminho para a pasta onde as imagens estão
const imagesDirectory = path.join(__dirname, '../public/imagens');

// Caminho onde o arquivo com la lista será salvo
const outputPath = path.join(__dirname, '../public/js/imageList.js');

try {
    // 1. Lê todos os arquivos do diretório de imagens e filtra
    const imageFiles = fs.readdirSync(imagesDirectory)
        .filter(file => /\.(jpe?g|png|gif)$/i.test(file));

    // 2. Monta o caminho relativo para cada imagem
    const imagePaths = imageFiles.map(file => `imagens/${file}`);

    // 3. Cria o conteúdo do arquivo usando "imageDatabase"
    const fileContent = `// Este arquivo é gerado automaticamente. Não edite manualmente.
export const imageDatabase = ${JSON.stringify(imagePaths, null, 2)};`;

    // 4. Escreve o conteúdo no arquivo de saída
    fs.writeFileSync(outputPath, fileContent);

    console.log(`✅ Lista de imagens ("imageDatabase") gerada com sucesso em public/js/imageList.js`);

} catch (error) {
    console.error('❌ Erro ao gerar a lista de imagens:', error.message);
    console.error('Verifique se o diretório "public/imagens" existe e contém imagens.');
}
