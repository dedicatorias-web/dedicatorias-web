// Encontra os elementos do nosso generator.html
const messageTextarea = document.getElementById('message');
const generateButton = document.getElementById('generate-button');
const shareButton = document.getElementById('share-button');
const canvas = document.getElementById('generated-image-canvas');
const ctx = canvas.getContext('2d');

const backgroundImageSrc = 'imagens/fundo-flores.jpg';

// Função auxiliar para carregar uma imagem
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Falha ao carregar a imagem: ${src}`));
        img.src = src;
    });
}

// Função para quebra de linha automática
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

// Função principal que desenha no canvas
async function generateImage() {
    generateButton.textContent = 'Gerando...';
    generateButton.disabled = true;
    try {
        const backgroundImage = await loadImage(backgroundImageSrc);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const message = messageTextarea.value;
        const today = new Date();
        const dateText = today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

        ctx.fillStyle = '#f0f0f0';
        ctx.font = '16px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(dateText, canvas.width - 20, 30);

        ctx.fillStyle = 'white';
        ctx.font = '700 50px "Dancing Script"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        wrapText(ctx, message, canvas.width / 2, canvas.height / 2, canvas.width - 60, 55);

        canvas.style.display = 'block';
        shareButton.style.display = 'inline-block';
    } catch (error) {
        console.error(error);
        alert(error.message);
    } finally {
        generateButton.textContent = 'Gerar Imagem';
        generateButton.disabled = false;
    }
}

// --- LÓGICA DO BOTÃO COMPARTILHAR (AGORA FUNCIONAL) ---
async function shareGeneratedImage() {
    shareButton.textContent = 'Aguarde...';
    shareButton.disabled = true;

    // Converte o conteúdo do canvas para um "Blob" (um objeto tipo arquivo)
    canvas.toBlob(async (blob) => {
        // Cria um arquivo virtual a partir do Blob
        const file = new File([blob], 'dedicatoria.png', { type: 'image/png' });
        const filesArray = [file];

        // Verifica se o navegador suporta o compartilhamento de arquivos
        if (navigator.share && navigator.canShare({ files: filesArray })) {
            try {
                // Tenta compartilhar o arquivo gerado
                await navigator.share({
                    title: 'Uma dedicatória para você!',
                    text: 'Veja que imagem linda eu criei.',
                    files: filesArray,
                });
                console.log('Imagem compartilhada com sucesso!');
            } catch (error) {
                console.error('Erro ao compartilhar:', error);
            }
        } else {
            alert('Seu navegador não suporta o compartilhamento direto de arquivos. Tente em um celular!');
        }

        // Restaura o botão
        shareButton.textContent = 'Compartilhar';
        shareButton.disabled = false;

    }, 'image/png'); // Especifica o formato da imagem como PNG
}


// Adiciona os "ouvintes de clique" aos botões
generateButton.addEventListener('click', generateImage);
shareButton.addEventListener('click', shareGeneratedImage);
