import * as React from 'react';
import * as moment from 'moment';

const day = (props: any) => {
  return (
    <h1 className='col'>
      {moment(props.time).format('ddd, MMM Do')}
    </h1 >
  )
}

export default day;