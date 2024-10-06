const Calculator = require('./Calculator');

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    test('should add two numbers correctly', () => {
        const a = 3;
        const b = 5;
        const expected = 8;

        const result = calculator.add(a, b);
        expect(result).toBe(expected);
    });

    test('should subtract two numbers correctly', () => {
        const a = 10;
        const b = 4;
        const expected = 6;

        const result = calculator.subtract(a, b);
        expect(result).toBe(expected);
    });

    test('should multiply two numbers correctly', () => {
        const a = 7;
        const b = 6;
        const expected = 42;

        const result = calculator.multiply(a, b);
        expect(result).toBe(expected);
    });

    test('should divide two numbers correctly', () => {
        const a = 20;
        const b = 4;
        const expected = 5;

        const result = calculator.divide(a, b);
        expect(result).toBe(expected);
    });

    test('should throw error when dividing by zero', () => {
        const a = 10;
        const b = 0;

        expect(() => {
            calculator.divide(a, b);
        }).toThrow('Cannot divide by zero');
    });
});