import formataCpf from "./valida-cpf.js";
import maiorDeIdade from "./validaIdade.js";

const camposFormulario = document.querySelectorAll('[required]');
const botao = document.getElementById('enviar');
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener(addEventListener('submit', (e) => {
    e.preventDefault();

    const listaResposta = {
        "nome": e.target.elements["nome"].value,
        "e-mail": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }

    localStorage.setItem('cadastro', JSON.stringify(listaResposta));

    window.location.href = './abrir-conta-form-2.html';
}));

camposFormulario.forEach((campo) => {
    // campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener('invalid', evento => evento.preventDefault());
    botao.addEventListener('click', () => verificaCampo(campo));
});

const tiposDeErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        patternMismatch: "Por favor, preencha um email válido.",
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo){
    let mensagem = "";

    if(campo.name == "cpf" && campo.value.length >= 11){
        formataCpf(campo);
    }

    if(campo.name == "aniversario" && campo.value.length != ""){
        maiorDeIdade(campo);
    }

    tiposDeErros.forEach(erro => {
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro]
        }
    });

    const msgErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorInput = campo.checkValidity();

    if(!validadorInput){
        msgErro.textContent = mensagem;
    } else {
        msgErro.textContent = "";
    }
}