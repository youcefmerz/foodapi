//1. Import express
const express = require("express")
const cors = require("cors")
require("./db/mongoose")
const foodRouter = require("./routes/foodRouter")

const userRouter = require("./routes/userRouter")
//2 Call express function and save it in app
const app = express()
app.use(express.json())
app.use(cors())
app.use(foodRouter)

app.use(userRouter)

//3. Define a port
const port = process.env.APP_PORT
//4. Listen to the port
app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})