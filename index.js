const express = require("express")
const app = express();
const cors = require("cors")
const path=require("path")
require("./Db/db");
const dotenv =require("dotenv").config()
const PORT=process.env.PORT || 5000

// mongodb+srv://sidhupardeep618:placement_yahoo@cluster0.kh3qu4g.mongodb.net/yudo-cart
// middleware
app.use(cors());
app.use(express.json())

// routes
app.use("/auth",require("./routes/auth"))
app.use("/product",require("./routes/product"))
app.use("/purchase",require("./routes/purchase"))
app.use("/cart",require("./routes/cart"))
app.use("/review",require("./routes/review"))
app.use("/admin",require("./routes/admin"))

// app.get("/",(req,res)=>{
//     app.use(express.static(path.resolve(__dirname,"client","build")));
//     res.sendFile(path.resolve(__dirname,"client","build","index.html"))
// });

app.listen(PORT);
