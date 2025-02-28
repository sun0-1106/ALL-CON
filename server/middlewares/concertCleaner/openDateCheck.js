const { Concerts, Articles } = require('../../models');
const nodemailer = require('nodemailer');

const openDateCheck = async (targetOpenDate, concertid) => {
  
  let year = targetOpenDate.getUTCFullYear()
  let month = targetOpenDate.getUTCMonth()
  let date = targetOpenDate.getUTCDate()
  let hour = targetOpenDate.getUTCHours()
  let minute = targetOpenDate.getUTCMinutes()

  // 2022년 1월 14일
  let today = new Date()

  let yearToday = today.getFullYear()
  let monthToday = today.getMonth()
  let dateToday = today.getDate()
  let hourToday = today.getHours()
  let minuteToday = today.getMinutes()

  /* 주의: 아래 코드 함수화 시켜야합니다!!! */
  // 날짜 확인
  if(year < yearToday) {
    // 해당 콘서트의 activation을 false로 바꿔준다!
    await Concerts.update(
      { activation: false },
      { where: { id: concertid } }
    )

    const articleInfo = await Articles.findAll({ where: { concert_id: concertid } })

    for(let i = 0; i < articleInfo.length; i++) {
      let articleid = articleInfo[i].id

      await Articles.update(
        { view: -999999 },
        { where: { id: articleid } }
      )
    }
  } 
  // 
  else if(year === yearToday) {
    if(month+1 <= monthToday && date <= dateToday) {
      // 해당 콘서트의 activation을 false로 바꿔준다!
      await Concerts.update(
        { activation: false },
        { where: { id: concertid } }
      )
      
      const articleInfo = await Articles.findAll({ where: { concert_id: concertid } })
      
      for(let i = 0; i < articleInfo.length; i++) {
        let articleid = articleInfo[i].id
        
        await Articles.update(
          { view: -999999 },
          { where: { id: articleid } }
        )
      }
    }
  }
  
  return
}

module.exports = {
  openDateCheck
}