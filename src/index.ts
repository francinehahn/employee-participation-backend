import { app } from "./app"
import { connection } from "./connection"
import { employeeRouter } from "./routes/employeeRouter"
import { projectRouter } from "./routes/projectRouter"
import { userRouter } from "./routes/userRouter"

connection()

app.use("/users", userRouter)
app.use("/users/employees", employeeRouter)
app.use("/users/projects", projectRouter)