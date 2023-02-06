import { Address } from './address';

export interface Property {

  /** The Properties internal ID from within MongoDB */
  id: string;

  /** A description/name of the property */
  description: string;

  /** Full address of the property */
  address: Address;
}
