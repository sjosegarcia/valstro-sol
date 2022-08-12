import { io } from "socket.io-client";
import { createInterface } from "readline";

const socket = io("http://localhost:3000"); //connection to the server
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
let resultCount = -1; //store the number of results from a name search
let currentResult = 0; //current result index

socket.on("search", (response) => {
  //event listener from server when "search" is emitted
  const result = JSON.parse(JSON.stringify(response)); //make the object to a string, then JSONify
  if (result.error !== undefined) {
    //if error attribute is found
    console.log(result.error);
    currentResult = 0;
    resultCount = -1;
    rl.prompt();
    return; //exit
  }
  if (resultCount < 1) resultCount = result.resultCount; //update resultCount with whats returned
  currentResult++; //inc
  console.log(
    `(${currentResult}/${resultCount}) ${result.name} - [${result.films}]`
  ); //format print
  if (currentResult === result.resultCount) {
    currentResult = 0;
    resultCount = -1;
    rl.prompt();
  }
});

rl.setPrompt("What character would you like to search for? ");
rl.prompt();
rl.on("line", (name) => {
  socket.emit("search", { query: name });
}).on("close", () => {
  socket.close();
  process.exit(0)
});