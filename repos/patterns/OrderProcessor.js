const Order = require('./Order');
const Step = require('./Step');

class OrderProcessor {
    constructor() {
        this.steps = [];
    }

    addStep(step) {
        this.steps.push(step);
    }

    process(order) {
        this.steps.forEach(step => step.execute(order));
    }
}

module.exports = OrderProcessor;