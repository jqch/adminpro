import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {

  hospital: Hospital;
  token: string;
  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { 
    //console.log('servicio hospitales listo');
  }

  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
      .map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
      .map((resp: any) => resp.hospital);
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .map(resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      });
  }

  crearHospital(nombre: string) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, { nombre: nombre })
      .map((resp: any) => resp.hospital);
  }

  buscarHospital(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
      .map((resp: any) => resp.hospitales);
  }

  actualizarHospital(hospital: Hospital) {

    console.log(hospital);
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
      .map(resp => {
        console.log(resp);
        swal('Hospital actualizado', 'Datos actualiados correctamente', 'success');
        return true;
      });
  }

}
