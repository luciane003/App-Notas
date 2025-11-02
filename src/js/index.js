const btn = document.getElementById('botao');
const containerNotas = document.getElementById('containerNotas');
const nota = document.getElementById('anotacao');
const btnLimparTudo = document.getElementById('btnLimpar');

function criarNota(texto) {
    const notas = document.createElement('div');
    notas.classList.add('nota');
    notas.textContent = texto;

    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btn-excluir');
    btnExcluir.textContent = 'x';

    btnExcluir.addEventListener('click', () => {
        notas.remove()
        atualizarContainer()     
    });
    notas.appendChild(btnExcluir);

    return notas;
}

function atualizarContainer() {
    if (containerNotas.children.length === 0) {
        containerNotas.style.display = 'none';
    }else{
        containerNotas.style.display = 'flex';
    }
}

btn.addEventListener('click', () => {
    const texto = nota.value.trim();
    if (texto === '') return;

    const novaNota = criarNota(texto);
    containerNotas.appendChild(novaNota);

    nota.value = '';

    atualizarContainer();
});    

btnLimparTudo.addEventListener('click', () => {
    containerNotas.innerHTML = '';
    atualizarContainer()
})