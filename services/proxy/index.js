const config = require('../../pkg/config');
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(`${__dirname}/../../uploads/`));

app.use(
    '/api/v1/storage',
    proxy(
        'http://127.0.0.1:10001',
        {
            proxyReqPathResolver: (req) => `http://127.0.0.1:10001/api/v1/storage/${req.url}`,
            limit: '2mb'
        }
    )
);

// app.use(
//     '/api/v1/auth',
//     proxy(
//         'http://127.0.0.1:10002',
//         { proxyReqPathResolver: (req) => `http://127.0.0.1:10002/api/v1/auth/${req.url}` }
//     )
// );
app.post('/api/v1/auth/create-account', (req, res) => {
    const accountData = req.body;
  
    console.log('Account data:', accountData);
  
    // Send a response to the client
    res.status(201).json({
      message: 'Account created successfully',
      accountData: accountData,
    });
  });

app.use(
    '/api/v1/recipes',
    proxy(
        'http://127.0.0.1:10003',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:10003/api/v1/recipes/${req.url}` }
    )
);

app.use(
    '/',
    proxy(
        'http://127.0.0.1:3000',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:3000/${req.url}` }
    )
);

// app.use(
//     '/',
//     express.static(`${__dirname}/../../web/build`)
// );

   

const PORT = 3000;

app.listen(PORT, err => {
    if (err) {
        return console.log(err);
    }
    console.log('Service [proxy] successfully started on port', PORT);
});

