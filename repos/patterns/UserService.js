class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    getUser(id) {
        const user = this.userRepository.getUserById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

module.exports = UserService;