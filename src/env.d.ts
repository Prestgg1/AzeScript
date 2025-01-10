declare namespace App {
  interface Locals {
    user: {
      id: number;
      name: string;
      surname: string;
      email: string;
      confirmed: boolean;
      perm: boolean;
      password: string;
    };
  }
}
