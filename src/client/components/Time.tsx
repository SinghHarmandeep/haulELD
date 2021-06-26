import * as React from 'react';
import moment from 'moment';

const Time = (props: any) => {
  let time = props.time;
  let display: string;
  if (time === 86400000) {
    display = ' 24 hrs'
  } else {
    let hour: string;
    let minute: string;
    let second: string;
    let hr = moment.duration(time).hours();
    let min = moment.duration(time).minutes();
    let sec = moment.duration(time).seconds();
    (hr > 9) ? hour = "" + hr : hour = '0' + hr;
    (min > 9) ? minute = "" + min : minute = '0' + min;
    (sec > 9) ? second = "" + sec : second = "0" + sec;
    display = " " + hour + ":" + minute + ":" + second;
  }
  return (
    <>{(time === 0) ? " " + 0 : display}</ >
  )
}
export default Time;