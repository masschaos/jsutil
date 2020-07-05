const im = require('./')

im.setToken(process.env.SLACK_TOKEN)
im.setChannels('dev', 'dev', 'dev')
const context = {
  1: '这是Test1',
  Test2: '这是Test2',
  Test3: '这是Test3'
}

const context1 = new Map()
context1.set('123', 'ssss')
context1.set('123456', [1, 2, 3])

im.debug('debug !!!', context).then(res => {
  console.log(res)
})

im.info('*INFO*\nSomething you want to know.\n1. hello\n2. world', context).then(res => {
  console.log(res)
})

im.error('error !!!', context1).then(res => {
  console.log(res)
})
