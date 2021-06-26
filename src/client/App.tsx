import * as React from 'react';
import moment from 'moment';

import { getTime, calcPay } from './utils/getTime';

// import moduleName from './components/Days';
import Day from './components/day';
import Pay from './components/pay';

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      data: null,
      pagination: null,
      pg: 1
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData(pg: number = 1) {
    let res = await fetch(`/data/${pg}`)
    let data = await res.json();
    this.setState({ data: data.data, pagination: data.pagination })
  }

  render() {
    let payWeek = new Array(); //to keep track of weekly gross pay
    let lastSeven = new Array(); // hours worked last seven days
    let weekHrs: number = 0; // hours worked in the week, resets every sunday
    let Days: any; // all the log days
    let hours: number; //sum of number of hours worked last 7 days
    let lawHour: string = "" //used to show warning, the driver excedded 80% of 70 hours
    let temp: number = 0; //temp variable to hold count for variable hours

    if (this.state.data) {
      Days = this.state.data.map((ele: any, key: number) => {

        if (lastSeven.length > 7) lastSeven.pop();

        lastSeven.unshift(ele.dutyStatusDurations.activeDurationMs)

        temp = 0; //added up hours for last seven days
        lastSeven.forEach(e => {
          temp += e;
        })

        hours = getTime('' + temp);
        if (hours > 56) {
          lawHour = 'border-danger'
        } else {
          lawHour = ''
        }

        payWeek.push(ele.dutyStatusDurations.activeDurationMs);
        let summary: any;
        let isSat: string = '';
        if (moment(ele.startTime).format('ddd') === 'Sat') {
          isSat = 'shadow border-success';

          payWeek.forEach(e => weekHrs += e)
          payWeek = [];

          let pay = calcPay(weekHrs + '');

          summary = <div className='col border-top border-bottom border-danger bg-light'>Week Summary
            <div>Total Hours: {getTime(weekHrs + '').toFixed(2)}hrs</div>
            <div>Total pay: $ <span className='text-success'> {pay.toFixed(2)}</span></div>
          </div>
          weekHrs = 0;
        }

        return <div className={`border rounded my-2 ${isSat + lawHour}`} key={key} >
          {isSat = ''}

          <Day time={ele.startTime}
            on={ele.dutyStatusDurations.activeDurationMs}
            off={ele.dutyStatusDurations.offDutyDurationMs} />

          {(ele.dutyStatusDurations.activeDurationMs === 0) ?
            <></>
            :
            <div className="row mx-1 my-1">
              <div className='col'>
                <p >From: {moment(ele.startTime).format('h:mm:ss a')}</p>
                <p >To: {moment(ele.endTime).format('ddd, MMM-D h:mm:ss a')}</p>
              </div>
              <h1>
                <Pay time={ele.dutyStatusDurations.activeDurationMs} />
              </h1>
            </div>
          }
          {summary}
          <div className={`row mx-1 mt-2`}>
            <p className={`ml-2`} >Hours worked past 7 days: &nbsp;</p>
            {hours.toFixed(2)}
          </div>
        </div >
      })
    }

    return (
      <div>
        <div className='container my-2'>
          <button className='btn btn-primary col-2' onClick={e => {
            if (this.state.pg > 1) {
              this.getData(this.state.pg - 1)
              this.setState({ pg: this.state.pg - 1 })
            }
          }
          }>{`< Last`}</button>
          <button className='btn btn-primary float-right col-2' onClick={e => {
            if (this.state.pg < 3) {
              this.getData(this.state.pg + 1)
              //setState is async
              this.setState({ pg: this.state.pg + 1 })
            }
          }}> {`Next >`}</button>

          {(this.state.data) ?
            <div className='row'>
              <h1 className='col my-2' >{this.state.data[0].driver.name}</h1>
              <p className='col-1 mt-3'>Page: {this.state.pg}</p>
            </div>
            : <></>}

          <div>{Days}</div>
        </div >
      </div>
    )
  }
}

export interface IAppState {
  data: any
  pagination: any
  pg: number
}
export interface IAppProps {
}

export default App;