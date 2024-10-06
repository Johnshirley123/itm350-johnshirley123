const Order = require('./Order');
const Step = require('./Step');
const OrderProcessor = require('./OrderProcessor');

describe('Order', () => {
    test('should initialize with a Pending status', () => {
        const order = new Order(100);
        expect(order.getDetails().status).toBe('Pending');
    });

    test('should update the order status', () => {
        const order = new Order(100);
        order.updateStatus('Processed');
        expect(order.getDetails().status).toBe('Processed');
    });
});

describe('Step', () => {
    test('should execute the action for the step', () => {
        const order = new Order(100);
        const actionMock = jest.fn();

        const step = new Step('Test Step', actionMock);
        step.execute(order);

        expect(actionMock).toHaveBeenCalledWith(order);
    });
});

describe('OrderProcessor', () => {
    let orderProcessor;

    beforeEach(() => {
        orderProcessor = new OrderProcessor();
    });

    test('should process an order through the sequence of steps', () => {
        const order = new Order(100);
        const validateStep = new Step('Validate Order', (o) => {
            o.updateStatus('Validated');
        });
        const paymentStep = new Step('Process Payment', (o) => {
            o.updateStatus('Payment Processed');
        });
        const shippingStep = new Step('Ship Order', (o) => {
            o.updateStatus('Shipped');
        });

        orderProcessor.addStep(validateStep);
        orderProcessor.addStep(paymentStep);
        orderProcessor.addStep(shippingStep);
        orderProcessor.process(order);

        expect(order.getDetails().status).toBe('Shipped');
    });

    test('should throw an error if validation fails', () => {
        const order = new Order(-50); // Invalid order amount
        const validateStep = new Step('Validate Order', (o) => {
            if (o.amount <= 0) {
                throw new Error('Invalid order amount');
            }
        });

        orderProcessor.addStep(validateStep);

        expect(() => {
            orderProcessor.process(order);
        }).toThrow('Invalid order amount');
    });
});