//seleção de elementos
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

//classes mais lógica calculadora
class Calculator {
  constructor(previousOperationText, currentOperationText) {

    //valores impressos na tela
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;

    //o que o usuário está utilizando no momento
    this.currentOperation = "";
  }

  //método que vai esta esperando um dígito - add dígitos
  addDigit(digit) {
    console.log(digit);

    // Verificar se o number já tem ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    ///mudança da current para digito
    this.currentOperation = digit;
    this.updateScreen();
  }

  //processar todas as operações da calculadora
  processOperation(operation) {
    //Verifique se o valor atual está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // alteração de operação - vai checar se esta vazio - se tiver vai retornar
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // Obter valores atuais e anteriores
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    //saber que operação vamos usar
    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  //responsável por atualizar tela - mudar valor calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      // Append number to current value
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //Verifique se o valor é zero, se for apenas adicione o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      // Adicionar valor atual ao anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Alterar operação matemática
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    //se a operação que o usuario enviou esta nas operações matemáticas
    if (!mathOperations.includes(operation)) {
      return;
    }

    //apagar um  operador para add outro
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Excluir um dígito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Limpar operação atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Limpar todas as operações
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Processar uma operação
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

////eventos para fazer funcionar
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

     //lógica que ativa métodos qnd usuario aperta um botão - saber se digita number ou operação
     //se valor maior ou igual a zero e se for igual ao ponto, vai ser igual números
    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);

    //se não for/conseguir transformar maior que 0 ou igual a ., ele vai ser uma operação(+-*/)
    } else {
      calc.processOperation(value);
    }
  });
});