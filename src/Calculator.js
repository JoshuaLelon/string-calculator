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
        let userInputSplit = null;
        if (userInput.startsWith('//')) {
            const delimiter = userInput[2];
            const userInputSliced = userInput.slice(3, userInput.length);
            userInputSplit = userInputSliced
                .split(delimiter)
                .filter(element => element !== undefined);
        } else {
            const re = /(\\n)|(,)/g;
            userInputSplit = userInput
                .split(re)
                .filter(element => element !== undefined);
        }
        let negatives = [];
        const tokenizedInput = userInputSplit.map(element => {
            element.trim();
            if (isNaN(element) || element === '' || element > 1000) {
                element = 0;
            } else if (element < 0) {
                negatives.push(element);
            } else {
                element = +element;
            }
            return element;
        });
        if (negatives.length > 0) {
            this.setState({
                calculationResult: 'Negatives are not allowed!',
            });
            throw new Error(
                'Negatives are not allowed in the calculation! negatives: ' +
                    negatives,
            );
        } else {
            this.setState({
                calculationResult: tokenizedInput.reduce((a, b) => a + b),
            });
        }
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
