import React from 'react';
import { Props } from './types';

import GoofyScheduler from '../../components/Scheduler';

const Home = (props: Props): JSX.Element => {
    return (
        <div>
            <GoofyScheduler />
        </div>
    );
}

export default Home;