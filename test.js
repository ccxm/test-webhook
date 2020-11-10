const list = [
  {
    date: '2020-09-20',
    week: '周二'
  },
  {
    date: '2020-09-20',
    week: '周二'
  },
  {
    date: '2020-09-20',
    week: '周二'
  },
  {
    date: '2020-09-21',
    week: '周三'
  },
  {
    date: '2020-09-22',
    week: '周四'
  },
  {
    date: '2020-09-22',
    week: '周四'
  },
  {
    date: '2020-09-22',
    week: '周四'
  },
  {
    date: '2020-09-22',
    week: '周四'
  },
  {
    date: '2020-09-22',
    week: '周四'
  },
]

function func() {
  let tempDate = ''
  let tempWeek = ''
  for(let i = 0; i < list.length;i++) {
    if (list[i].date === tempDate && list[i].week === tempWeek) {
      list[i].week = ''
      list[i].date = ''
    } else {
      tempWeek = list[i].week
      tempDate = list[i].date
    }
  }
}

func()
