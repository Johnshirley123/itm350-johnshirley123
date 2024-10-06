const Counter = require('./Counter');

describe('Counter', () => {
    let counter;

    beforeEach(() => {
        counter = new Counter();
    });

    test('should increment the value correctly under stress', async () => {
        const incrementCount = 100000; 
        const incrementPromises = [];

        for (let i = 0; i < incrementCount; i++) {
            incrementPromises.push(new Promise((resolve) => {
                counter.increment();
                resolve();
            }));
        }

        await Promise.all(incrementPromises);

        expect(counter.getValue()).toBe(incrementCount);
    });
});