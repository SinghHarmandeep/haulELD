import * as express from 'express';

import * as fs from 'fs';
import * as path from 'path';

const app = express();

app.use(express.static('public'));

app.get('/data/:file', (req, res) => {

  //first page
  let file1 = path.join(__dirname, `/jsonData/p${req.params.file}.json`)

  let raw: any = fs.readFileSync(file1);
  let log = JSON.parse(raw);
  res.send(JSON.stringify(log));
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
