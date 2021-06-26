import moment from 'moment';

const getTime = (time: string) => {

  let d = moment.duration(time).days();
  let h = moment.duration(time).hours();
  let m = moment.duration(time).minutes();
  let s = moment.duration(time).seconds();

  return (24 * d) + h + (m / 60) + (s / 3600);
}

const calcPay = (time: string) => {
  let Time: number = getTime(time);
  if (Time > 40) {
    return (40 * 22) + ((Time - 40) * 33)
  } else {
    return (Time * 22);
  }
}
export { getTime, calcPay };