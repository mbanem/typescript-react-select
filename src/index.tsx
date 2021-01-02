import './Styles/index.scss';

import * as React from 'react';

import { App } from './Components/App';
import data from './Models/data.json';
import { render } from 'react-dom';

render(<App {...data} />, document.getElementById('root'));
