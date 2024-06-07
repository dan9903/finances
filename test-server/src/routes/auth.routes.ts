import { Router } from "express";

const authRouter = Router();

authRouter.post('/login', (req, res) => {
  console.log(req.body);
  res.statusCode = 200;
  res.json({
    username: "daisyta",
    token: "authTokenFalso",
    roles: [
      "admin",
      "owner",
      "ruler",
    ]
  });

  return res;

});

authRouter.post('/register', (req, res) => {
  const [username, password, email] = req.body;


  return res;
});



export default authRouter;
