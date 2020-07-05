const im = require('./')

im.setToken('xoxb-1085200080549-1141886336370-W2x60ZrzdFumi9bj9P2qhUQw')
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
