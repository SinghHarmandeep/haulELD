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
    (hr > 9) ? hour = "" + hr : hour = '0' + hr;
    let min = moment.duration(time).minutes();
    (min > 9) ? minute = "" + min : minute = '0' + min;
    let sec = moment.duration(time).seconds();
    (sec > 9) ? second = "" + sec : second = "0" + sec;
    display = " " + hour + ":" + minute + ":" + second;
  }
  return (
    <>{(time === 0) ? " " + 0 : display}</ >
  )
}

export default Time;