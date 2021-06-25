import * as React from 'react';

import Time from './Time';

const Shift = (props: any) => {
  return (
    <div>
      <p className="mr-2">Work Time: <Time time={props.on} /></p>
      <p className="mr-2">Break Time: <Time time={props.off} /> </p>
    </div >
  )
}

export default Shift;