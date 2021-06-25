import * as React from 'react';
import * as moment from 'moment';

import Shift from './components/shift';
import Day from './components/day';
import Time from './components/Time';

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      data: null,
      pagination: null
    }
  }

  async componentDidMount() {
    let res = await fetch('/data')
    let data = await res.json();
    this.setState({ data: data.data, pagination: data.pagination })

  }
  render() {
    return (

      <div >
        <h1>driver info</h1>
        {
          (this.state.data) ?
            <div className='container'>
              <h1 >{this.state.data[0].driver.name + ': ' + moment(this.state.data[0].startTime).format('YYYY')} </h1>
              {this.state.data.map((ele: any, key: number) =>
                <div className='border rounded my-2' key={key}>
                  <div className='row mx-1 my-2'>
                    <Day time={ele.startTime} />
                    {(ele.dutyStatusDurations.activeDurationMs === 0) ?
                      <div className="mr-2" >No activity today!</div> :
                      <Shift on={ele.dutyStatusDurations.activeDurationMs} off={ele.dutyStatusDurations.offDutyDurationMs} />
                    }
                  </div>
                  {(ele.dutyStatusDurations.activeDurationMs === 0) ?
                    <></>
                    :
                    <div className="row mx-1 my-1">
                      <div className='col'>
                        <p >From: {moment(ele.startTime).format('h:mm:ss a')}</p>
                        <p >To: {moment(ele.endTime).format('ddd, MMM-D h:mm:ss a')}</p>
                      </div>
                      <h1 className="mr-2 text-right">{}</h1>
                    </div>
                  }
                </div>
              )
              }
            </div>
            :
            <div></div>
        }
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