const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('hello, world 123456'));
app.listen(9001, () => {
  console.log('server is run 9001, please open: http://localhost:9001/');
});
