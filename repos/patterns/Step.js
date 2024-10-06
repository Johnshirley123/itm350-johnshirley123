class Step {
    constructor(name, action) {
        this.name = name;
        this.action = action; 
    }

    execute(order) {
        this.action(order);
    }
}

module.exports = Step;