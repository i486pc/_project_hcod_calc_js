/**the "CalcSettings" object to initialize its *properties and methods.*/

class CalcSettings {

    /** It calls the constructor function of the "CalcSettings" object to initialize its properties and methods.*/

    constructor(){

        //Location for the Date&Time, that is showing on the display
        //https://metacpan.org/dist/DateTime-Locale

        this._locale = 'en-AU';

        /** the statement "this._displayCalcEl = *document.querySelector("#display");" assigns a reference to an HTML element 
         * with the ID "display" to the "_displayCalcEl" property of the current object.*/

        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._timeEl = document.querySelector("#hour");

        /**The setDisplayDateTime method is being called before setting the value of this._currentDate in the constructor.*/

        this._currentDate;
        
        /**By calling "this.initSetting();", the code is invoking the "initSetting()" function or method within the current object. 
        *This function or method likely performs some initialization tasks or sets up certain settings or configurations for the 
        *object itself. The exact implementation of the "initSetting()" function would be determined based on the context and 
        *structure of the object in which it is defined.*/
        
        this.initSetting();

    } //end to initialize its properties and methods

    // Display Settings for an interval of 1000 milliseconds

    initSetting(){
        this.setDisplayDateTime()

        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000); 
    }

     // Display date & time, to Date are set up in how show on display
setDisplayDateTime(){

    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    
    }

/**In JavaScript, the code you provided includes a pair of getter and setter methods for the displayDate property. 
 * The get displayDate() method is a getter method, which allows accessing the value of the displayDate property. In this case, 
 * it returns the value of the _dateEl.innerHTML property. The _dateEl is assumed to be an HTML element that has 
 * an innerHTML property, and the value of this property is returned by the getter. The set displayDate(value) method is a 
 * setter method, which allows setting the value of the displayDate property. It receives a new value through the value parameter. 
 * In this case, it sets the value of the _dateEl.innerHTML property to the new value, effectively updating the HTML 
 * content of the _dateEl element.Overall, these getter and setter methods provide an interface to get and set 
 * the value of the displayDate property, providing encapsulation and control over how the property is accessed and modified. */

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = (value);
    }

    get displayTime(){
        return this._timeEl.innerHTML;        
    }

    set displayTime(value){
        this._timeEl.innerHTML = (value);
    }

   get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    
   set displayCalc(value){
        this._displayCalcEl.innerHTML = (value);
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}