//Number Data Type
console.log("---Number---");
console.log(1 + 1);
console.log(4 - 1);
console.log(5 * 2);
console.log(6 / 2);
console.log(6 % 2);

//String Data Type
console.log("---String---");
console.log("1" + "1");
console.log("Hello" + "World");
let str = "Hello World";
console.log(str.length);

//Variable
console.log("---Variable---");
let a = 1;
let b = 2;
console.log(a + b);

let myName = "Jhon";
str = "Hello " + myName;
console.log(str);

//Template Literal
console.log("---Template Literal");
let letter =
  myName +
  " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
let template = `${myName} is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
console.log(template);

//File System
const fs = require("fs");
fs.readFile("sample.txt", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});

//Boolean Type
console.log(true);
console.log(false);

//Comparison Operator
console.log(1 == 1);
console.log(1 == 2);
console.log(1 > 2);
console.log(1 < 2);
console.log(1 === 1);
console.log(1 === 2);

//Conditional statements
