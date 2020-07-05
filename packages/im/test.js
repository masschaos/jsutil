const im = require('./')

im.setToken('xxxxxxxxxxxxxxxxxxxxx')
im.setChannels('dev', 'dev', 'dev')
const context = {
  color: 'warning',
  fields: [
    {
      title: 'Test 1',
      value: '这是Test1'
    },
    {
      title: 'Test 2',
      value: '这是Test2'
    },
    {
      title: 'Test 3',
      value: '这是Test3'
    }
  ]
}
im.debug('debug !!!', context).then(res => {
  console.log(res)
})
