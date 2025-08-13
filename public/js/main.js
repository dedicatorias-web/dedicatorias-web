import { imageDatabase } from './imageList.js';

// Encontra os elementos na página
const imageElement = document.getElementById('random-image');
const shareButton = document.getElementById('share-button');

// --- LÓGICA PARA SORTEAR E EXIBIR A IMAGEM ---

// 1. Sorteia um caminho de imagem da lista
const randomImagePath = imageDatabase[Math.floor(Math.random() * imageDatabase.length)];

// 2. Define o src da imagem para que ela apareça na tela
imageElement.src = randomImagePath;

// --- LÓGICA PARA COMPARTILHAR O ARQUIVO DA IMAGEM ---

shareButton.addEventListener('click', async () => {
    try {
        // Mostra um feedback para o usuário de que algo está acontecendo
        shareButton.textContent = 'Preparando...';
        shareButton.disabled = true;

        // 1. Baixa os dados da imagem que está sendo exibida usando fetch()
        const response = await fetch(imageElement.src);
        if (!response.ok) {
            throw new Error('Falha ao baixar a imagem.');
        }
        
        // 2. Converte os dados da imagem para um formato binário (Blob)
        const blob = await response.blob();

        // 3. Pega o nome do arquivo a partir do caminho (ex: 'imagens/foto.png' -> 'foto.png')
        const filename = randomImagePath.split('/').pop();

        // 4. Cria um "Arquivo" virtual com os dados do blob
        const file = new File([blob], filename, { type: blob.type });

        // 5. Verifica se o navegador pode compartilhar este arquivo
        if (navigator.share && navigator.canShare({ files: [file] })) {
            // Tenta compartilhar o ARQUIVO
            await navigator.share({
                title: 'Olha essa imagem!',
                files: [file]
            });
            console.log('Arquivo compartilhado com sucesso!');
        } else {
            alert("Seu navegador não suporta o compartilhamento direto de arquivos.");
        }

    } catch (error) {
        console.error('Erro ao compartilhar a imagem:', error);
        alert('Não foi possível preparar a imagem para o compartilhamento.');
    } finally {
        // Restaura o botão ao seu estado original
        shareButton.textContent = 'Compartilhar Imagem 🚀';
        shareButton.disabled = false;
    }
});
