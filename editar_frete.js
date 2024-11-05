// Conectar ao Firestore
const db = firebase.firestore();

// Função para carregar dados do frete ao carregar a página
window.onload = async function () {
    const docId = sessionStorage.getItem("editDocId");
    
    if (!docId) {
        alert("ID do frete não encontrado. 1");
        return;
    }

    try {
        // Referência ao documento no Firestore com o ID do frete
        const docRef = db.collection("fretes").doc(docId);
        const doc = await docRef.get();

        // Verifica se o documento existe e carrega os dados
        if (doc.exists) {
            const frete = doc.data();

            // Preencher o formulário com os dados do frete
            document.getElementById("cliente").value = frete.cliente || "";
            document.getElementById("expedidor").value = frete.expedidor || "";
            document.getElementById("destinatario").value = frete.destinatario || "";
            document.getElementById("recebedor").value = frete.recebedor || "";
            document.getElementById("cidade_origem").value = frete.cidade_origem || "";
            document.getElementById("cidade_destino").value = frete.cidade_destino || "";
            document.getElementById("produto").value = frete.produto || "";
            document.getElementById("qtd_liberada").value = frete.qtd_liberada || "";
            document.getElementById("marcado").value = frete.marcado || "";
            document.getElementById("saldo").value = frete.saldo || "";
            document.getElementById("especie").value = frete.especie || "";
            document.getElementById("frete_empresa").value = frete.frete_empresa || "";
            document.getElementById("frete_motorista").value = frete.frete_motorista || "";
            document.getElementById("pedido").value = frete.pedido || "";
            document.getElementById("operacao").value = frete.operacao || "";
            document.getElementById("lote").value = frete.lote || "";
            document.getElementById("observacao1").value = frete.observacao1 || "";
            document.getElementById("observacao2").value = frete.observacao2 || "";
        } else {
            alert("Frete não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao carregar o frete:", error);
        alert("Erro ao carregar os dados do frete.");
    }
};

// Função para salvar as alterações feitas no frete
async function salvarFrete() {
    const docId = sessionStorage.getItem("editDocId");
    if (!docId) {
        alert("ID do frete não encontrado. 2");
        return;
    }

    // Coletar dados do formulário
    const freteAtualizado = {
        cliente: document.getElementById("cliente").value,
        expedidor: document.getElementById("expedidor").value,
        destinatario: document.getElementById("destinatario").value,
        recebedor: document.getElementById("recebedor").value,
        cidade_origem: document.getElementById("cidade_origem").value,
        cidade_destino: document.getElementById("cidade_destino").value,
        produto: document.getElementById("produto").value,
        qtd_liberada: document.getElementById("qtd_liberada").value,
        marcado: document.getElementById("marcado").value,
        saldo: document.getElementById("saldo").value,
        especie: document.getElementById("especie").value,
        frete_empresa: document.getElementById("frete_empresa").value,
        frete_motorista: document.getElementById("frete_motorista").value,
        pedido: document.getElementById("pedido").value,
        operacao: document.getElementById("operacao").value,
        lote: document.getElementById("lote").value,
        observacao1: document.getElementById("observacao1").value,
        observacao2: document.getElementById("observacao2").value,
    };

    try {
        // Atualiza os dados no Firestore
        await db.collection("fretes").doc(docId).update(freteAtualizado);
        alert("Frete atualizado com sucesso!");
        window.location.href = "mostrador.html";
    } catch (error) {
        console.error("Erro ao salvar o frete:", error);
        alert("Erro ao salvar as alterações.");
    }
}
