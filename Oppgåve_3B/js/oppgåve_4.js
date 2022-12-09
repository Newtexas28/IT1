/* 
 * Begining of oppgåve_5.js
 */

const antallTimer = 4;
const antallMinutter = 27;
const antallSekunder = 33;

const Total_time = () => {
    return antallTimer * 3600 + antallMinutter * 60 + antallSekunder;
};

console.log(Total_time());

/* 
 * Taking user input from the HTML and declaring in the variabel the given_time.
 * This vaiabel is use in the three functions: hours(), minutes() and seconds().
 * Using parseInt() to convert the string thet comes from the HTML website into numbers. 
 * Making a function with all the value from the three previous functions above
 * and putting their values in a string assigne to the constant "time". 
 */

const total_time = () => {
    const seconds = Total_time(antallTimer, antallMinutter, antallSekunder);
    document.getElementById("Oppgåve_4").innerHTML = "Den totale tida er: " + seconds.toString(); + " sekundar";    
};