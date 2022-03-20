'use strict';

const display = document.getElementById('display');

// declaração relacionada ao ID dos números (HTML)
const numeros = document.querySelectorAll('[id*=tecla]');

// declaração relacionado ao ID dos operadores (HTML)
const operadores = document.querySelectorAll('[id*=operador]');

//variáveis
let novoNumero = true;
let operador;
let numeroAnterior;

// verifica se tem operação pendente para iniciar outra
const operacaoPendente = () => operador != undefined;

// funções de calcular da calculadora
const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        if (operador == "+") {
            atualizarDisplay (numeroAnterior + numeroAtual)
        }else if (operador == "-") {
            atualizarDisplay (numeroAnterior - numeroAtual)
        }else if (operador == "*") {
            atualizarDisplay (numeroAnterior * numeroAtual)
        }else if (operador == "/") {
            atualizarDisplay (numeroAnterior / numeroAtual)
        }

    }
}
// Concatenação do display
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }else if (display.textContent == 0){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }
     else if (display.textContent != 0){
        display.textContent += texto.toLocaleString('BR');
    }                                       
}
// Atualiazação do display após evento de inserir número
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)

// Cria evento para cada um dos números
numeros.forEach(numero => numero.addEventListener('click',inserirNumero));



// Seleção do operador para realizar o cálculo, armazenmento do operador clicado, calcular
const selecionarOperador = (evento) => {
    if(!novoNumero){
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    console.log (operador);
    }
}
// Cria evento para cada um dos operadores
operadores.forEach(operador => operador.addEventListener('click',selecionarOperador));

// tecla igual, criação de acionarIgual para quando clicar no operador não continuar conta pendente
const acionarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', acionarIgual);

// botão para apagar o display, somente o que está na tela
const limparDisplay = () => display.textContent = '';

document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

// botão para limpar cálculo, memória da calculadora
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    numeroAnterior = undefined;
    novoNumero = true;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

// botão backspace, usando slice pois texto retorna uma string (array de caracter)
const apagarUltimo = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', apagarUltimo);

//botão de inversão positivo e negativo, atenção para novoNumero para não concatenar
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent.replace(',','.') * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

//botão decimal (,)
// verificar se existe um numero decimal
const existeDecimal = () => display.textContent.indexOf(',') != -1;
// verificar se já existe valor digitado
const existeValor = () => display.textContent.length > 0;
// Função de adicionar vírgula
const inserirVirgula = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirVirgula);

//Inserindo teclado para digitação
const mapaTeclado = {
    '0'         : 'tecla0'      ,
    '1'         : 'tecla1'      ,
    '2'         : 'tecla2'      ,
    '3'         : 'tecla3'      ,
    '4'         : 'tecla4'      ,
    '5'         : 'tecla5'      ,
    '6'         : 'tecla6'      ,
    '7'         : 'tecla7'      ,
    '8'         : 'tecla8'      ,
    '9'         : 'tecla9'      ,
    ','         : 'decimal'     ,
    '/'         : 'operadordividir',
    '*'         : 'operadormultiplicador',
    '+'         : 'operadorsomar',
    '-'         : 'operadorsubtrair',
    'Escape'    : 'limparcalculo',
    'c'         : 'limpardisplay',
    'Backspace' : 'backspace'   ,
    '='         : 'igual'       ,
    'Control'   : 'inverter'

}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    //verifica se uma das chaves do mapaTeclado tem a tecla pressionada
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
    
    if (teclaPermitida()) {
        document.getElementById(mapaTeclado[tecla]).click();
    }
}
document.addEventListener('keydown', mapearTeclado);
