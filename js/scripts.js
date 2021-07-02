//http://www.mocky.io/v2/598b16291100004705515ec5 Api Clientes
//http://www.mocky.io/v2/598b16861100004905515ec7 Api Historico
//# 1 - Liste os clientes ordenados pelo maior valor total em compras.
//# 2 - Mostre o cliente com maior compra única no último ano (2016).
//# 3 - Liste os clientes mais fiéis.
//# 4 - Recomende um vinho para um determinado cliente a partir do histórico

let clientes = [];
let historicoCompras = [];

async function init (){ //Funcao de init dos scripts
    clientes = await getClientes();
    historicoCompras = await getHistoricos();
}
init();

//# 1 - Liste os clientes ordenados pelo maior valor total em compras.
function listarPorValorTotal(){  //Funcao que faz o controle dos valoresTotal
    let ListaValorTotal = [];
    inserirCabecalhoTabela("Nome dos Clientes","⇊ Valor total");
    clientes.forEach(cliente => {
        let valorTotal = calcularValorTotal(cliente.cpf); 
        ListaValorTotal.push({
            nome: cliente.nome,
            cpf: cliente.cpf,
            valor: valorTotal
        });
        
    });
    ListaValorTotal.sort(ordenarValor).forEach(element => {
        inserirNaTabela(`${element.nome}`,`R$ ${element.valor.toFixed(2)}`);
    });
}

function calcularValorTotal(cpf){ //Funcao que faz o calculo total dos historicos pelo CPF
    let valorTotal = 0;
    historicoCompras.forEach(historico => {
        if (cpf === historico.cliente){
            valorTotal = valorTotal + historico.valorTotal;
        }
    });
    return valorTotal;
}

//# 2 - Mostre o cliente com maior compra única no último ano (2016).
function listarUnicaCompra(){ //Funcao que faz o controle do valorTotal de compra unica pelo ano de 2016
    let comprasDoAno = [];
    inserirCabecalhoTabela("Nome do Cliente","⇊ Valor total");
    historicoCompras.forEach(historico => {
        let ano = historico.data.slice(6,10);
        clientes.forEach(cliente => {
            if(cliente.cpf == historico.cliente && ano == 2016){
                comprasDoAno.push({
                    nome: cliente.nome,
                    anoCompra: ano,
                    valor: historico.valorTotal
                });
            }
        });
    });
    comprasDoAno.sort(ordenarValor);
    inserirNaTabela(`${comprasDoAno[0].nome}`,`R$ ${comprasDoAno[0].valor.toFixed(2)}`);
}
//# 3 - Liste os clientes mais fiéis.
function listarClientesFieis() { //Funcao que faz o controle dos clientes pela quantidade de compras realizadas
    let listaClientesFieis = [];
    inserirCabecalhoTabela("Nome dos Clientes","⇊ Compras total");
    clientes.forEach(cliente => {
        let fiel = 0;
        historicoCompras.forEach(historico => {
            if(cliente.cpf == historico.cliente) {
                fiel = fiel + 1;             
            }
        });
        listaClientesFieis.push({
            nome: cliente.nome,
            valor: fiel
        })

    });
    listaClientesFieis.sort(ordenarValor);
    listaClientesFieis.forEach(clienteFiel => {
        inserirNaTabela(`${clienteFiel.nome}`,`${clienteFiel.valor} Compras realizadas`);
    });
    

}
//# 4 - Recomende um vinho para um determinado cliente a partir do histórico
function listarRecomendacao(){ //Funcao que faz o controle das recomendacoes dos vinhos para cliente
    inserirCabecalhoTabela("Nome dos Clientes","Acoes");
    clientes.forEach(cliente => {
        inserirNaTabela(`${cliente.nome}`,`<button type="button" class="btn btn-primary" onclick=encontrarVinhos("${cliente.cpf}")>Recomendar Vinho!</button>`);
    });
    
}

function encontrarVinhos(id){ //Funcao que encontra os vinhos por cliente
    let vinhos = [];
    historicoCompras.forEach(historico => {
        if(historico.cliente == id){
            historico.itens.forEach(item => {
                vinhos.push({
                    nome: item.produto,
                    variedade: item.variedade,
                    pais : item.pais,
                    categoria: item.categoria,
                    safra: item.safra,
                    preco: item.preco
                });
            });
        }
    });
    console.log(vinhos)
    recomendarVinho(vinhos);
}

function recomendarVinho(vinhos){ //Funcao que controla o vinho que sera recomendado
    let vinhosRecomendados= [];
    let arrayVerificado = [];
    inserirCabecalhoTabela("⇊ Vinho(s) Recomendado(s) ","Preco");

    for(let i = 0; i < vinhos.length; i++){   
        let contador = 0;  
        let repetiu = false;
        
        for(let z = 0; z < arrayVerificado.length; z++){ //Area para encontrar quantas vezes repetiu o vinho
            if(arrayVerificado[z]  == vinhos[i]){
            repetiu = true
            }
        }  
        if(repetiu == false){ 
            arrayVerificado.push(vinhos[i])
            for(let j = 0; j < vinhos.length; j++){
                if(vinhos[i].nome == vinhos[j].nome && vinhos[i].variedade == vinhos[j].variedade){
                contador++
                }
            }   
        }
        vinhosRecomendados.push({ //Gera a nova lista com numero de vezes que repete o numero
            nome:vinhos[i].nome,
            variedade:vinhos[i].variedade,
            preco:vinhos[i].preco,
            valor:contador
        });
        
    }
    
    vinhosRecomendados = vinhosRecomendados.filter(function (a) { //Remove os vinhos repetidos da funcao anterior
            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))
   
    vinhosRecomendados.sort(ordenarValor); //Ordena os vinhos do mais recomendado para o menor
    vinhosRecomendados.forEach(vinhoRecomendado => {
        if(vinhoRecomendado.valor >= 2){
            inserirNaTabela(`<b>Nome: </b>${vinhoRecomendado.nome}<b> Variedade: </b> ${vinhoRecomendado.variedade}`,`R$ ${vinhoRecomendado.preco.toFixed(2)}`) 
        }
        
    });
}