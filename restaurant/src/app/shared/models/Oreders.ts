import { LatLng } from "leaflet";
import { CartItem } from "./CardItem";

export class Orders{
  id!:number;
  items!:CartItem[];
  totalPrice!:number;
  name!:string;
  address!:string;
  addressLatLng?:LatLng;
  paymentId!:string;
  createdAt!:string;
  status!:string;
}
