export interface createOrderType {}

interface commonType {
  id: number;
  order_id: string;
  pick_address: string;
  drop_address: string;
  price: string;
  km: string;
  description: string;
  height: string;
  weight: string;
  width: string;
  user_id: number;
  rate: number;
}

export interface driverHomeType extends commonType {
  city: string;
  booking_date: string;
  reviews: number;
  booking_time: string;
  public_id: string;
  full_name: string;
  profile_pic: string;
}

export interface driverBookingType extends commonType {
  order_status: number;
  date: string;
  time: string;
  date_completed: string;
  user_public_id: string;
  user_img: string;
  user_name: string;
  is_rate: boolean;
}

export interface userBookingType extends Omit<commonType, "user_id"> {
  order_status: number;
  date: string;
  time: string;
  date_completed: "";
  driver_id: number;
  driver_public_id: string;
  driver_img: string;
  driver_name: string;
  is_rate: boolean;
}

export const ORDER_STATUS = {
  1: "Pending",
  2: "Upcoming",
  3: "Trip Started",
  4: "Canceled",
  5: "Completed",
};

export const OFFERS_ACTION = {
  1: "Pending",
  2: "Accepted",
  3: "Rejected",
  4: "Expired",
};
