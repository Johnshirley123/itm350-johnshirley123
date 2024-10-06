function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

describe('Performance Tests', () => {
    test('Fibonacci performance for n=30', () => {
        const startTime = performance.now();

        const result = fibonacci(30);

        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`Fibonacci(30) = ${result}`);
        console.log(`Execution time: ${duration} ms`);

        expect(result).toBe(832040);
        
        expect(duration).toBeLessThan(2000);
    });

    test('Fibonacci performance for n=35', () => {
        const startTime = performance.now();

        const result = fibonacci(35);

        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`Fibonacci(35) = ${result}`);
        console.log(`Execution time: ${duration} ms`);

        expect(result).toBe(9227465);
        expect(duration).toBeLessThan(5000); 
    });
});
