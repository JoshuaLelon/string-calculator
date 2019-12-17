import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Calculator from '../Calculator';

/// examples: 20 will return 20; 1,5000 will return 5001; 4,-3 will return 1

test('more than 2 numbers yields exception', () => {
    const { getByRole } = render(<Calculator />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '1,5000,2' } });
    fireEvent.click(getByRole('button'));
    console.log(inputElement.innerHTML);
    const outputElement = getByRole('heading');
    expect(outputElement.innerHTML).toBe('Only enter 2 numbers or less.');
});

test('adds 2 numbers', () => {
    const { getByRole } = render(<Calculator />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '1,5000' } });
    fireEvent.click(getByRole('button'));
    console.log(inputElement.innerHTML);
    const outputElement = getByRole('heading');
    expect(outputElement.innerHTML).toBe('5001');
});

test('add 1 number returns same number', () => {
    const { getByRole } = render(<Calculator />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '20' } });
    fireEvent.click(getByRole('button'));
    console.log(inputElement.innerHTML);
    const outputElement = getByRole('heading');
    expect(outputElement.innerHTML).toBe('20');
});

test('adds 2 numbers, one negative', () => {
    const { getByRole } = render(<Calculator />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '4,-3' } });
    fireEvent.click(getByRole('button'));
    console.log(inputElement.innerHTML);
    const outputElement = getByRole('heading');
    expect(outputElement.innerHTML).toBe('1');
});

////////////////// empty input or missing numbers should be converted to 0

test('empty input returns 0', async () => {
    const { container } = render(<Calculator />);
    const inputElement = container.querySelector('#userInput');
    fireEvent.change(inputElement, { target: { value: '' } });
    await wait();
    fireEvent.click(container.querySelector('#calculateButton'));
    const outputElement = container.querySelector('#calculationResult');
    expect(outputElement.innerHTML).toBe('0');
});

test('multiple empty returns 0', () => {
    // debugger;
    const { container } = render(<Calculator />);
    const inputElement = container.querySelector('#userInput');
    fireEvent.change(inputElement, { target: { value: ',' } });
    fireEvent.click(container.querySelector('#calculateButton'));
    console.log(inputElement.innerHTML);
    const outputElement = container.querySelector('#calculationResult');
    expect(outputElement.innerHTML).toBe('0');
});

test('one empty returns other number, empty on left', () => {
    const { getByRole } = render(<Calculator />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: ',5' } });
    fireEvent.click(getByRole('button'));
    console.log(inputElement.innerHTML);
    const outputElement = getByRole('heading');
    expect(outputElement.innerHTML).toBe('5');
});

test('one empty returns other number, empty on right', () => {
    const { getByRole } = render(<Calculator />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '5,' } });
    fireEvent.click(getByRole('button'));
    console.log(inputElement.innerHTML);
    const outputElement = getByRole('heading');
    expect(outputElement.innerHTML).toBe('5');
});

/////////////// invalid numbers should be converted to 0 e.g. 5,tytyt will return 5

test('multiple invalid returns 0', () => {
    const { getByRole } = render(<Calculator />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'asdf,twet' } });
    fireEvent.click(getByRole('button'));
    console.log(inputElement.innerHTML);
    const outputElement = getByRole('heading');
    expect(outputElement.innerHTML).toBe('0');
});

test('one invalid returns other number, invalid on left', () => {
    const { getByRole } = render(<Calculator />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'awefawe,5' } });
    fireEvent.click(getByRole('button'));
    console.log(inputElement.innerHTML);
    const outputElement = getByRole('heading');
    expect(outputElement.innerHTML).toBe('5');
});

test('one invalid returns other number, invalid on right', () => {
    const { getByRole } = render(<Calculator />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '5,hadae' } });
    fireEvent.click(getByRole('button'));
    console.log(inputElement.innerHTML);
    const outputElement = getByRole('heading');
    expect(outputElement.innerHTML).toBe('5');
});
