const Order = require('./Order');
const Step = require('./Step');
const OrderProcessor = require('./OrderProcessor');

const validateStep = new Step('Validate Order', (order) => {
    console.log('Validating order...');
    if (order.amount <= 0) {
        throw new Error('Invalid order amount');
    }
    order.updateStatus('Validated');
});

const paymentStep = new Step('Process Payment', (order) => {
    console.log('Processing payment...');
    order.updateStatus('Payment Processed');
});

const shippingStep = new Step('Ship Order', (order) => {
    console.log('Shipping order...');
    order.updateStatus('Shipped');
});

const orderProcessor = new OrderProcessor();
orderProcessor.addStep(validateStep);
orderProcessor.addStep(paymentStep);
orderProcessor.addStep(shippingStep);

// Process an order
const order = new Order(100);
orderProcessor.process(order);
console.log(order.getDetails()); 