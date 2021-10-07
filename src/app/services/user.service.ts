import { Injectable } from "@angular/core";
import { User } from "../models/modelsForData/rooms.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCourant: User 
  
  constructor() {

  }
}

