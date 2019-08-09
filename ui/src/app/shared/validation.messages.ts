export const validation_messages = {
    username: [
        { type: 'required', message: 'Username is required' },
        { type: 'pattern', message: 'Username must contain at least 6 characters' }
    ],
    password: [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'Password must contain at least 6 characters' }
    ]
}