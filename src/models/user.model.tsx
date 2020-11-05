/* eslint-disable prettier/prettier */
import { Icon } from './icon.model';

/**
 * User Model
 */
export class User {
  id?: number;
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  avatar?: Icon;
}

