export const validation_messages = {
    username: [
        { type: 'required', message: 'Username is required' },
        { type: 'pattern', message: 'Username must contain at least 4 characters' }
    ],
    password: [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'Password must contain at least 4 characters' }
    ],
    confirmPassword: [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'Password must contain at least 4 characters' },
        { type: 'notMatch', message: "Passwords don't match" }
    ]
}