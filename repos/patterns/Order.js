class Order {
    constructor(amount) {
        this.amount = amount;
        this.status = 'Pending';
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    getDetails() {
        return {
            amount: this.amount,
            status: this.status,
        };
    }
}

module.exports = Order;