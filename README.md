# Locus Challenge - Role Based Auth

### Installation
You can clone this repo and run the following command:
```
npm i
npm run start
```

Dependencies
1. node (version >= 8.9.6)
2. postgres (version >= 9.3) [with citext extension]
3. npm (version >= 5.6.0)

#### Assumptions:
1. User will login with a specific role. Based on that role, his access level will be checked.
2. A JWT token will be generated when a user login. Sample payload
```{
  "user_id": "6342b02d-a187-4d6a-bd7b-5ba6f0a28aee",
  "email": "user@gmail.com",
  "roles": [
    {
      "role_id": 3,
      "role": "user"
    }
  ],
  "iat": 1534107349,
  "exp": 1534712149,
  "iss": "locus-auth"
}
```
3. To check whether a user has access to a resource with a specific action type, the role is taken from the token.
4. One cannot remove a role from user, if that user has only that role.

#### Seed Data
Roles
```
1. admin
2. moderator
3. user
```

Resources
```
1. user
2. payments
3. cases
```

Access levels - **read, write, delete**
1. Admin has access to every resource(read, write, delete)
2. Moderator has access to payments and cases(read, write, delete)
3. User has access to payments(read, write)

Admin User credentials:
```
email = admin@gmail.com
role = admin
password = admin@123
```

Normal user credentials
```
email = user@gmail.com
role = user
password = user@123
```