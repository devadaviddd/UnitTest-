# Use Case

- As a user, I can sign up with email & password.

## Acceptance Criteria

1. Email should be valid

- If the value doesn't have '@', we should throw an error BadRequestException

2. Password:

- At least 8 characters
- At least one number
- At least one special character

3. Only existed one user account

- If user has already signed up, we should throw an error BadRequestException

4. Email & Password are required properties

## Notes:

- Use suggestion password & email regex in code
- Expect the function mockUserRepository should be called
