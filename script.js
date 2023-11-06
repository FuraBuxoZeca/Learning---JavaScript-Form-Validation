
function nameValidation()
{
    let name = document.getElementById("nome").value;
    if (!/^[a-zA-Z-'. ]+$/.test(name)) // essa expressão bizarra permite apenas caracteres entre a e z, maiúsculos e minúsculos, hífens, apóstrofos, espaços e pontos.
    {
        alert("O campo Nome só deve conter letras, hífens, apóstrofos, espaços e pontos.");
        return false;
    }
    return true;
}

function cpfValidation()
{
    let cpf = document.getElementById("cpf");
    let cpfArray = cpf.value.split(""); // transforma em um array separando cada caractere por vírgula
    cpfArray = cpfArray.filter((element) => (element >= 0 && element <= 9)); // filtra apenas os números, retirando pontuação
    cpfArray = cpfArray.join(""); // reagrupa os números antes separados pela vírgula

    if (cpfArray.length != 11)
    {
        alert("CPF inválido.");
        return false;
    }

    return true;
}

function addressValitadion()
{
    let address = document.getElementById("endereco").value;

    if (/^\d+$/.test(address)) {
        alert("O campo Endereço não pode conter apenas dígitos.");
        return false;
    }

    return true;
}

function formValidation()
{
    if (!nameValidation() || !cpfValidation() || !addressValitadion())
    {
        return false;
    }

    return true;
}

function CEPValidation()
{
    let cep = document.getElementById("cep");
    let address = document.getElementById("endereco");

    cep.addEventListener('focusout', async () => {
        let cepArray = cep.value.replace(/\D/g, ''); // Remove não dígitos (pontuação)
        
        if (cepArray.length !== 8) {
            alert("CEP inválido. Deve conter 8 dígitos.");
            return;
        }

        const response = await fetch(`https://viacep.com.br/ws/${cepArray}/json/`);
        if (!response.ok) {
            alert("Algum erro ocorreu ao buscar o CEP.");
            return;
        }
        else{

            const responseCEP = await response.json();
            console.log(responseCEP);
            address.value = responseCEP.localidade;
        }

    });

}