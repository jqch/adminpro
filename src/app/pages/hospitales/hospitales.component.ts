import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = false;
  totalRegistros = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
      .subscribe(resp => {
        this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
      .subscribe((hospitales:any) => {
        this.hospitales = hospitales;
        this.cargando = false;
        this.totalRegistros = this._hospitalService.totalHospitales;
      })
  }

  obtenerHospital(id:string) {
    // se ejecutara el servicio mas adelante
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Esta seguro',
      text: 'Esta a punto de borrar el ' + hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id)
          .subscribe(resp => {
            this.cargarHospitales();
          });
      }
    });
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: "input",
      icon: 'info',
      buttons: true,
      dangerMod: true
    })
      .then((valor: string) => {
        if (!valor || valor.length === 0) {
          return;
        }
        
        this._hospitalService.crearHospital(valor)
          .subscribe(resp => {
            this.cargarHospitales();
          })
    });
  }

  buscarHospital(termino: string) {

    this.cargando = true;

    this.hospitales = null;
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(termino)
      .subscribe((hospitales: any) => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe(resp => {
        this.cargarHospitales();
      });
  }

  mostrarModal(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
