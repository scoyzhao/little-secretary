const Koa = require('koa')
const sha1 = require('sha1')
const app = new Koa()

const config = {
  appId: 'wxxxxxxxxxxxxxx167',
  appSecret: 'e30xxxxxxxxx5f9xxxxxx6dxxxxxxb8f',
  token: '311824',
}

app.use(async ctx => {
  const signature = ctx.query.signature,
    timestamp = ctx.query.timestamp,
    nonce = ctx.query.nonce,
    token = config.token
  //字典排序
  const str = [token, timestamp, nonce].sort().join('')
  const result = sha1(str)
  if (result === signature) {
    console.log(ctx)
    ctx.body = ctx.query.echostr
  } else {
    ctx.body = {
      code: -1,
      msg: "fail"
    }
  }
})

app.listen(443, () => {
  console.log('app start')
})
