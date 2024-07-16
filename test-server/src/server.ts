import express from "express";
import authRouter from "./routes/auth.routes";
import accountsRouter from "./routes/accounts.routes";
import cors from "cors";
import transactionsRouter from "./routes/transactions.routes";
import categoriesRouter from "./routes/categories.routes";

const app = express();

const options: cors.CorsOptions = {
  origin: ['http://localhost:4200']
}


app.use(cors(options));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/categories', categoriesRouter);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
