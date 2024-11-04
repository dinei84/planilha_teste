let editIndex = null;

const db = firebase.firestore();
const carregamentosCollection = db.collection("carregados");

// Evento para o botão de submissão do formulário
document.getElementById("submitBtn").addEventListener("click", async () => {
    const data_oc = document.getElementById('data_oc').value;
    const placa = document.getElementById('placa').value;
    const tipo_veiculo = document.getElementById('tipo_veiculo').value;
    const peso = document.getElementById('peso').value;
    const frete_motorista = document.getElementById('frete_motorista').value;
    const emissor = document.getElementById('emissor').value;

    // Campos opcionais
    const data_manifesto = document.getElementById('data_manifesto').value || null;
    const cte = document.getElementById('cte').value || null;
    const data_entrega = document.getElementById('data_entrega').value || null;
    const nfe = document.getElementById('nfe').value || null;
    const observacao = document.getElementById('observacao').value || null;

    // Verifique apenas os campos obrigatórios
    if (data_oc && placa && tipo_veiculo && peso && frete_motorista && emissor) {
        try {
            // Adiciona ou edita o registro com base no valor de editIndex
            await carregamentosCollection.add({
                data_oc,
                placa,
                tipo_veiculo,
                peso,
                frete_motorista,
                emissor,
                data_manifesto,
                cte,
                data_entrega,
                nfe,
                observacao,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            alert('Dados adicionados com sucesso!');
            document.getElementById('carregamentosForm').reset();
            editIndex = null; // Reinicie o editIndex após adicionar
        } catch (error) {
            console.error('Erro ao adicionar dados: ', error);
            alert("Erro ao adicionar dados. Verifique o console para mais detalhes.");
        }
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
});

// Evento para o botão de limpar formulário
document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('carregamentosForm').reset();
    editIndex = null; // Limpa o índice de edição ao resetar
});
