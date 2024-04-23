export interface userNotificationListType {
   type: "user";
   id: number;
   title: string;
   msg: string;
   otp: string;
   timestamps: string;
   notification_type: string;
   order_data: {
      order_id: number;
      price: string;
      offer_action: string;
      offer_id: string;
      date: string;
      time: string;
      pickup: string;
   };
   is_offer: boolean;
   driver_data: {
      driver_id: number;
      driver_public_id: string;
      driver_pic: string;
      driver_name: string;
      device_token: string;
   };
}

export interface driverNotificationListType {
   type: "driver";
   id: number;
   title: string;
   msg: string;
   otp: string;
   timestamps: string;
   notification_type: string;
   order_data: {
      order_id: number;
      price: string;
      offer_action: string;
      offer_id: string;
      date: string;
      time: string;
      pickup: string;
   };
   is_offer: boolean;
   user_data: {
      user_id: number;
      user_public_id: string;
      user_pic: string;
      user_name: string;
   };
}

export type notificationListType = {} & (userNotificationListType | driverNotificationListType);
