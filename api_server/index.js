const { v4: uuidv4 } = require('uuid');
const cors = require("cors");
const express = require("express");
const app = express();
const data = require("./data.json");

const _ = require("lodash");
var dataC = _.flatten(data);
app.use(cors());
app.options("*", cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});

app.get("/meals", async (req, res) => {
  return res.send(dataC);
});

app.post("/meals/:id", (req, res) => {
  const data2 = req.body;
  data2.idMeal = uuidv4();
  console.log(data2)
  dataC.push(data2);
  res.status(200).send({ added: { data2 } });
});

app.delete("/meals/:id", (req, res) => {
  const id = req.params.id.slice(0, -1);
  dataC = _.flatten(dataC).filter(x => x.idMeal !== String(id))
  console.log(id)
  res.status(200).send({ deleted: id });
});

app.put("/meals/:id", (req, res) => {
  const id = req.params.id.slice(0, -1);
  const data2 = req.body;
  // dataC = _.flatten(dataC).filter(x => x.idMeal !== String(id))
  console.log(id)
  console.log(data2)
  
  let toedit = dataC.filter((x) => x.idMeal === id);
  let rest = dataC.filter((x) => x.idMeal !== id);
  _.forIn(data2, function (value, key) {
    toedit[0][key] = value;
  });

  dataC = [...rest, toedit[0]]

  res.status(200).send({ edited: id, editedBody: toedit });
});