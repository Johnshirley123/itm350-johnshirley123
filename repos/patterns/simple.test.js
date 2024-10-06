function registerUser(username, email, password) {
    if (!username || !email || !password) {
        throw new Error("All fields are required");
    }
    if (!email.includes("@")) {
        throw new Error("Invalid email format");
    }
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    return { username, email, password };
}


describe('User Registration', () => {
    test('should register user successfully with valid input', () => {
        const username = "testuser";
        const email = "test@example.com";
        const password = "password123";

        const result = registerUser(username, email, password);

        expect(result.username).toBe(username);
        expect(result.email).toBe(email);
    });

    test('should throw error when fields are missing', () => {
        expect(() => registerUser("", "test@example.com", "password123"))
            .toThrow("All fields are required");
    });

    test('should throw error for invalid email format', () => {
        expect(() => registerUser("testuser", "invalidemail", "password123"))
            .toThrow("Invalid email format");
    });

    test('should throw error for short password', () => {
        expect(() => registerUser("testuser", "test@example.com", "123"))
            .toThrow("Password must be at least 6 characters long");
    });
});
