export interface userDataType {
  public_id: string;
  User_Type: 1;
  full_name: string;
  email: string;
  country_code: number;
  phone_number: number;
  addressline_1: string;
  addressline_2: string;
  city: string;
  id: number;
  state: string;
  zipcode: string;
  profile_pic: string;
  email_ntf: boolean;
  sms_ntf: boolean;
  Language: string;
  rate: number;
  reviews: number;
}

export interface driverDataType extends Omit<userDataType, "User_Type"> {
  User_Type: 2;
  from_location: string;
  to_location: string;
  from_loc_lat: string;
  from_loc_long: string;
  to_loc_lat: string;
  to_loc_long: string;
  license_number: string;
  insurance: string;
  profile_complete: boolean;
  license_pic: string;
  insurance_pic: string;
  is_live: boolean;
  product_id?: string;
}

export interface ReviewType {
  profile_pic: string;
  id: number;
  full_name: string;
  date_review: string;
  public_id: string;
  rate: number;
  details: string;
}
