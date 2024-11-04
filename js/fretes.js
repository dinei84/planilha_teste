// fretes.js
import { fretes } from './firebaseConfig.js'; // Importa a variável fretes

document.addEventListener('DOMContentLoaded', () => {
    const criarFreteButton = document.getElementById('criarFrete');
    
    if (criarFreteButton) { // Verifica se o botão existe
        criarFreteButton.addEventListener('click', () => {
            const pesoTotal = Number(document.getElementById('pesoTotal').value);

            async function criarFrete(pesoTotal) {
                try {
                    const novoFrete = {
                        pesoTotal: pesoTotal,
                        pesoRestante: pesoTotal,
                        cargas: []
                    };
                    const docRef = await fretes.collection("fretes").add(novoFrete);
                    console.log("Frete criado com sucesso com ID:", docRef.id);
                    alert("Frete criado com sucesso!");
                } catch (error) {
                    console.error("Erro ao criar o frete:", error);
                }
            }

            criarFrete(pesoTotal);
        });
    } else {
        console.error("Botão 'Criar Frete' não encontrado.");
    }
});