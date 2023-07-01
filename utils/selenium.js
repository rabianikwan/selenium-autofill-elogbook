const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const login = 'http://36.66.236.83/elogbook-samarinda/'
const dashboard = 'http://36.66.236.83/elogbook-samarinda/index.php/aktivitas'
const nip = '199309122019031002'
const pass = 'rabian1234567'
const shift = 'lllllllpsmllpssmllpsmmllpsmllp'
const bulan = '6'
const metric = 'Catatan Keperawatan'
const jobDescriptions = [
  'Melakukan pengkajian keperawatan dasar pada individu',
  'Melakukan komunikasi terapeutik dalam pemberian asuhan keperawatan',
  'Memberikan oksigenasi sederhana',
  'Melakukan intervensi keperawatan spesifik yang sederhana pada area medikal bedah',
  'Melakukan dokumentasi tindakan keperawatan',
  'Melakukan perawatan luka'
]

const activities = 'Mengukur TTV, berkolaborasi dalam pemberian terapi, melakukan dokumentasi, mengkaji keluhan, memberikan diit pasien'
const shiftTime = {
  pagi : '07:30',
  siang : '14:30',
  malam : '21:30',
  malam2 : "23:59",
  malam3 : "00:00",
}
const formatDate = []
async function fillFormatDate(bulan) {
  for (let i = 1 ; i <=30; i++) {
    let array = [];
    formatDate.push(`${i}/${bulan}/2023`)
  }
}
async function editShift(shift) {
  return shift.split('')
}
function randomFromArray(array) {
  return Math.round(Math.random() * (array.length + 1))
}

async function selenium(login, nip, pass, dashboard, function1 ,month, function2, shift) {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(login);
    await driver.findElement(By.name('username')).sendKeys(nip, Key.TAB, pass, Key.ENTER);
    await function1(month)
    const arrayShift = await function2(shift)
    console.log(arrayShift)
    console.log(formatDate)
    await driver.sleep(5000)
    // key of looping

    for (let i = 0; i <= arrayShift.length; i++) {
      if (arrayShift[i] !== "l" && arrayShift[i]) {
        //login to dasboard for inserting value
        await driver.get(dashboard)
        await driver.findElement(By.name('button')).click()
        await driver.sleep(2000)
        //storing element for input
        const dateInput = await driver.findElement(By.name("tgl_aktivitas"), 3000)
        let randomnumber = Math.ceil(Math.random() * 20) + 10;

        switch (arrayShift[i]) {
          case 'p' :
            console.log('dinas pagi', formatDate[i])
            dateInput.sendKeys(Key.DELETE)
            dateInput.sendKeys(formatDate[i], Key.ENTER)
            await driver.findElement(By.name("id_detail_tugas")).sendKeys(jobDescriptions[randomFromArray(jobDescriptions)])
            await driver.findElement(By.name("ket_aktivitas")).sendKeys(activities, Key.TAB,
                randomnumber, Key.TAB,
                metric, Key.TAB,
                shiftTime.pagi, Key.TAB,
                shiftTime.siang, Key.TAB)
            await driver.findElement(By.css('button[type="submit"]')).click();
            await driver.sleep(2000)
            break;
          case 's' :
            console.log('dinas sore' + ' ' + formatDate[i])
            dateInput.sendKeys(Key.DELETE)
            dateInput.sendKeys(formatDate[i], Key.ENTER)
            await driver.findElement(By.name("id_detail_tugas")).sendKeys(jobDescriptions[randomFromArray(jobDescriptions)])
            await driver.findElement(By.name("ket_aktivitas")).sendKeys(activities, Key.TAB,
                randomnumber, Key.TAB,
                metric, Key.TAB,
                shiftTime.siang, Key.TAB,
                shiftTime.malam, Key.TAB)
            await driver.findElement(By.css('button[type="submit"]')).click();
            await driver.sleep(2000)
            break;
          case 'm' :
            console.log('dinas malam' + ' ' + formatDate[i])
            dateInput.sendKeys(Key.DELETE)
            dateInput.sendKeys(formatDate[i], Key.ENTER)
            await driver.findElement(By.name("id_detail_tugas")).sendKeys(jobDescriptions[randomFromArray(jobDescriptions)])
            await driver.findElement(By.name("ket_aktivitas")).sendKeys(activities, Key.TAB, randomnumber, Key.TAB,
                metric, Key.TAB, shiftTime.malam3, Key.TAB, shiftTime.pagi)
            await driver.findElement(By.css('button[type="submit"]')).click();
            await driver.sleep(5000)

            //repating for next day

            await driver.get(dashboard)
            await driver.findElement(By.name('button')).click()
            await driver.sleep(2000)
            dateInput.sendKeys(Key.DELETE)
            dateInput.sendKeys(formatDate[i], Key.ENTER)
            await driver.findElement(By.name("id_detail_tugas")).sendKeys(jobDescriptions[randomFromArray(jobDescriptions)])
            await driver.findElement(By.name("ket_aktivitas")).sendKeys(activities, Key.TAB,
                randomnumber, Key.TAB,
                metric, Key.TAB,
                shiftTime.malam3, Key.TAB,
                shiftTime.pagi, Key.TAB)
            await driver.findElement(By.css('button[type="submit"]')).click();
            await driver.sleep(2000)
            break;
          default :
            console.log('Libur Dinas')
        }
      }
    }
    await driver.sleep(5000)
  } finally {
    await driver.quit();
  }
}
selenium(login, nip, pass, dashboard, fillFormatDate, bulan, editShift, shift)



module.exports = selenium;
