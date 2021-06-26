import * as React from 'react';

import { getTime } from '../utils/getTime';

const pay = (props: any) =>
  <p className='text-success mr-2'>{`$` + (getTime(props.time) * 22).toFixed(2)}</p >

export default pay;