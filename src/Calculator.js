import React from 'react';

class Calculator extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            calculationResult: '',
        };
    }
    onCalculateButtonClick = function() {
        const userInput = this.state.inputValue;
        const tokenizedInput = userInput.split(',').map(element => {
            element.trim();
            if (isNaN(element) || element === '') {
                element = 0;
            } else {
                element = +element;
            }
            return element;
        });
        this.setState({
            calculationResult: tokenizedInput.reduce((a, b) => a + b),
        });
    };
    render() {
        return (
            <div className="Calculator">
                <span style={{ whiteSpace: 'nowrap' }}>
                    <div
                        className="ui input"
                        style={{ display: 'inline-block' }}
                    >
                        <input
                            id="userInput"
                            type="text"
                            placeholder="Enter 2 numbers"
                            onChange={e =>
                                this.setState({ inputValue: e.target.value })
                            }
                        />
                    </div>
                    <div
                        style={{ margin: '2px', display: 'inline-block' }}
                    ></div>
                    <button
                        id="calculateButton"
                        className="ui button"
                        style={{ display: 'inline-block' }}
                        onClick={e => this.onCalculateButtonClick(e)}
                    >
                        Calculate
                    </button>
                </span>
                <h2 id="calculationResult">{this.state.calculationResult}</h2>
            </div>
        );
    }
}

export default Calculator;
