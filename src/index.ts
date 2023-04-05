import { app } from "./app"
import { connection } from "./connection"
import { userRouter } from "./routes/userRouter"

connection()

app.use("/users", userRouter)