async function buscarPeca(id) {

    try {

        const resposta = await fetch(
            `http://localhost:3000/pecas/${id}`
        );

        if (!resposta.ok) {

            document.getElementById(
                "resultado"
            ).innerHTML = `

            <div class="status">
                Erro
            </div>

            <h2 class="info-title">
                Peça não encontrada
            </h2>

            <p>
                Nenhum registro foi encontrado.
            </p>

            `;

            return;
        }

        const peca = await resposta.json();

        document.getElementById(
            "resultado"
        ).innerHTML = `

        <div class="status">
            Peça Localizada
        </div>

        <h2 class="info-title">
            ${peca.id}
        </h2>

        <div class="dado">
            <span class="label">
                Número de Identificação
            </span>

            <span class="valor">
                ${peca.id}
            </span>
        </div>

        <div class="dado">
            <span class="label">
                Produto
            </span>

            <span class="valor">
                ${peca.produto}
            </span>
        </div>

        <div class="dado">
            <span class="label">
                Lote
            </span>

            <span class="valor">
                ${peca.lote}
            </span>
        </div>

        <div class="dado">
            <span class="label">
                Material
            </span>

            <span class="valor">
                ${peca.material}
            </span>
        </div>

        <div class="dado">
            <span class="label">
                Peso
            </span>

            <span class="valor">
                ${peca.peso}
            </span>
        </div>

        <div class="dado">
            <span class="label">
                Data de Fabricação
            </span>

            <span class="valor">
                ${peca.dataFabricacao}
            </span>
        </div>

        <div class="dado">
            <span class="label">
                Responsável
            </span>

            <span class="valor">
                ${peca.responsavel}
            </span>
        </div>

        <div class="dado">
            <span class="label">
                Setor
            </span>

            <span class="valor">
                ${peca.setor}
            </span>
        </div>

        <div class="dado">
            <span class="label">
                Status
            </span>

            <span class="valor">
                ${peca.status}
            </span>
        </div>

        <div class="dado">
            <span class="label">
                Local Atual
            </span>

            <span class="valor">
                ${peca.local}
            </span>
        </div>

        <div class="dado">
            <span class="label">
                Última Atualização
            </span>

            <span class="valor">
                ${peca.horario}
            </span>
        </div>

        `;

    } catch (erro) {

        document.getElementById(
            "resultado"
        ).innerHTML = `

        <div class="status">
            Falha
        </div>

        <h2 class="info-title">
            Servidor Offline
        </h2>

        <p>
            Verifique se o servidor Node.js
            está rodando.
        </p>

        `;

        console.error(erro);
    }
}

function iniciarScanner() {

    const scanner = new Html5QrcodeScanner(

        "reader",

        {
            fps: 10,
            qrbox: 250
        }

    );

    scanner.render(

        async (textoLido) => {

            try {

                await fetch(

                    `http://localhost:3000/pecas/${textoLido}`,

                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            local: "Fundição"

                        })

                    }

                );

                buscarPeca(textoLido);

            } catch (erro) {

                console.error(erro);
            }

        },

        (erro) => {
            // ignora erros de leitura contínuos
        }

    );
}

document
    .getElementById("scanButton")
    .addEventListener(
        "click",
        iniciarScanner
    );