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
function editShift(shift) {
  return shift.split('')
}
function randomFromArray(array) {
  return Math.round(Math.random() * (array.length + 1))
}

async function selenium() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(login);
    await driver.findElement(By.name('username')).sendKeys(nip, Key.TAB, pass, Key.ENTER);
    await driver.sleep(5000)
    const arrayShift = await editShift(shift)
    for (let i = 0; i < arrayShift.length; i++) {
      await driver.get(dashboard)
      await driver.findElement(By.name('button')).click()
      switch (arrayShift[i]) {
        case 'p' :
          console.log('dinas pagi')
          await driver.findElement(By.name("tgl_aktivitas"), 1000).sendKeys("01-05-2023")
          await driver.sleep(10000)
          break;
        case 's' :
          console.log('dinas sore')
          break;
        case 'm' :
          console.log('dinas malam')
          break;
        default :
          console.log('Libur Dinas')
      }
    }
    await driver.sleep(5000)
  } finally {
    await driver.quit();
  }
}
selenium().then(() => console.log('selenium webdriver sedang berjalan'))

module.exports = selenium;
