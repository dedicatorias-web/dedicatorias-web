// Encontra os elementos na página
const uploadInput = document.getElementById('upload-image');
const imagePreview = document.getElementById('image-preview');
const shareButton = document.getElementById('share-button');

let currentFile = null;

// Esta função é chamada quando o usuário seleciona um arquivo
uploadInput.addEventListener('change', (event) => {
    // Pega o primeiro arquivo selecionado
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        currentFile = file; // Guarda o arquivo para usar no compartilhamento

        // Mostra uma pré-visualização da imagem na página
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block'; // Mostra o elemento da imagem
        };
        reader.readAsDataURL(file);

        shareButton.disabled = false; // Ativa o botão de compartilhar
    } else {
        // Se nenhum arquivo for selecionado ou não for uma imagem
        currentFile = null;
        imagePreview.style.display = 'none';
        shareButton.disabled = true;
    }
});

// Esta função é chamada quando o usuário clica em "Compartilhar"
shareButton.addEventListener('click', async () => {
    if (!currentFile) {
        alert("Por favor, selecione uma imagem primeiro.");
        return;
    }

    // Verifica se o navegador suporta o compartilhamento de arquivos
    if (navigator.share && navigator.canShare({ files: [currentFile] })) {
        try {
            // Tenta compartilhar o ARQUIVO da imagem
            await navigator.share({
                title: 'Olha essa imagem!',
                text: 'Enviada através do Dedicatória Web',
                files: [currentFile],
            });
            console.log('Arquivo compartilhado com sucesso!');
        } catch (error) {
            console.error('Erro ao compartilhar:', error);
        }
    } else {
        // Plano B: se o navegador não suportar o compartilhamento de arquivos
        alert("Seu navegador não suporta o compartilhamento direto de arquivos. Tente em um celular.");
        console.log("Web Share API para arquivos não suportada.");
    }
});
