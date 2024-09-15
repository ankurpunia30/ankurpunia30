import fs from "fs";
import { isFloat64Array } from "util/types";

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
  
  for(let i =0;i<line.length;i++){
    let ch=line[i];
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
    else if(ch=='<'){
      if(i+1<line.length &&line[i+1]=='='){
        tokens+='LESS_EQUAL <= null\n';
        i++;
      }
      else{
        tokens+='LESS < null\n';
      }
    }
    else if(ch=='>'){
      
      if(i+1<line.length &&line[i+1]=='='){
        tokens+='GREATER_EQUAL >= null\n';
        i++;
      }
      else{
        tokens+='GREATER > null\n';
      }
    }
    else if(ch=='/'){
      if(i+1<line.length &&line[i+1]=='/'){
        break;
      }
      else{
        tokens+='SLASH / null\n';
      }
    }
    else if(ch==' ' || ch=='\t'){
      continue;
    }
    else if(ch=='!'){
      if(i+1<line.length &&line[i+1]=='='){
        tokens+='BANG_EQUAL != null\n';
        i++;
      }
      else{
        tokens+='BANG ! null\n';
      }
    }
    else if(ch=='=' ){
      if(i+1<line.length &&line[i+1]=='='){
        tokens+='EQUAL_EQUAL == null\n';
        i++;
      }
      else{
        tokens+='EQUAL = null\n';
      }
    }
    else if(ch>='0'&& ch<='9'){
      let num=0;
      
      while(line[i]>='0'&& line[i]<='9'){
          num=num*10+parseInt(line[i]);
          i++;
        }
      tokens+=`NUMBER ${num} ${(parseFloat(num))}\n`;
    }
    else if(ch=='"'){
      i++;
      let literal=""
      while(i<line.length && line[i]!=='"'){
        literal+=line[i];
        i++;
      }
      if(i<line.length && line[i]==='"')
      tokens+=`STRING "${literal}" ${literal}\n`;
      else{
        console.error(`[line ${lineNumber+1}] Error: Unterminated string.`);
        isError=true;
      }
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