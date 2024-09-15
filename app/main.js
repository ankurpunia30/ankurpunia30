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
let isError=false;
 if (fileContent.length !== 0) {
//second stage - parser
//parsing the tokens
let lines=fileContent.split("\n");

for(const [lineNumber,line] of lines.entries()){
  
  for(const i in Range(0,line.length)){
    ch=line[i];
    if(ch=='('){
      tokens+='LEFT_PAREN ( null\n';
    }
    else if(ch==')'){
      tokens+='RIGHT_PAREN ) null\n';
    }
    else if(ch=='{'){
      tokens+='LEFT_BRACE { null\n';
    }
    else if(ch=='}'){
      tokens+='RIGHT_BRACE } null\n';
    }
    else if(ch=='+'){
      tokens+='PLUS + null\n';
    }
    else if(ch=='-'){
      tokens+='MINUS - null\n';
    }
    else if(ch=='*'){
      tokens+='STAR * null\n';
    }
    else if(ch=='.'){
      tokens+='DOT . null\n';
    }
    else if(ch==','){
      tokens+='COMMA , null\n';
    }
    else if(ch==';'){
      tokens+='SEMICOLON ; null\n';
    }
    else if(ch=='=' && lines[i+1]=='=' && i+1<line.length){
      tokens+='EQUAL_EQUAL == null\n';
      i++;
    }
    else if(ch=='='){
      tokens+='EQUAL = null\n';
    }
    else {
      console.error(`[line ${lineNumber+1}] Error: Unexpected character: ${ch}`);
      isError=true;
    }
  }
}
}
tokens+='EOF  null\n';
//console.log(tokens);
console.log(tokens);

if(isError){
  process.exit(65);
}