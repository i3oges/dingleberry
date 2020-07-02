export default function () {
  let now = new Date();
  let time = process.uptime();
  let uptime = time + now.toTimeString();
  console.log(`pinged`);

  return uptime;
}
