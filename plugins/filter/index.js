const chatTimeFilter = async (timestamp) => {
  if(!typeof timestamp === 'string') return
  const time = parseInt(timestamp)
  const now = Date.now()
  const diff = Math.abs(now - time)
  const hours = diff/(1000 * 60 * 60)
}
