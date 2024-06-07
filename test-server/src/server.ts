import express from "express";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
