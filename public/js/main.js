// Importa a lista de imagens que foi gerada automaticamente
import { imageDatabase } from './imageList.js';

// --- O resto do código é o que já tínhamos ---

// 1. Sorteia um nome de imagem da lista importada
const randomIndex = Math.floor(Math.random() * imageDatabase.length);
const randomImageSrc = imageDatabase[randomIndex];

// 2. Define a imagem na tela
const imageElement = document.getElementById('share-image');
imageElement.src = randomImageSrc; // Aponta para a imagem na raiz da pasta public

// 3. Lógica de compartilhamento
const shareButton = document.getElementById('share-button');
const title = 'Uma imagem para você!';
// ... (resto do código do addEventListener do shareButton continua igual)
shareButton.addEventListener('click', async () => { ... });
