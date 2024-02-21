import { UserRole } from '../constatnts/userRole.enum';

export default (roles: UserRole[], userRole: UserRole): boolean => {
  for (const role of roles) {
    if (role === userRole) {
      return true;
    }
  }

  return false;
};
