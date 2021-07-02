const apiClienteUrl = "http://www.mocky.io/v2/598b16291100004705515ec5";
const apiHistUrl = "http://www.mocky.io/v2/598b16861100004905515ec7";

async function getApi(url){ //Funcao para receber o json das apis
    const response = await fetch(url);
    let json = await response.json();
    return json;
}

async function getClientes(){ //Funcao que faz as correcoes dos dados dos clientes
    let clientes = await getApi(apiClienteUrl);
    clientes.forEach((cliente, index) => {
        clientes[index].cpf = removerMascara(cliente.cpf);
    });
    return clientes;
}

async function getHistoricos(){ //Funcao que faz as correcoes dos dados do historico
    let historicos = await getApi(apiHistUrl);
    historicos.forEach((historico, index) => {
        let cpfCorrigido = historicos[index].cliente;
        if(historico.cliente.length == 15){
           cpfCorrigido = historico.cliente.slice(1,15);
        }
        
        historicos[index].cliente = removerMascara(cpfCorrigido);
    });
    return historicos;
}
