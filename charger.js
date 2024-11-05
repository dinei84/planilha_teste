// Inicializar o Firestore
const db = firebase.firestore();
const carregamentosCollection = db.collection("carregamentos");

// Função para salvar um novo carregamento
document.getElementById("salvarCarregamentoBtn").addEventListener("click", async () => {
    const dataOC = document.getElementById("data_oc").value;
    const placa = document.getElementById("placa").value;
    const motorista = document.getElementById("motorista").value;
    const tipoVeiculo = document.getElementById("tipo_veiculo").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const freteMotorista = parseFloat(document.getElementById("frete_motorista").value);
    const emissor = document.getElementById("emissor").value;
    const dataManifesto = document.getElementById("data_manifesto").value;
    const cte = document.getElementById("cte").value;
    const dataEntrega = document.getElementById("data_entrega").value;
    const nfe = document.getElementById("nfe").value;
    const observacao = document.getElementById("observacao").value;

    try {
        // Adicionar o carregamento ao Firestore
        const novoCarregamento = {
            dataOC,
            placa,
            motorista,
            tipoVeiculo,
            peso,
            freteMotorista,
            emissor,
            dataManifesto,
            cte,
            dataEntrega,
            nfe,
            observacao,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        await carregamentosCollection.add(novoCarregamento);

        // Atualizar o saldo no banco de dados (presumindo que você tenha um documento para saldo)
        const saldoDocRef = db.collection("fretes").doc("saldoFrete");
        await saldoDocRef.update({
            saldo: firebase.firestore.FieldValue.increment(-peso)
        });

        alert("Carregamento salvo com sucesso e saldo atualizado!");

        // Limpar o formulário
        document.getElementById("carregamentoForm").reset();
    } catch (error) {
        console.error("Erro ao salvar o carregamento:", error);
        alert("Erro ao salvar o carregamento.");
    }
});

// Função para consultar carregamentos
async function consultarCarregamentos() {
    const snapshot = await carregamentosCollection.get();
    snapshot.forEach(doc => {
        console.log("Carregamento:", doc.data());
        // Aqui você pode renderizar os dados em uma tabela se desejar
    });
}

// Função para editar um carregamento específico
async function editarCarregamento(id, novosDados) {
    try {
        await carregamentosCollection.doc(id).update(novosDados);
        alert("Carregamento atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao editar o carregamento:", error);
        alert("Erro ao editar o carregamento.");
    }
}

// Função para deletar um carregamento específico
async function deletarCarregamento(id) {
    try {
        const doc = await carregamentosCollection.doc(id).get();
        const dadosCarregamento = doc.data();

        // Reverter o saldo do peso
        const saldoDocRef = db.collection("fretes").doc("saldoFrete");
        await saldoDocRef.update({
            saldo: firebase.firestore.FieldValue.increment(dadosCarregamento.peso)
        });

        // Excluir o carregamento
        await carregamentosCollection.doc(id).delete();

        alert("Carregamento excluído com sucesso e saldo revertido!");
    } catch (error) {
        console.error("Erro ao deletar o carregamento:", error);
        alert("Erro ao deletar o carregamento.");
    }
}
