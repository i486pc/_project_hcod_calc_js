/**this code defines a calculator object in JavaScript with 
 * various methods to handle operations and calculations.*/

class ButtonsSettingClass {
/**This code defines the constructor function for a calculator object.
 * The purpose of this constructor function is to create a new calculator object. 
 * It sets the initial values for the _lastOperator, _lastNumber, and _operation 
 * properties, and calls the initButtonsEvent method to initialize 
 * the event listeners for the calculator buttons. The _displayCalcEl 
 * property is used to store the reference to the display element of the calculator.
 */
constructor(){

        this._displayCalcEl = document.querySelector("#display");

        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;

        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];

        this.initSetting();
        this.initButtonsEvent();
        this.initKeyboard();
        this.displayCalc();
    
}
 /** ----------------------------------------------------------------------------- */    
pasteFromClipboard(){

    document.addEventListener('paste', e=>{

        let text = e.clipboardData.getData('Text');

        this.displayCalc = parseFloat(text);

    });

}
 /** ----------------------------------------------------------------------------- */    
copyToClipboard(){

    let input = document.createElement('input');

    input.value = this.displayCalc;

    document.body.appendChild(input);

    input.select();

    document.execCommand("Copy");

    input.remove();

}

 /** ----------------------------------------------------------------------------- */    
initSetting(){

    this.setLastNumberToDisplay();
    this.pasteFromClipboard();

    document.querySelectorAll('.btn-ac').forEach(btn=>{

        btn.addEventListener('dblclick', e=>{

            this.toggleAudio();

        });

    });
} 
/** ----------------------------------------------------------------------------- */
toggleAudio(){

    this._audioOnOff = !this._audioOnOff;

}
 /** ----------------------------------------------------------------------------- */
playAudio(){

    if (this._audioOnOff) {

        this._audio.currentTime = 0;
        this._audio.play();

    }

}
 /** ----------------------------------------------------------------------------- */
initKeyboard() {

    document.addEventListener('keyup', e=> {

        this.playAudio();

        switch (e.key) {

            case 'Escape':
                this.clearAll();
                break;

            case 'Backspace':
                this.clearEntry();
                break;

            case '+':    
            case '-':    
            case '*':    
            case '/':    
            case '%':
                this.addOperation(e.key);
                break;

            case 'Enter':
            case '=':
                this.calc();
                break;

            case '.':
            case ',':
                this.addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(e.key));
                break;

            case 'c':
                if (e.ctrlKey) this.copyToClipboard();
                break;

        }

    })

}

 /** ----------------------------------------------------------------------------- */
/**This code defines the addEventListenerAll function, which is used 
 * to add multiple event listeners to an HTML element for a given set of events. */
addEventListenerAll(element, events, fn){

    events.split(' ').forEach(event =>{
    element.addEventListener(event, fn, false);
    });
}
 /** ----------------------------------------------------------------------------- */
 /**This code defines the cancelAll function, which is used to cancel all 
 * operations and reset the calculator object to its initial state. */
cancelAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();

} 
/** ----------------------------------------------------------------------------- */
/**This code defines the cancelEntry function, which is used to cancel the 
 * entry of the last operation in the ongoing operations stored in a calculator 
 * object. */
cancelEntry(){
    this._operation.pop();
    this.setLastNumberToDisplay();
}
/** ----------------------------------------------------------------------------- */
/**This code defines the getLastOperation function, which is used to retrieve 
 * the last operation from the ongoing operations stored in a calculator object. */
getLastOperation(){
    return this._operation[this._operation.length-1];
}
/** ----------------------------------------------------------------------------- */
/**This code defines the setLastOperation function, which is used to update 
 * the last operation in the ongoing operations stored in a calculator object. */
setLastOperation(value){

    this._operation[this._operation.length-1] = value;
}
/** ----------------------------------------------------------------------------- */
/**This code defines the isOperator function, which is used to check if a 
 * given value is an operator in a calculator. */
isOperator(value){
    return([ '+','-','*','%','/'].indexOf(value) > -1);
}
/** ----------------------------------------------------------------------------- */
/**This code defines the pushOperation method, which is used to add a new 
 * operation to the ongoing operations stored in a calculator object. */
pushOperation(value){
    this._operation.push(value);
        if(this._operation.length > 3) {
            this.calc();
        }
}
/** ----------------------------------------------------------------------------- */

/**This code defines the getResult method, which is used to evaluate the 
 * result of the ongoing operations stored in a calculator object. */
getResult(){
    try{
        return eval(this._operation.join(""));
    } catch(e){
        setTimeout(() =>{
            this.setError();
        },1)
    }
}
/** ----------------------------------------------------------------------------- */

/**This code defines the calc method, which is used to perform calculations 
 * based on the ongoing operations stored in a calculator. */
calc(){
    let last = '';
    this._lastOperator = this.getLastItem();
    if(this._operation.length < 3){
        let firstItem = this._operation[0];
        this._operation = [firstItem, this._lastOperator, this._lastNumber];    
    }

    if(this._operation.length > 3){
        last = this._operation.pop();
        this._lastNumber = this.getResult();
    }else if (this._operation.length == 3){
        this._lastNumber = this.getLastItem(false);
    }

    let result = this.getResult();

    if (last == '%') {

        result /= 100;

        this._operation = [result];

    } else {

        this._operation = [result];

        if (last) this._operation.push(last);

    }

    this.setLastNumberToDisplay();
}
/** ----------------------------------------------------------------------------- */

/**This code defines the getLastItem method, which is used to retrieve the 
 * last item from the ongoing calculations in a calculator. */
getLastItem(isOperator = true){

    let lastItem;

    for (let i = this._operation.length-1; i >= 0; i--){

        if (this.isOperator(this._operation[i]) == isOperator) {
            lastItem = this._operation[i];
            break;

        }

    }

    if (!lastItem) {

        lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

    }

    return lastItem;

}
/** ----------------------------------------------------------------------------- */

/**This code defines the setLastNumberToDisplay method, which is used to update 
 * the display of a calculator with the last number in the ongoing calculations. */
setLastNumberToDisplay(){

    let lastNumber = this.getLastItem(false);

    if (!lastNumber) lastNumber = 0;

    this.displayCalc = lastNumber;

}
/** ----------------------------------------------------------------------------- */

/**This code defines the addOperation method, which is used to handle adding a 
 * new operation or value to the ongoing calculations in a calculator. */
/**in this method the objective is concatenate the operation */
/**value - -> value on that moment. If the stored value is x and you want to include y, 
 * a comparison will be made with x */
/**Feeding the array and manipulate to became a math operations with numbers + using the signals */
addOperation(value)
/**in this method the objective is concatenate the operation */{
    //isNaN - -> it isn't a number | a String 
    if (isNaN(this.getLastOperation())) {
        if (this.isOperator(value)) {
            this.setLastOperation(value);

        } else /**number*/ {
            this.pushOperation(value);
            this.setLastNumberToDisplay();
        }

    }else {
        /**isOperator - -> swapping operator signal, + to - per example*/
        if (this.isOperator(value)){
            this.pushOperation(value);
        } else {

            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(newValue);
            this.setLastNumberToDisplay();
        }
    }

}
/** ----------------------------------------------------------------------------- */

/**This code defines the setError method, which is used to set the display of a 
 * calculator to show an error message. */
setError(){
    this.displayCalc = "Error";
}   
/** ----------------------------------------------------------------------------- */

/**This code defines the addDot method, which is used to add a decimal point 
 * to the ongoing operation of a calculator. */
addDot(){

    let lastOperation = this.getLastOperation();
    if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;
    if (this.isOperator(lastOperation) || !lastOperation) {

        this.pushOperation('0.');
    } else {
        this.setLastOperation(lastOperation.toString() + '.');
    }

    this.setLastNumberToDisplay();    
}
/** ----------------------------------------------------------------------------- */
/**This code defines the execBtn method, which takes in a value parameter and 
 * executes different operations based on that value. The method uses a switch 
 * statement to determine which action to perform based on the value. */
execBtn(value){

        this.playAudio();

        switch(value){
            case 'ac':
                this.cancelAll();
                break;

            case 'ce':
                this.cancelEntry();
                break;

            case 'plus':
                this.addOperation ('+');
                break;
            
            case 'subtraction':
                this.addOperation ('-');
                break;

            case 'percent':
                this.addOperation ('%');
                break;
            
            case 'division':
                this.addOperation ('/');
                break;
            
            case 'equal':
                this.calc();
                break;

            case 'multiplication':
                this.addOperation ('*');
                break;
            
            case 'dot':
                this.addOperation ('.');
                this.addDot;
                break;
            
                // ' ' - -> type text, it's mean letter and not a math number
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            
            default:
                this.setError();
                break;
        }

}

/** ----------------------------------------------------------------------------- */
/** -----------------------------------------------------------------------------
 * g.btn-ac,                    g.btn-ac,
 * g.btn-ce,                    g.btn-ce,
 * g.btn-percent,               g.btn-percent, 
 * g.btn-division,              g.btn-division,
 * g.btn-9,                     g.btn-9,
 * g.btn-6,                     g.btn-6, 
 * g.btn-3,                     g.btn-3, 
 * g.btn-plus,                  g.btn-plus 
 * g.btn-equal,                 g.btn-equal,
 * g.btn-8,                     g.btn-8,
 * g.btn-5,                     g.btn-5, 
 * g.btn-2,                     g.btn-2,
 * g.btn-dot,                   g.btn-dot,  
 * g.btn-7,                     g.btn-7,  
 * g.btn-4,                     g.btn-4, 
 * g.btn-1,                     g.btn-1, 
 * g.btn-0,                     g.btn-0, 
 * g.btn-multiplication,        g.btn-multiplication,  
 * g.btn-subtraction,           g.btn-subtraction,*/
    
/**This code is written in JavaScript and it is defining the initButtonsEvent 
 * function.The purpose of this function is to initialize event listeners and handle 
 * events for a set of buttons or parts in an HTML document. */ 

/**Query Selector to manipulate the DOM and have access on CSS code. And having a 
 * requesting select all date */

initButtonsEvent() {

    //Select all 'g' from  CSS class (#) - -> buttons & parts
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {

        //Click & Drag are meaning on event happing on the Dom
        // 'e' - -> Parameter 
        this.addEventListenerAll(btn, "click drag", e => {

            let textBtn = btn.className.baseVal.replace("btn-","");

            this.execBtn(textBtn);

        });

        this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{

            btn.style.cursor = "pointer";
        });
    });
}

/** ----------------------------------------------------------------------------- */

/**This code is defining a getter and setter for the displayCalc property. 
 * It is using JavaScript's getter and setter syntax to modify the behavior of 
 * accessing and assigning values to the displayCalc property. */
get displayCalc(){
    return this._displayCalcEl.innerHTML;
}
/** ----------------------------------------------------------------------------- */        
set displayCalc(value){

    if (value.toString().length > 10) {
        this.setError();
        return false;
    }
    this._displayCalcEl.innerHTML = (value);
} 
    
/** ----------------------------------------------------------------------------- */
    



}