import ngrok from "ngrok";
import nodemon from "nodemon";
if (process.env.NODE_ENV === "production") {
    console.error(
        "Do not use nodemon in production, run bin/www directly instead."
    );
    process.exitCode = 1;
    /* return null; */
}


ngrok
    .connect({
        proto: "http",
        addr: "8000",
        authtoken: '2R7S4WMWLcxBVaeItNxKxWyiNxr_4hnHcTpx7VfwMVWuLccQU'
    })
    .then((url) => {
        console.log(`ngrok tunnel opened at: ${url}`);
        console.log("Open the ngrok dashboard at: https://localhost:4040\n");

        nodemon({
            script: "./bin/www",
            exec: `NGROK_URL=${url} node`,
        }).on("start", () => {
            console.log("The application has started");
        }).on("restart", files => {
            console.group("Application restarted due to:")
            files.forEach(file => console.log(file));
            console.groupEnd();
        }).on("quit", () => {
            console.log("The application has quit, closing ngrok tunnel");
            ngrok.kill().then(() => process.exit(0));
        });
    })
    .catch((error) => {
        console.error("Error opening ngrok tunnel: ", error);
        process.exitCode = 1;
    });