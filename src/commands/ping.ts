export default function () {
  let time = process.uptime();
  let uptime = tohhmmss(time);

  return uptime;
}
const tohhmmss = (sec_num: number) => {
  let hours = Math.floor(sec_num / 3600).toString();
  let minutes = Math.floor((sec_num - Number(hours) * 3600) / 60).toString();
  let seconds = (sec_num - Number(hours) * 3600 - Number(minutes) * 60).toString();

  if (+hours < 10) {
    hours = '0' + hours;
  }
  if (+minutes < 10) {
    minutes = '0' + minutes;
  }
  if (+seconds < 10) {
    seconds = '0' + seconds;
  }
  let time = hours + ':' + minutes + ':' + seconds.substr(0, 2);
  return time;
};
