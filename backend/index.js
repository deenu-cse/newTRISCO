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
    for (let i = 0; i < totalCpu; i++) {
        cluster.fork()
    }
} else {
    app.get('/', (req, res) => {
        res.send("Hello Home");
    });

    Connectdb().then(() => {
        app.listen(3000, () => {
            console.log(`Port is 3000 : ${process.pid}`);
        });
    })
}
