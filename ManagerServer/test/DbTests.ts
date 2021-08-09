import {UserCredentialsDBAccess} from '../src/authorization/UserCredentialsDBAccess';
import {UsersDBAccess} from '../src/user/UsersDBAccess';

class DbTests {
    public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    public usersDBAccess: UsersDBAccess = new UsersDBAccess();
}

new DbTests().dbAccess.putUserCredential({
    username: 'user1',
    password: 'password',
    accessRights: [0, 1, 2, 3],
});

new DbTests().usersDBAccess.putUser({
    age: 30,
    email: 'test@test.com',
    id: 'asdfafa',
    name: 'jhon doe',
    workingPosition: 3,
});
