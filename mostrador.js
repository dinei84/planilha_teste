async function fetchFretes() {
    try {
        const fretesCollection = db.collection("fretes");
        const fretesSnapshot = await fretesCollection.orderBy("createdAt", "desc").get();
        const fretesTableBody = document.querySelector("#fretesTable tbody");
        fretesTableBody.innerHTML = "";

        fretesSnapshot.forEach(doc => {
            const frete = doc.data();
            const row = document.createElement("tr");
            row.setAttribute("data-id", doc.id);

            row.innerHTML = `
                <td>${frete.cliente || ""}</td>
                <td>${frete.expedidor || ""}</td>
                <td>${frete.destinatario || ""}</td>
                <td>${frete.recebedor || ""}</td>
                <td>${frete.cidade_origem || ""}</td>
                <td>${frete.cidade_destino || ""}</td>
                <td>${frete.produto || ""}</td>
                <td>${frete.qtd_liberada || ""}</td>
                <td>${frete.marcado || ""}</td>
                <td>${frete.saldo || ""}</td>
                <td>${frete.especie || ""}</td>
                <td>${frete.frete_empresa || ""}</td>
                <td>${frete.frete_motorista || ""}</td>
                <td>${frete.pedido || ""}</td>
                <td>${frete.operacao || ""}</td>
                <td>${frete.lote || ""}</td>
                <td>${frete.observacao1 || ""}</td>
                <td>${frete.observacao2 || ""}</td>
                <td>
                    <button onclick="editRow(this)">Editar</button>
                </td>
                <td>
                    <button onclick="deleteRow(this)">Excluir</button>
                </td>
            `;

            fretesTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao conectar com Firestore:", error);
        alert("Erro ao carregar os dados.");
    }
}

function editRow(button) {
    const row = button.parentNode.parentNode;
    const docId = row.getAttribute("data-id");

    sessionStorage.setItem("editDocId", docId);
    window.location.href = "adicionar_frete.html";
}

async function deleteRow(button) {
    const confirmation = confirm("Você tem certeza que deseja excluir este frete?");
    
    if (!confirmation) {
        return;
    }

    try {
        const row = button.parentNode.parentNode;
        const id = row.getAttribute("data-id");

        await db.collection("fretes").doc(id).delete();

        row.remove();
        alert("Frete excluído com sucesso!");
    } catch (error) {
        console.error("Erro ao excluir o frete:", error);
        alert("Erro ao excluir o frete.");
    }
}

function reloadFretes() {
    fetchFretes();
}

window.onload = fetchFretes;
