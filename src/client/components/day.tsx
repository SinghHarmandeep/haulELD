import * as React from 'react';
import * as moment from 'moment';

import Shift from './shift';

const day = (props: any) => {
  return (
    < div className="row mx-1 my-2 card-header" >
      <h1 className='col'>
        {moment(props.time).format('ddd, MMM Do')}
      </h1 >
      {
        (props.on === 0) ?
          <div className="mr-2" >No activity today!</div> :
          <Shift on={props.on}
            off={props.off} />
      }
    </div>
  )
}

export default day;