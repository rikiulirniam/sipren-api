
export const getHariWIB = () => {
  const now = new Date();
  const hariArray = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
  return hariArray[now.getDay()];
};


export const getWaktuWIB = () => {
    const now = new Date();
    const jam = String(now.getHours()).padStart(2, '0');
    const menit = String(now.getMinutes()).padStart(2, '0');
    const detik = String(now.getSeconds()).padStart(2, '0');

    return `${jam}:${menit}:${detik}`;
}