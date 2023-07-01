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
function fillFormatDate(bulan) {
  for (let i = 1 ; i <=30; i++) {
    let array = [];
    formatDate.push(`${i}-${bulan}-2023`)
  }
}
function editShift(shift) {
  return shift.split('')
}
function randomFromArray(array) {
  return Math.round(Math.random() * (array.length + 1))
}

async function selenium() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  await fillFormatDate(bulan)
  try {
    await driver.get(login);
    await driver.findElement(By.name('username')).sendKeys(nip, Key.TAB, pass, Key.ENTER);
    await driver.sleep(5000)
    // key of looping
    const arrayShift = await editShift(shift)

    for (let i = 0; i < arrayShift.length; i++) {
      if (arrayShift[i] !== "l" &&  arrayShift[i] !== "p" && arrayShift[i] !== "s") {
        //login to dasboard for inserting value
        await driver.get(dashboard)
        await driver.findElement(By.name('button')).click()
        await driver.sleep(2000)
        //storing element for input
        const dateInput = await driver.findElement(By.name("tgl_aktivitas"), 3000)
        let randomnumber = Math.ceil(Math.random() * 20) + 10;

        switch (arrayShift[i]) {
          case 'p' :
            console.log('dinas pagi')
            await driver.findElement(By.name("tgl_aktivitas"), 1000).sendKeys(Key.DELETE)
            await driver.findElement(By.name("tgl_aktivitas"), 1000).sendKeys(formatDate[i], Key.ENTER, Key.TAB, jobDescriptions[randomFromArray(jobDescriptions)], Key.TAB,
                activities, Key.TAB,
                randomnumber, Key.TAB,
                metric, Key.TAB,
                shiftTime.pagi, Key.TAB,
                shiftTime.siang, Key.TAB)
            await driver.findElement(By.css('button[type="submit"]')).click();
            await driver.sleep(2000)
            break;
          case 's' :
            await dateInput.sendKeys(Key.DELETE)
            await dateInput.sendKeys(formatDate[i], Key.ENTER, Key.TAB, jobDescriptions[randomFromArray(jobDescriptions)], Key.TAB,
                activities, Key.TAB,
                randomnumber, Key.TAB,
                metric, Key.TAB,
                shiftTime.siang, Key.TAB,
                shiftTime.malam, Key.TAB)
            await driver.findElement(By.css('button[type="submit"]')).click();
            await driver.sleep(2000)
            console.log('dinas sore')
            break;
          case 'm' :
            await dateInput.sendKeys(Key.DELETE)
            await dateInput.sendKeys(formatDate[i+1].toString(), Key.ENTER, Key.TAB, jobDescriptions[randomFromArray(jobDescriptions)], Key.TAB, activities, Key.TAB, randomnumber, Key.TAB, metric, Key.TAB, shiftTime.malam3, Key.TAB, shiftTime.pagi)
            await driver.sleep(1000)
            await driver.findElement(By.css('button[type="submit"]')).click();
            await driver.sleep(2000)

            //repating for next day
            // await driver.switchTo().newWindow('tab');
            // await driver.get(dashboard)
            // await driver.findElement(By.name('button')).click()
            // await driver.sleep(2000)
            // let nextDay = await formatDate[i+1]
              //inputing
            // await dateInput.sendKeys(Key.DELETE)
            // await dateInput.sendKeys(nextDay, Key.ENTER, Key.TAB, jobDescriptions[randomFromArray(jobDescriptions)], Key.TAB,
            //     activities, Key.TAB,
            //     randomnumber, Key.TAB,
            //     metric, Key.TAB,
            //     shiftTime.malam3, Key.TAB,
            //     shiftTime.pagi, Key.TAB)
            // await driver.sleep(1000)
            // await driver.findElement(By.css('button[type="submit"]')).click();
            console.log('dinas malam')
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
selenium().then(() => console.log('selenium telah selesai'))

module.exports = selenium;
