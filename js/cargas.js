// cargas.js

// Função para adicionar uma nova carga a um frete existente
async function adicionarCarga(idFrete, pesoCarga) {
    const freteRef = db.collection("fretes").doc(idFrete);
    const freteDoc = await freteRef.get();

    if (!freteDoc.exists) {
        console.log("Frete não encontrado");
        return;
    }

    const freteData = freteDoc.data();
    if (freteData.pesoRestante < pesoCarga) {
        console.log("Peso da carga excede o peso restante do frete");
        alert("Peso da carga excede o peso restante do frete");
        return;
    }

    const novaCarga = {
        id: `carga${Date.now()}`,
        peso: pesoCarga,
        data: new Date().toISOString()
    };

    await freteRef.update({
        cargas: [...freteData.cargas, novaCarga],
        pesoRestante: freteData.pesoRestante - pesoCarga
    });
    console.log("Carga adicionada com sucesso!");
    alert("Carga adicionada com sucesso!");
}
