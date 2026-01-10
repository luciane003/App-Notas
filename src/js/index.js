const btn = document.getElementById('botao');
const containerNotas = document.getElementById('containerNotas');
const nota = document.getElementById('anotacao');
const btnLimparTudo = document.getElementById('btnLimpar');

const API_URL = "https://app-notas-backend-35yl.onrender.com/anotacoes";

function criarNota(texto, id) {
    const notas = document.createElement('div');
    notas.classList.add('nota');
    notas.textContent = texto;

    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btn-excluir');
    btnExcluir.textContent = 'x';

    btnExcluir.addEventListener('click', async () => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            if (!res) throw new Error("Falha ao apagar!");

            notas.remove()
            atualizarContainer()
        } catch (error) {
            console.error(error);
            alert("Não foi possível excluir a anotação.");
        }
    });
    notas.appendChild(btnExcluir);

    return notas;
    
}

function atualizarContainer() {
    if (containerNotas.children.length === 0) {
        containerNotas.style.display = 'none';
    } else {
        containerNotas.style.display = 'flex';
    }
}

btn.addEventListener('click', async () => {
    const texto = nota.value.trim();
    if (texto === '') {
        alert("Você precisa escrever algo antes de adicionar.");
        return;
    }
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ texto })
        });

        if (!res.ok) throw new Error("Erro ao adicionar");

        const nova = await res.json();
        const notaDOM = criarNota (nova.texto, nova.id);
        containerNotas.appendChild(notaDOM);

        nota.value = "";
        atualizarContainer();
    } catch (error) {
        console.error(error);
        alert("Não foi possível salvar a anotação no servidor.");
    }
});

async function CarregarNotas() {
    try {
        const res = await fetch(API_URL);
        if(!res.ok) throw new   Error("Erro ao carregar");

        const lista = await res.json();

        lista.forEach(item => {
            const notaDOM = criarNota(item.texto, item.id);
            containerNotas.appendChild(notaDOM);
        });

        atualizarContainer();
    }catch (error) {
        console.error(error);
        alert("Falha ao conectar com o servidor. Está ligado?");
    }
}

btnLimparTudo.addEventListener('click', async () => {
    try {
       const res = await fetch(API_URL);
       const lista = await res.json();

       for (let item of lista) {
            await fetch(`${API_URL}/${item.id}`, { method: "DELETE"});
       }

       containerNotas.innerHTML = '';
       atualizarContainer()

       alert("Todas as anotações foram apagadas do servidor!");
    }catch{
        alert("Falha ao apagar tudo no servidor.")
    }
});

CarregarNotas()