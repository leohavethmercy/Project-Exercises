
// DOM elements
// gets elements in HTML and sets elements to variables
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');



// Object that contains generate function
// key: value
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//generate password element click
//when generate element is clicked - get value of elements
generateEl.addEventListener('click', () => {
    //checks value of length -- +lengthEl - turns it into number
    const length = +lengthEl.value;

    //checks if has  elements are checked or not
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    //sets results element value to the result of generatePassword
    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper, 
        hasNumber,
        hasSymbol,
        length
        );
});

//Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }    
    //sets value of text area value to password
    textarea.value = password;
    //appends password to clip
    document.body.appendChild(textarea);
    //selects the text area
    textarea.select();
    // executes copy command
    document.execCommand('copy');
    //removes text area
    textarea.remove();
    alert('password copied')

})


// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    //1. Initialize password variable
    //2. filter out unchecked types (upper,lower,num,sym)
    //3. loop over length call generator function for each type
    //4. add final password to password variable and return

    let generatedPassword = '';

    //count number of checked items/values
    const typesCount = lower + upper + number + symbol;
    // console.log('typesCount: ' + typesCount)

    //filter loops through each item in typesArr - filters out
    // anything that equals false
    // Object.value(item)[0] -- looks through array and gets the
    // value of the first key:value, value(0)
    const typesArr = [{lower}, {upper}, {number}, {symbol}]
    .filter(item => Object.values(item)[0]);

    // console.log('typesArr',typesArr);

    if(typesCount === 0) {
        return'';
    }

    //generating characters
    //increment by number of checked boxes
    for(let i = 0; i< length; i+= typesCount) {
        typesArr.forEach(type => {
            // gives us the first key of each item in typesArr
            // 'lower','upper', 'number', 'symbol'
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName);
           
            //calls randomFunc object with given key name
            // which returns value (generator function)
            generatedPassword += randomFunc[funcName]();
        });
    } 
    // corrects length of password using slice
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}


// Generator functions - 

// CharCode - http://www.net-comber.com/charset.html

// Generates a random lower & upper case letter

// Math.floor(Math.Random() * 26)  = Math.Random()
// generates random decimal, * 26 - sets range of numbers
// to return - (1 - 26), Math.floor makes decimal a whole number

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//Generates a random number from CharCode 

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//Generates a random symbol from const symbols string

function getRandomSymbol() {
    const symbols = '!@#$%^&*()_+<>?:"{}|';
    return symbols[Math.floor(Math.random() * symbols.length)]
}


console.log(getRandomSymbol());