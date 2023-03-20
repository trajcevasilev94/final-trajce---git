const config = require('../../pkg/config/index');
const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const auth = require('./handlers/auth');
const bodyParser = require('body-parser');
const db = require('../../pkg/db/index');

db.init();

const api = express();
api.use(bodyParser.json());
api.use(express.json());

api.use(
   jwt({
      algorithms: ['HS256'],
      secret: config.get('security').jwt_secret
   }).unless({
      path: [
         '/api/v1/auth/create-account',
         '/api/v1/auth/login',
      ]
   })
);
console.log("controller " + auth.create.toString)
api.post('/api/v1/auth/create-account', (req, res) => {
   const accountData = req.body;
   console.log('Account data:', accountData);
   db.create(accountData);
   
   // Send a response to the client
   res.status(201).json({
     message: 'Account created successfully',
     accountData: accountData,
   });
 });
api.post('/api/v1/auth/login', auth.login);

api.get('/api/v1/auth/user', auth.getUser);

api.put('/api/v1/auth/update', auth.updateUser);

api.delete('/api/v1/auth/delete', auth.remove);

api.use((err, req, res, next) => {
   if (err.name === "UnauthorizedError") {
      res.status(401).send("Invalid token...");
   } else {
      next(err);
   }
});

// api.listen(config.get('services').proxy.auth, err => {
//    if (err) {
//       return console.log(err);
//    }
//    console.log('Service [auth] successfully started on port', config.get('services').proxy.auth);
// });
const PORT = 3000;

app.listen(PORT, err => {
    if (err) {
        return console.log(err);
    }
    console.log('Service [proxy] successfully started on port', PORT);
});