
/**/
let tall1 = 4;
let tall2 = 13;
         
let sum = tall1 + tall2;
         
console.log("Summen blir: " + sum);

console.error("Dette er error");
console.warn("Dette er warn");
console.info("Dette er info")

const sitat = "Hello world, And dfhsdkfhj dfh";

document.getElementById("console").innerHTML = "Summen blir: " + sum;

document.getElementById('sitat').innerHTML = sitat;
document.getElementById('w').innerHTML = "Her blir w vist: " + sitat.indexOf('w');
document.getElementById('Hello_World').innerHTML = sitat.substring(0, 11);