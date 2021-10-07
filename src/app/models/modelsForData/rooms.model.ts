export interface Room {
  USER_ADMIN: UserAdmin;
  USER_GUEST: User[]
  ID: number;
}

export interface User {
  ID: string;
  PSEUDO: string;
}

export interface UserAdmin extends User {
  TOKEN: string;
  REFRESH_TOKEN: string;
}