class Counter {
    constructor() {
        this.value = 0;
    }

    increment() {
        this.value += 1;
    }

    getValue() {
        return this.value;
    }
}

module.exports = Counter;