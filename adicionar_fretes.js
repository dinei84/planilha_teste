const fretes = firebase.firestore();
const fretesCollection = fretes.collection("fretes");

document.getElementById("submitBtn").addEventListener("click", async () => {
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

    const docId = sessionStorage.getItem("editDocId");

    try {
        if (docId) {
            await fretes.collection("fretes").doc(docId).update({
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
            sessionStorage.removeItem("editDocId");
        } else {
            await fretes.collection("fretes").add({
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
            alert("Dados adicionados com sucesso!");
        }
        document.getElementById("planilhaForm").reset();
        window.location.href = "mostrador.html";
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        alert("Erro ao salvar os dados. Verifique o console para mais detalhes.");
    }
});

async function loadFreteDataForEditing() {
    const docId = sessionStorage.getItem("editDocId");

    if (docId) {
        try {
            const doc = await fretes.collection("fretes").doc(docId).get();
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
    }
}

async function LoadingFreteForDelete(){
    await fretes.collection('fretes').doc(id).delete()
    fretes = fretes.filter(driver => fretes.id !== id)
    sortAndRenderTable()


    
}


window.onload = loadFreteDataForEditing;
