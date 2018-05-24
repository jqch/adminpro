import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  termino: string = '';

  desdeFiltro: number = 0;
  totalFiltro: number = 0;
  
  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp:any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
  

    
    if (this.termino.length > 0) {
      // REGISTROS FILTRADOS
      let desdeFiltro = this.desdeFiltro + valor;
      if (desdeFiltro >= this.totalFiltro) {
        return;
      }
      if (desdeFiltro < 0) {
        return;
      }

      this.desdeFiltro += valor;

      this.buscarUsuario(this.termino);

    } else {
      // TODOS LOS REGISTROS
      let desde = this.desde + valor;

      if (desde >= this.totalRegistros) {
        return;
      }

      if (desde < 0) {
        return;
      }

      this.desde += valor;
      this.cargarUsuarios();
    }

  }

  buscarUsuario(termino: string) {

    this.termino = termino;

    if (termino.length <= 0) {
      this.desde = 0;
      this.cargarUsuarios();
      this.termino = '';
      return;
    }

    this.cargando = true;
    
    this._usuarioService.buscarUsuarios(termino, this.desdeFiltro)
      .subscribe((resp: any) => {
        this.totalFiltro = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
    
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
    }

    swal({
      title: 'Esta seguro',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(borrar => {
        console.log(borrar);
        if (borrar) {
          this._usuarioService.borrarUsuario(usuario._id)
            .subscribe(borrado => {
              console.log(borrado);

              if (this.termino.length > 0) {
                this.desdeFiltro = 0;
                this.buscarUsuario(this.termino);
              } else {
                this.desde = 0;
                this.cargarUsuarios();
              }


            });
        }
      });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

}
