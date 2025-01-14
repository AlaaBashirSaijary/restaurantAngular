//import { LatLng } from "leaflet";
import { CartItem } from "./CardItem";

export class Orders{
  id!:number;
  items!:CartItem[];
  totalPrice!:number;
  name!:string;
  address!:string;
  addressLatLng?:{ lat: number; lng: number };
  paymentId!:string;
  createdAt!:string;
  status!:string;
}
