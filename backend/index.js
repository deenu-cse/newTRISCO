const express = require("express")
const cors = require("cors");
const cluster = require("node:cluster")
const os = require("os")
const Connectdb = require("./utils/Db");
const app = express()
const Routes = require("./Routes/allRoutes")



const totalCpu = os.cpus().length

console.log(totalCpu)

const corsoptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials: true
}

app.use(cors(corsoptions))
app.use(express.json());
app.use('/', Routes)



if (cluster.isPrimary) {
    // Create workers for each CPU core
    for (let i = 0; i < totalCpu; i++) {
        cluster.fork();
    }

    // When a worker exits, fork a new one
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited. Forking a new one.`);
        cluster.fork();
    });
} else {
    Connectdb().then(() => {
        app.listen(3000, () => { // Listen on a single port (3000)
            console.log(`Server running on port 3000 with process ID: ${process.pid}`);
        });
    });
}
