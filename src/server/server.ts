import * as express from 'express';

import * as fs from 'fs';
import * as path from 'path';

const app = express();

app.use(express.static('public'));

app.get('/data', (req, res) => {

  //first page
  let file = path.join(__dirname, '/jsonData/p2.json')
  let rawData: any = fs.readFileSync(file);
  let log = JSON.parse(rawData);
  res.send(JSON.stringify(log));
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
