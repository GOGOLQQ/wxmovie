const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getMovieIdFilter = page => {
  arr.filter(function (item, index) {
    if (index > page * 10 + 1 && index < (page + 1) * 10 + 2) {
      console.log(item)
    }
  })
}


module.exports = {
  formatTime: formatTime,
  getMovieIdFilter: getMovieIdFilter
}
