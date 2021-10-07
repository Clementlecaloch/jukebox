import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClcApi } from "../class/clc-api.class";

@Injectable({providedIn: 'root'})

export class ClcApiService extends ClcApi {
  
  constructor(
    http: HttpClient
  ) {
    super(http);
  }

}