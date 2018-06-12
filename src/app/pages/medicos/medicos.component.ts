import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  paginas: number = 1;

  constructor(
    public _medicosService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos(this.desde)
      .subscribe(medicos => this.medicos = medicos);
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this._medicosService.buscarMedicos(termino)
      .subscribe(medicos => this.medicos = medicos);
  }

  borrarMedico(medico: Medico) {
    this._medicosService.borrarMedico(medico._id)
      .subscribe(()=> this.cargarMedicos());
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde <= 0) {
      this.desde = 0;
    } else if (desde >= this._medicosService.totalMedicos){
      
    } else {
      this.desde += valor;
    }

    this.cargarMedicos();
  }


}
