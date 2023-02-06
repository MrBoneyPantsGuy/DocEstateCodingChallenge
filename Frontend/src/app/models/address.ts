export interface Address {
  /** The street the Property is located at */
  street: string;

  /** The streets number the Property is located at */
  number: string;

  /** The city the Property is located in */
  city: string;

  /** The cities state the Property is located in */
  state: string;

  /** The Properties Zip-Code inside its city */
  zipCode: string;
}
