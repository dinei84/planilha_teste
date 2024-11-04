// main.js

// Função para manipular o formulário de criação de frete
function handleCriarFrete() {
    const pesoTotal = parseInt(document.getElementById("pesoTotal").value);
    if (isNaN(pesoTotal) || pesoTotal <= 0) {
        alert("Por favor, insira um peso total válido.");
        return;
    }
    criarFrete(pesoTotal);
}

// Função para manipular o formulário de adição de carga
function handleAdicionarCarga() {
    const idFrete = document.getElementById("idFrete").value;
    const pesoCarga = parseInt(document.getElementById("pesoCarga").value);
    if (!idFrete || isNaN(pesoCarga) || pesoCarga <= 0) {
        alert("Por favor, insira um ID de frete válido e um peso de carga positivo.");
        return;
    }
    adicionarCarga(idFrete, pesoCarga);
}
