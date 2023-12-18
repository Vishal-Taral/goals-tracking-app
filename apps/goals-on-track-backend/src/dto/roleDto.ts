import { Role } from "../entities/role";

class RoleDto {
  roleId: string;
  name: string;
  description: string;

  constructor(role: Role) {
    (this.roleId = role.roleId),
      (this.name = role.name),
      (this.description = role.description);
  }
  public static toDto(roles: Role[]) {
    const listOfroles = roles.map((role) => {
      return new RoleDto(role);
    });
    return listOfroles;
  }
}

export { RoleDto };
