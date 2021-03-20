const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
// const config = require('./config/dev')
const FakeDb = require('./fake')

const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')
const path = require('path')

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  useCreateIndex: true
}).then(
  () => {
    if(process.env.NODE_ENV !== 'production') {
      const fakeDB = new FakeDb();
      // fakeDB.initDb()
    }
  }
);

const app = express()
// json形式のデータを受け取る
app.use(bodyParser.json())

app.use('/api/v1/products',productRoutes) ///api/v1/productsを叩いたとき
app.use('/api/v1/users', userRoutes) ///api/v1/productsを叩いたとき

// callback functionなので、serverが/productsにアクセス受け取ったら、呼び出し元で関数実行
// app.get('/products',function(req,res){
//   res.json({'success':true})
// })

if(process.env.NODE_ENV === 'production') {
  const appPath = path.join( __dirname, '..', 'dist', 'reservation-app')
  app.use(express.static(appPath))
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'))
  })
}

const PORT = process.env.PORT || '3001'

app.listen(PORT,function () {
  console.log('running')
})
