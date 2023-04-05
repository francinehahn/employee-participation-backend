import { connection } from "./connection"


const createTables = () => connection.raw(`

`).then(() => console.log("Tabelas criadas.")).catch(err => console.log(err.message || err.sqlMessage))

createTables().then(() => connection.destroy())