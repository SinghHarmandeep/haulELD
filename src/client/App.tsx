import * as React from 'react';
import moment from 'moment';

import { getTime } from './utils/getTime';

import Shift from './components/shift';
import Day from './components/day';
import Pay from './components/pay';

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      data: null,
      pagination: null,
    }
  }

  async componentDidMount() {
    let res = await fetch('/data')
    let data = await res.json();
    this.setState({ data: data.data, pagination: data.pagination })
  }

  render() {
    let payWeek = new Array();
    let lastSeven = new Array();
    let weekHrs: number = 0;
    let Days: any;
    let hours: string;
    let temp: number = 0;
    if (this.state.data) {
      Days = this.state.data.map((ele: any, key: number) => {
        console.log(key + 1);
        if (lastSeven.length > 7) {
          console.log('length is greater');
          console.log(lastSeven);
          lastSeven.pop();
          console.log(lastSeven);

        } else {
          console.log('length is smaller');
        }
        lastSeven.unshift(ele.dutyStatusDurations.activeDurationMs)
        console.log(lastSeven.join(", "));

        temp = 0;
        lastSeven.forEach(e => {
          temp += e;
        })
        hours = getTime(''+ temp).toFixed(2);
        console.log(hours);

        payWeek.push(ele.dutyStatusDurations.activeDurationMs);
        let summary: any;
        let isSat: string = '';
        if (moment(ele.startTime).format('ddd') === 'Sat') {
          isSat = 'shadow';
          payWeek.forEach(e => {
            // let time = getTime(e);
            weekHrs += e;
          })
          payWeek = [];
          let pay = 0;
          weekHrs = getTime(weekHrs + '')
          if (weekHrs > 40) { pay = (40 * 22) + ((weekHrs - 40) * 33) }
          pay = weekHrs * 22;
          summary = <div className='col border-top border-bottom border-danger bg-light'>Week Summary
            <div>Hours: {weekHrs.toFixed(2)}hrs</div>
            <div>Pay: ${pay.toFixed(2)}</div>
          </div>
          weekHrs = 0;
        }

        return <div className={`border rounded my-2 ${isSat}`} key={key} >
          {isSat = ''}
          {key + 1}
          < div className="row mx-1 my-2" >
            <Day time={ele.startTime} />
            {
              (ele.dutyStatusDurations.activeDurationMs === 0) ?
                <div className="mr-2" >No activity today!</div> :
                <Shift on={ele.dutyStatusDurations.activeDurationMs}
                  off={ele.dutyStatusDurations.offDutyDurationMs} />
            }
          </div >
          {(ele.dutyStatusDurations.activeDurationMs === 0) ?
            <></>
            :
            <div className="row mx-1 my-1">
              <div className='col'>
                <p >From: {moment(ele.startTime).format('h:mm:ss a')}</p>
                <p >To: {moment(ele.endTime).format('ddd, MMM-D h:mm:ss a')}</p>
              </div>
              <h1>
                <Pay time={ele.dutyStatusDurations.activeDurationMs} total={weekHrs} />
              </h1>
            </div>
          }
          {summary}
          <div className="row mx-1 mt-2">
            <p className='ml-2'>Hours worked past 7 days: &nbsp;</p>
            {hours}
          </div>
        </div >
      })
    }

    return (
      <div className='container'>
        <div>{Days}</div>
      </div >
    )
  }
}

export interface IAppState {
  data: any
  pagination: any
}
export interface IAppProps {
}

export default App;