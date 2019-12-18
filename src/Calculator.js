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

    getStringWithoutDelimiters = function(userInputString, matches) {
        let beginNumbersIndex = null;
        if (!matches) {
            // requirement 6
            beginNumbersIndex = 3;
        } else if (matches.length === 1) {
            // requirement 7
            beginNumbersIndex = userInputString.indexOf(']') + 1; // assumes delimiter will never be ], yikes!
        } else {
            // requirement 8
            beginNumbersIndex = userInputString.lastIndexOf(']') + 1;
        }
        return userInputString.slice(beginNumbersIndex, userInputString.length);
    };

    getProperDelimiter = function(userInputString, matches) {
        let delimiter = null;
        if (!matches) {
            // requirement 6
            delimiter = userInputString.slice(2, 3); // the single char delimiter is at index 2
        } else if (matches.length === 1) {
            // requirement 7
            delimiter = userInputString.slice(3, userInputString.indexOf(']')); // assumes delimiter will never be ], yikes!
        } else {
            // requirement 8
            // what we want to do here is find a regex that finds all instances
            // of everything in the matches list: ['r9r', '*', '!!']
            // (might require extra difficulty since * is a special character in regex)
            // then, the test case for requirement 8 will work.

            // below is an idea I have that could work: take all the delimiters found
            // in matches and make a custom regex out of them.
            // need to learn more regex and solve the * special character problem though
            delimiter = new RegExp(
                matches.map(e => '(' + e + ')').join('|') + '+',
                'g',
            );
        }
        return delimiter;
    };

    getNumberAsStrings = function(userInputString) {
        let delimiter = /(\\n)|(,)/g;
        const re = /\[(.*?)\]/g; // this regex finds all delimiters in brackets []
        const matches = userInputString.match(re);
        let stringToSplit = userInputString;
        if (userInputString.startsWith('//')) {
            // this if block supports custom delimiter formats
            stringToSplit = this.getStringWithoutDelimiters(
                userInputString,
                matches,
            );
            delimiter = this.getProperDelimiter(userInputString, matches);
        }
        return stringToSplit
            .split(delimiter)
            .filter(element => element !== undefined);
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
