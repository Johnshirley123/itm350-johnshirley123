const UserService = require('./UserService');
const UserRepository = require('./UserRepository');

describe('UserService', () => {
    let userService;
    let userRepositoryMock;

    beforeEach(() => {
        userRepositoryMock = {
            getUserById: jest.fn(),
        };

        userService = new UserService(userRepositoryMock);
    });

    test('should return user when user exists', () => {
        const mockUser = { id: 1, name: 'Alice' };
        userRepositoryMock.getUserById.mockReturnValue(mockUser);

        const result = userService.getUser(1);
        expect(result).toEqual(mockUser);
        expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(1);
    });

    test('should throw an error when user does not exist', () => {
        userRepositoryMock.getUserById.mockReturnValue(null);

        expect(() => {
            userService.getUser(2);
        }).toThrow('User not found');
        expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(2);
    });
});