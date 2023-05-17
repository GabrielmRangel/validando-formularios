export default function maiorDeIdade(campo){
    const dataNascimento = new Date(campo.value);

    if(!validaIdade(dataNascimento)){
        campo.setCustomValidity("O usuário não é maior de idade.");
    } else {
        campo.setCustomValidity("");
    }
}

function validaIdade(data){
    const dataAtual = new Date();
    const mais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= mais18;
}