import { User } from '../entities/user';
import { RoleDto } from './roleDto';

class UserDetailsDto {
  userId;
  firstName;
  lastName;
  email;
  gender;
  mobile_number;
  role;
  reportee;

  constructor(user) {
    (this.userId = user.userId),
      (this.firstName = user.firstName),
      (this.lastName = user.lastName),
      (this.email = user.email),
      (this.gender = user.gender),
      (this.mobile_number = user.mobile_number),
      (this.role = user.__role__ ? new RoleDto(user.__role__) : {});
    // (this.reportee = user.reportee)
  }
  public static toDto(user: User[]) {
    const listOfUser = user.map((person) => {
      return new UserDetailsDto(person);
    });
    return listOfUser;
  }
}

export { UserDetailsDto };
