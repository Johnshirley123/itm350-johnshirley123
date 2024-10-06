const NumberEvaluator = require('./NumberEvaluator');

describe('NumberEvaluator', () => {
    let evaluator;

    beforeEach(() => {
        evaluator = new NumberEvaluator();
    });

    test('should classify a positive number', () => {
        const result = evaluator.evaluate(5);
        expect(result).toBe('positive');
    });

    test('should classify a negative number', () => {
        const result = evaluator.evaluate(-3);
        expect(result).toBe('negative');
    });

    test('should classify zero', () => {
        const result = evaluator.evaluate(0);
        expect(result).toBe('zero');
    });
});