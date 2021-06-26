import moment from 'moment';

const getTime = (time: string) => {
  let d = moment.duration(time).days();
  let h = moment.duration(time).hours();
  let m = moment.duration(time).minutes();
  let s = moment.duration(time).seconds();
  console.log(time);
  
  return (24 * d) + h + (m / 60) + (s / 3600);
}

export { getTime };