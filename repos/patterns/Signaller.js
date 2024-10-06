class Signaller {
    constructor() {
        this.listeners = {};
    }

    on(signal, callback) {
        if (!this.listeners[signal]) {
            this.listeners[signal] = [];
        }
        this.listeners[signal].push(callback);
    }

    emit(signal, data) {
        if (this.listeners[signal]) {
            this.listeners[signal].forEach(callback => callback(data));
        }
    }
}

module.exports = Signaller;