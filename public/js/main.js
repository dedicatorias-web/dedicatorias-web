// Importa a lista de imagens que foi gerada automaticamente
import { imageDatabase } from './imageList.js';

// --- LÓGICA PARA EXIBIR A IMAGEM ---

// 1. Sorteia um nome de imagem da lista
const randomIndex = Math.floor(Math.random() * imageDatabase.length);
const randomImageFile = imageDatabase[randomIndex]; // Ex: 'imagens/foto.png'

// 2. Monta o caminho final, garantindo que o nome do repositório está incluído
// Isso corrige o problema da imagem não aparecer no GitHub Pages
const basePath = window.location.pathname.endsWith('/') ? window.location.pathname.slice(0, -1) : window.location.pathname;
const finalImageSrc = `${basePath}/${randomImageFile}`;

// 3. Encontra o elemento da imagem e define o caminho (src)
const imageElement = document.getElementById('imagem-aleatoria');
if (imageElement) {
    imageElement.src = finalImageSrc;
} else {
    console.error('Elemento da imagem com id "imagem-aleatoria" não foi encontrado.');
}

// --- LÓGICA DO BOTÃO DE COMPARTILHAR ---

const shareButton = document.getElementById('share-button');

if (shareButton) {
    shareButton.addEventListener('click', () => {
        // Coloque aqui a sua lógica de compartilhamento que já existia.
        // Por exemplo, para compartilhar a imagem no WhatsApp:
        const title = 'Uma imagem para você!';
        const urlParaCompartilhar = window.location.href;

        // Verifica se o navegador suporta a API de compartilhamento
        if (navigator.share) {
            navigator.share({
                title: title,
                text: 'Veja esta imagem incrível!',
                url: urlParaCompartilhar,
            })
            .then(() => console.log('Compartilhado com sucesso!'))
            .catch((error) => console.log('Erro ao compartilhar:', error));
        } else {
            // Fallback para navegadores que não suportam a API (ex: desktop)
            // Abre o link do WhatsApp Web com uma mensagem
            const textoWhatsApp = encodeURIComponent(`Veja esta imagem incrível: ${urlParaCompartilhar}`);
            window.open(`https://api.whatsapp.com/send?text=${textoWhatsApp}`, '_blank');
        }
    });
} else {
    console.error('Botão com id "share-button" não foi encontrado.');
}
