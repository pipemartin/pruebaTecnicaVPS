import { Component } from '@angular/core';
import { DatosService } from './datos.service';


interface Datos {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  selectedVehiculo: string = '';
  selectedMarca: number = 0;
  selectedModelo: number = 0;
  selectedYear: string = '';
  datosMarcas: any;
  datosModelos: any= {
    anos: [], // Ejemplo de arreglo de años
    modelos: [] // Ejemplo de arreglo de modelos
  };;
  datosYear: any;
  datosAll: Partial<Datos> = {};;
  
  constructor(private datosService: DatosService) { }

  onSelectionVehiculo(selectedVehiculo: string) {
    console.log('Opción seleccionada:', selectedVehiculo);
    if(selectedVehiculo) {
      this.datosService.getMarcas(selectedVehiculo).subscribe(data => {
        this.datosMarcas = data
        
      }, error => {
        console.error('Error al obtener datos:', error);
      });
    }
  }

  onSelectionMarca(selectedMarca: number) {
    console.log('Marca seleccionada:', selectedMarca);
    if(selectedMarca > 0) {
      this.datosService.getModelos(this.selectedVehiculo,selectedMarca).subscribe(data => {
        this.datosModelos = data
        
      }, error => {
        console.error('Error al obtener datos:', error);
      });
    }
  }

  onSelectionModelo(selectedModelo: number) {
    console.log('Modelo seleccionado:', selectedModelo);
    if(selectedModelo > 0) {
      this.datosService.getYear(this.selectedVehiculo,this.selectedMarca, selectedModelo).subscribe(data => {
        this.datosYear = data
        
      }, error => {
        console.error('Error al obtener datos:', error);
      });
    }
  }

  onSelectionYear(selectedYear: string) {
    console.log('Modelo seleccionado:', selectedYear);
    if(selectedYear) {
      this.datosService.getAllData(this.selectedVehiculo,this.selectedMarca, this.selectedModelo, selectedYear).subscribe(data => {
        this.datosAll = data
      }, error => {
        console.error('Error al obtener datos:', error);
      });
    }
  }

  impuesto(price: any, combustivel: any): any {
    if(combustivel === 'Diesel'){
      const numero = parseFloat(price.replace("R$ ", "").replace(",", ""))
      return (numero * 2.5) / 100;
    }
    if(combustivel === 'Gasolina'){
      const numero = parseFloat(price.replace("R$ ", "").replace(",", ""))
      return (numero * 5) / 100;
    }
  }

  onCambio(price: any): any {

  }

  onReload(): void{
    window.location.reload();
  }

}
