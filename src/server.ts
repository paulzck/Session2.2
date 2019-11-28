import express = require('express')
import { MetricsHandler } from './metrics'

const app = express()
const port: string = process.env.PORT || '6003'

import path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

app.get('/', (req: any, res: any) => {
  res.render('menu.ejs', {name: req.params.name})
})

app.get('/hello', (req: any, res: any) => {
  res.render('hello.ejs', {name: req.params.name})
})

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})



app.post("/metrics",(req,res) => {
  MetricsHandler.get((err, data) => {
      if(err) throw err
      res.status(200).json(data)
    })
})