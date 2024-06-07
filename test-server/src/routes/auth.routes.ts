import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-in', (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  if (username === 'error') {
    res.status(401)
      .send({
        error: {
          message: "login error, please verify your credentials"
        }
      });
  }

  res.statusCode = 200;
  res.json({
    username: "daisyta",
    token: "authTokenFalse",
    roles: [
      "admin",
      "owner",
      "ruler",
    ]
  });

  return res;

});

authRouter.post('/sign-up', (req, res) => {
  console.log(req.body);
  res.statusCode = 201;
  res.json({
    username: "daisyta",
    token: "authTokenFalse",
    roles: [
      "admin",
      "owner",
      "ruler",
    ]
  });

  return res;
});

authRouter.put('/forgot-password', (req, res) => {
  console.log(req.body);
  res.statusCode = 200;
  return res;
});

authRouter.put('/renew-token', (req, res) => {
  console.log(req.body);
  res.statusCode = 200;
  res.json({
    token: "newFakeToken"
  });

  return res
});

authRouter.delete('/logout', (req, res) => {
  console.log(req.body);
  res.statusCode = 200;

  return res;
});

export default authRouter;
