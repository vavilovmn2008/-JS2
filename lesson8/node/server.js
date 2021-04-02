const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { readFile, writeFile } = require('fs').promises;
const app = express();

const PORT = 3003;

app.use(express.static('./public'));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}!`);
});

const saveLog = (data) => {
  const logData = `${new Date().toISOString()}: ${data}\n`;
  fs.appendFile('./data/log.txt', logData, (err) => {
    if (err) console.log('!!!!! log error:', err);
  });
};

app.get('/data', (req, res) => {
  readFile(`./data/goods.json`)
    .then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      console.log('!!!!! read goods.json error', err);
      res.end();
    });
});

app.post('/data', (req, res) => {
  if (!req.body) {
    res.end();
    return;
  }

  readFile('./data/goods.json', 'utf-8')
    .then((data) => {
      const goods = JSON.parse(data);

      const maxId = goods.reduce(
        (acc, good) => (acc < good.id ? good.id : acc),
        0,
      );

      goods.push({
        id: maxId + 1,
        ...req.body,
      });

      saveLog(`obj: goods; type: add; goodsId: ${maxId + 1}`);
      fs.writeFile('./data/goods.json', JSON.stringify(goods), (err) => {});
    })
    .catch((err) => {
      console.log('!!!!! read goods.json error', err);
    });

  res.end();
});

app.get('/cart', (req, res) => {
  readFile('./data/cart.json', 'utf-8')
    .then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      console.log('!!!!! read cart.json error', err);
      res.end();
    });
});

app.post('/cart', (req, res) => {
  if (!req.body) {
    res.end();
    return;
  }

  writeFile('./data/cart.json', JSON.stringify(req.body), 'utf-8').then(() => {
    saveLog(`obj: cart; type: update;`);

    readFile('./data/cart.json', 'utf-8').then((data) => {
      res.send(JSON.parse(data));
    });
  });
});