const db = firebase.firestore();
const carregados = "carregados"; // Substitua pelo ID correto

async function carregarCabecalho() {
    console.log("Carregando cabeçalho com docId:", headerDocId);

    if (headerDocId) {
        try {
            const doc = await db.collection("fretes").doc(headerDocId).get();
            if (doc.exists) {
                const data = doc.data();
                console.log("Dados do cabeçalho:", data);
                document.getElementById("cliente").innerText = data.cliente || "";
                document.getElementById("cidade_origem").innerText = data.cidade_origem || "";
                document.getElementById("expedidor").innerText = data.expedidor || "";
                document.getElementById("cidade_destino").innerText = data.cidade_destino || "";
                document.getElementById("produto").innerText = data.produto || "";
                document.getElementById("especie").innerText = data.especie || "";
                document.getElementById("qtd_liberada").innerText = data.qtd_liberada || 0;
                document.getElementById("saldo").innerText = data.saldo || 0;
            } else {
                console.log("Documento não encontrado para o docId:", headerDocId);
            }
        } catch (error) {
            console.error("Erro ao carregar cabeçalho:", error);
        }
    } else {
        console.log("Nenhum docId foi encontrado.");
    }
}


async function carregarCarregamentos() {
    try {
        const carregamentosSnapshot = await db.collection("carregados").orderBy("createdAt", "desc").get();
        const tableBody = document.querySelector("#carregamentosTable tbody");
        tableBody.innerHTML = ""; // Limpa a tabela antes de carregar

        carregamentosSnapshot.forEach(doc => {
            const data = doc.data();
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${data.data_oc || ""}</td>
                <td>${data.placa || ""}</td>
                <td>${data.motorista || ""}</td>
                <td>${data.tipo_veiculo || ""}</td>
                <td>${data.peso || ""}</td>
                <td>${data.frete_motorista || ""}</td>
                <td>${data.emissor || ""}</td>
                <td>${data.data_manifesto || ""}</td>
                <td>${data.cte || ""}</td>
                <td>${data.data_entrega || ""}</td>
                <td>${data.nfe || ""}</td>
                <td>${data.observacao || ""}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar carregamentos:", error);
    }
}

// Carrega os dados ao carregar a página
window.onload = () => {
    carregarCabecalho();
    carregarCarregamentos();
};
