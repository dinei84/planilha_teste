// Inicializar a coleção do Firestore
const db = firebase.firestore();
const fretesCollection = db.collection("fretes");

// Carrega os dados ao carregar a página
window.onload = function () {
    loadFreteDataForEditing();

    const submitButton = document.getElementById("submitBtn");
    if (submitButton) {
        submitButton.addEventListener("click", async () => {
            const cliente = document.getElementById("cliente").value;
            const expedidor = document.getElementById("expedidor").value;
            const destinatario = document.getElementById("destinatario").value;
            const recebedor = document.getElementById("recebedor").value;
            const cidade_origem = document.getElementById("cidade_origem").value;
            const cidade_destino = document.getElementById("cidade_destino").value;
            const produto = document.getElementById("produto").value;
            const qtd_liberada = parseInt(document.getElementById("qtd_liberada").value);
            const marcado = parseInt(document.getElementById("marcado").value);
            const saldo = parseInt(document.getElementById("saldo").value);
            const especie = document.getElementById("especie").value;
            const frete_empresa = parseFloat(document.getElementById("frete_empresa").value);
            const frete_motorista = parseFloat(document.getElementById("frete_motorista").value);
            const pedido = document.getElementById("pedido").value;
            const operacao = parseInt(document.getElementById("operacao").value);
            const lote = document.getElementById("lote").value;
            const observacao1 = document.getElementById("observacao1").value;
            const observacao2 = document.getElementById("observacao2").value;

            // Recupera o ID do documento armazenado para edição
            const docId = sessionStorage.getItem("editDocId");

            try {
                if (docId) {
                    // Atualiza o documento existente
                    await fretesCollection.doc(docId).update({
                        cliente,
                        expedidor,
                        destinatario,
                        recebedor,
                        cidade_origem,
                        cidade_destino,
                        produto,
                        qtd_liberada,
                        marcado,
                        saldo,
                        especie,
                        frete_empresa,
                        frete_motorista,
                        pedido,
                        operacao,
                        lote,
                        observacao1,
                        observacao2
                    });
                    alert("Dados atualizados com sucesso!");
                    console.log("Salvando com o ID do documento:", docId);

                    sessionStorage.removeItem("editDocId");
                } else {
                    // Adiciona um novo documento
                    await fretesCollection.add({
                        cliente,
                        expedidor,
                        destinatario,
                        recebedor,
                        cidade_origem,
                        cidade_destino,
                        produto,
                        qtd_liberada,
                        marcado,
                        saldo,
                        especie,
                        frete_empresa,
                        frete_motorista,
                        pedido,
                        operacao,
                        lote,
                        observacao1,
                        observacao2,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    console.log("Novo documento adicionado");
                    alert("Dados adicionados com sucesso!");
                }

                // Reseta o formulário e redireciona
                const form = document.getElementById("planilhaForm");
                if (form) {
                    form.reset();
                }
                window.location.href = "mostrador.html";
            } catch (error) {
                console.error("Erro ao salvar os dados:", error);
                alert("Erro ao salvar os dados. Verifique o console para mais detalhes.");
            }
        });
    } else {
        console.error("Botão com ID 'submitBtn' não encontrado.");
    }
};

// Função para carregar os dados do frete para edição
async function loadFreteDataForEditing() {
    const docId = sessionStorage.getItem("editDocId");

    if (docId) {
        try {
            const doc = await fretesCollection.doc(docId).get();
            if (doc.exists) {
                const data = doc.data();
                document.getElementById("cliente").value = data.cliente || "";
                document.getElementById("expedidor").value = data.expedidor || "";
                document.getElementById("destinatario").value = data.destinatario || "";
                document.getElementById("recebedor").value = data.recebedor || "";
                document.getElementById("cidade_origem").value = data.cidade_origem || "";
                document.getElementById("cidade_destino").value = data.cidade_destino || "";
                document.getElementById("produto").value = data.produto || "";
                document.getElementById("qtd_liberada").value = data.qtd_liberada || 0;
                document.getElementById("marcado").value = data.marcado || 0;
                document.getElementById("saldo").value = data.saldo || 0;
                document.getElementById("especie").value = data.especie || "";
                document.getElementById("frete_empresa").value = data.frete_empresa || 0;
                document.getElementById("frete_motorista").value = data.frete_motorista || 0;
                document.getElementById("pedido").value = data.pedido || "";
                document.getElementById("operacao").value = data.operacao || 0;
                document.getElementById("lote").value = data.lote || "";
                document.getElementById("observacao1").value = data.observacao1 || "";
                document.getElementById("observacao2").value = data.observacao2 || "";
            } else {
                console.log("Documento não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar dados para edição:", error);
        }
    } else {
        console.log("Nenhum ID encontrado na sessionStorage para edição.");
    }
}

// Função de exclusão (não utilizada diretamente neste código, mas deixei corrigida para referência)
async function deleteFrete(docId) {
    try {
        await fretesCollection.doc(docId).delete();
        console.log("Frete excluído com sucesso:", docId);
        alert("Frete excluído com sucesso!");
    } catch (error) {
        console.error("Erro ao excluir o frete:", error);
        alert("Erro ao excluir o frete.");
    }
}
