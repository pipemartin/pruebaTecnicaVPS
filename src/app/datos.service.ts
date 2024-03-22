import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private baseURL = "https://parallelum.com.br/fipe/api/v1/";
  constructor(private httpClient: HttpClient) { }
  public getMarcas(vehiculo:string){
    
    return this.httpClient.get(`${this.baseURL}${vehiculo}/marcas`);
  }

  public getModelos(vehiculo:string, marca:number){
    
    return this.httpClient.get(`${this.baseURL}${vehiculo}/marcas/${marca}/modelos`);
  }
  public getYear(vehiculo:string, marca:number, modelo:number){
    
    return this.httpClient.get(`${this.baseURL}${vehiculo}/marcas/${marca}/modelos/${modelo}/anos`);
  }

  public getAllData(vehiculo:string, marca:number, modelo:number, selectedYear:string){
    
    return this.httpClient.get(`${this.baseURL}${vehiculo}/marcas/${marca}/modelos/${modelo}/anos/${selectedYear}`);
  }
}
