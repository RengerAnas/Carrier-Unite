export interface homeDriverDataType {
  reviews: number;
  device_token: string;
  city: string;
  id: number;
  public_id: string;
  profile_pic: string;
  rate: number;
  full_name: string;
  lat: number;
  long: number;
}

export interface driverDetailsType extends Omit<homeDriverDataType, "device_token"> {
  from_loc_lat: number;
  to_location: number;
  to_loc_lat: number;
  to_loc_long: number;
  from_location: number;
  from_loc_long: number;
}
