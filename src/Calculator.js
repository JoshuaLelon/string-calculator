import React from 'react';

class Calculator extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            calculationResult: '',
        };
    }

    hasNoNegatives = function(numbersArray) {
        let negatives = numbersArray.filter(element => element < 0);
        if (negatives.length > 0) {
            this.setState({
                calculationResult: 'Negatives are not allowed!',
            });
            throw new Error(
                'Negatives are not allowed in the calculation! negatives: ' +
                    negatives,
            );
        }
        return negatives.length === 0;
    };

    convertStringArrToNumbersArr = function(numbersArr) {
        return numbersArr.map(element => {
            element.trim();
            if (isNaN(element) || element === '' || element > 1000) {
                element = 0;
            } else {
                element = +element;
            }
            return element;
        });
    };

    getNumberAsStrings = function(userInputString) {
        let userInputSplit = null;
        if (userInputString.startsWith('//')) {
            const re = /\[(.*?)\]/g;
            const matches = userInputString.match(re);
            let beginDelimiterIndex = null;
            let endDelimiterIndex = null;
            let delimiter = null;
            let userInputSliced = null;
            let beginNumbersIndex = null;
            if (!matches) {
                // case 6
                beginDelimiterIndex = 2;
                endDelimiterIndex = 3;
                delimiter = userInputString.slice(
                    beginDelimiterIndex,
                    endDelimiterIndex,
                );
                beginNumbersIndex = endDelimiterIndex;
            } else if (matches.length === 1) {
                // case 7
                beginDelimiterIndex = 3;
                endDelimiterIndex = userInputString.indexOf(']'); // assumes delimiter will never be ], yikes!
                delimiter = userInputString.slice(
                    beginDelimiterIndex,
                    endDelimiterIndex,
                );
                beginNumbersIndex = endDelimiterIndex + 1;
            } else {
                // case 8
            }
            userInputSliced = userInputString.slice(
                beginNumbersIndex,
                userInputString.length,
            );
            userInputSplit = userInputSliced
                .split(delimiter)
                .filter(element => element !== undefined);
        } else {
            const re = /(\\n)|(,)/g;
            userInputSplit = userInputString
                .split(re)
                .filter(element => element !== undefined);
        }
        return userInputSplit;
    };

    onCalculateButtonClick = function() {
        const userInput = this.state.inputValue;
        const userInputSplit = this.getNumberAsStrings(userInput);
        const numbersList = this.convertStringArrToNumbersArr(userInputSplit);
        if (this.hasNoNegatives(numbersList)) {
            this.setState({
                calculationResult: numbersList.reduce((a, b) => a + b),
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
