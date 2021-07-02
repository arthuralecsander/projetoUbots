function removerMascara(cpf){ //Funcao que remove a mascara do CPF
    return cpf.replace(/\.|\-/g,"");
}

function ordenarValor(a,b){ //Funcao de ordenacao dos valores
    return a.valor < b.valor ? 1 : a.valor > b.valor ? -1 : 0; 
}

function inserirCabecalhoTabela(cabecalho1,cabecalho2){ //Funcao que adiciona a parte do cabecalho da tabela
    let myobj = document.querySelector('#rightSide')
    removeTabela();
    text =  `<table class="table" id="righContent">
                <thead>
                <th>${cabecalho1}</th> 
                <th>${cabecalho2}</th>
                </thead>
                <tbody id="tbPessoa">
                </tbody>
            </table>`
    myobj.innerHTML += text;
}

function inserirNaTabela(tb1,tb2){ //Funcao para adicionar os dados na tabela
    tbobj = document.querySelector('#tbPessoa')
        text = `<div id="righContent">
                    <td>
                        ${tb1}
                    </td>
                    <td>
                        ${tb2}
                    </td>    
                </div>`
        tbobj.innerHTML += text;
}

async function removeTabela(){ //Funcao para remover a tabela antiga
    let removObj = document.querySelector('#righContent')
    if(removObj!=null){
        removObj.remove();   
    }
}