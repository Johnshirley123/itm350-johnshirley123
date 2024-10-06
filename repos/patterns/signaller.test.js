const Signaller = require('./Signaller');

describe('Signaller', () => {
    let signaller;

    beforeEach(() => {
        signaller = new Signaller();
    });

    test('should register a listener for a signal', () => {
        const callback = jest.fn();
        signaller.on('testSignal', callback);

        signaller.emit('testSignal', 'data');

        expect(callback).toHaveBeenCalledWith('data');
    });

    test('should not call listeners for unregistered signals', () => {
        const callback = jest.fn();
        signaller.on('testSignal', callback);

        signaller.emit('otherSignal', 'data');

        expect(callback).not.toHaveBeenCalled();
    });

    test('should support multiple listeners for the same signal', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        signaller.on('testSignal', callback1);
        signaller.on('testSignal', callback2);

        signaller.emit('testSignal', 'data');

        expect(callback1).toHaveBeenCalledWith('data');
        expect(callback2).toHaveBeenCalledWith('data');
    });
});