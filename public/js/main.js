// Encontra os elementos do nosso generator.html
const messageTextarea = document.getElementById('message');
const generateButton = document.getElementById('generate-button');
const shareButton = document.getElementById('share-button');
const canvas = document.getElementById('generated-image-canvas');
const ctx = canvas.getContext('2d');

const backgroundImageSrc = 'imagens/fundo-flores.jpg';

// Função auxiliar para carregar uma imagem de forma assíncrona
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        // Permite o uso de imagens de outras origens no canvas (importante para o futuro)
        img.crossOrigin = "Anonymous"; 
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error(`Falha ao carregar a imagem: ${src}`));
        img.src = src;
    });
}

// Função principal que desenha no canvas
async function generateImage() {
    // Feedback visual para o usuário
    generateButton.textContent = 'Gerando...';
    generateButton.disabled = true;

    try {
        // 1. Carrega a imagem de fundo e espera ela estar pronta
        const backgroundImage = await loadImage(backgroundImageSrc);

        // 2. Limpa o canvas e desenha a imagem de fundo
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // 3. Adiciona um filtro escuro para melhor legibilidade do texto
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 4. Prepara a data e a mensagem
        const message = messageTextarea.value;
        const today = new Date();
        const dateText = today.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        });

        // 5. Desenha a DATA no canvas
        ctx.fillStyle = 'white';
        ctx.font = '18px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(dateText, canvas.width - 20, 30);

        // 6. Desenha a MENSAGEM PRINCIPAL no canvas
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'; // Alinha o texto verticalmente ao centro
        
        // Simples quebra de linha (melhorias futuras podem ser feitas aqui)
        // Por enquanto, vamos centralizar
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);

        // 7. Mostra o canvas e o botão de compartilhar
        canvas.style.display = 'block';
        shareButton.style.display = 'inline-block';

    } catch (error) {
        console.error(error);
        alert(error.message);
    } finally {
        // Restaura o botão ao estado original
        generateButton.textContent = 'Gerar Imagem';
        generateButton.disabled = false;
    }
}

// Associa a função ao clique do botão
generateButton.addEventListener('click', generateImage);

// A lógica do shareButton será adicionada aqui no próximo passo
