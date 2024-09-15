import fs from "fs";

const args = process.argv.slice(2); // Skip the first two arguments (node path and script path)

if (args.length < 2) {
  console.error("Usage: ./your_program.sh tokenize <filename>");
  process.exit(1);
}

const command = args[0];

if (command !== "tokenize") {
  console.error(`Usage: Unknown command: ${command}`);
  process.exit(1);
}

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.error("Logs from your program will appear here!");

const filename = args[1];

// Uncomment this block to pass the first stage
//
const fileContent = fs.readFileSync(filename, "utf8");

let tokens='';
 if (fileContent.length !== 0) {
//second stage - parser
//parsing the tokens
let lines=fileContent.split("\n");

for(const line of lines){
  for(const ch of line){
    if(ch=='('){
      tokens+='LEFT_PAREN ( null\n';
    }
    else if(ch==')'){
      tokens+='RIGHT_PAREN ) null\n';
    }
  }
}
}
tokens+='EOF null\n';
//console.log(tokens);
console.log(tokens);