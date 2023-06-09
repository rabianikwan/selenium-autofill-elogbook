let namaKegiatan = [];
let uraianTugas = [
    'Melakukan pengkajian keperawatan dasar pada individu',
    'Melakukan komunikasi terapeutik dalam pemberian asuhan keperawatan',
    'Memberikan oksigenasi sederhana',
    'Melakukan intervensi keperawatan spesifik yang sederhana pada area medikal bedah',
    'Melakukan dokumentasi tindakan keperawatan',
    'Melakukan perawatan luka',
    'Melakukan tindakan keperawatan dalam kondisi gawat darurat / bencana / kritikal'
]
const randomNumber = Math.trunc(Math.random() * 10) + 5;
const inputJam = {
    pgDtg : '07.30',
    pgPlg : '14:30',
    srPlg : '21:30',
    mlmDtg : '23:55',
}
const reformat = (d) => {
    d < 10 ? d = "0" + d :
    d
}

const loginurl = 'http://36.66.236.83/elogbook-samarinda/index.php'
const inputurl = 'http://36.66.236.83/elogbook-samarinda/index.php/aktivitas'