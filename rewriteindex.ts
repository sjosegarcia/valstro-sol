import { io } from "socket.io-client";
import { createInterface } from "readline";

type StarwarsResponseSuccess = {
    page: number;
    resultCount: number;
    name: string;
    films: string;
}

type StarwarsResponseFailure = {
    page: number;
    resultCount: number;
    error: string;
}

type StarwarsResponse = StarwarsResponseSuccess | StarwarsResponseFailure;

const searchProgram = () => {
    const socket = io("http://localhost:3000");
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const displayOutput = (response: StarwarsResponse) => {
        const success = response as StarwarsResponseSuccess;
        const failure = response as StarwarsResponseFailure;
        if (failure) console.log(failure.error);
        if (success) console.log(`${success.page}/${success.resultCount} ${success.name} - [${success.films}]`);
    };

    socket.on("search", (response: StarwarsResponse) => {
        displayOutput(response);
    });

    rl.setPrompt("What character would you like to search for? ");
    rl.prompt();
    rl.on("line", (name) => {
        socket.emit("search", { query: name });
    }).on("close", () => {
        socket.close();
        process.exit(0)
    });
}

searchProgram();