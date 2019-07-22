import express from 'express'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(__dirname + 'public'))

app.use((req, res, next) => next(createError(504)))

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  const code = err.status || 500
  res.status(code).send(`<img src="https://http.cat/${code}" alt="Error Code ${code}"></img>`)
})

app.listen(7000)
