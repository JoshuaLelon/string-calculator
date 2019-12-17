import React from 'react';

import Calculator from './Calculator';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Simple Addition Calculator</h1>
            <p>
                Simply type two numbers separated by a comma (e.g. 4, 5), press
                enter, and the result will show below the input box.
            </p>
            <Calculator />
        </div>
    );
}

export default App;
