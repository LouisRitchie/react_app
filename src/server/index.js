import express from 'express'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import App from 'containers/app'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(__dirname + 'public'))

app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(<App />)

  fs.readFile(`${__dirname}/public/index.html`, 'utf8', (err, data) => {
    if (err) throw err
    const document = data.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`)
    res.send(document)
  })
})

app.use((req, res, next) => next(createError(404)))

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  const code = err.status || 500
  res.status(code).send(`<img src="https://http.cat/${code}" alt="Error Code ${code}"></img>`)
})

app.listen(7000)
