import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
export interface Participante {
  nombre: string;
  ci: string;
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  formregistro: any;

  public participantes: Participante[] = [];

  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.initform();
  }


  initform() {
    this.formregistro = this.fb.group({
      nombre: ['',[Validators.required]],
      ci: ['',[Validators.required]]
    });
  }

  add() {
    this.participantes.push(this.formregistro.value);
    this.formregistro.reset();
  }


  sortear(tamanio:number){
    let numeroganador=Math.round(Math.random()*(tamanio-1));
    let nombreganador=this.participantes[numeroganador].nombre+' con el numero de carnet '+this.participantes[numeroganador].ci;
    Swal.fire({
      title: 'El ganador es:',
      text:  nombreganador,
      icon: 'success',
      color: '#716add',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar Sorteo'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Registro guardado',
          'el registro se guardo satisfactoriamente.',
          'success'
        )
      }
    })
  }
  remove(item: Participante): void {
    const index = this.participantes.indexOf(item);
    if (index >= 0) {
      this.participantes.splice(index, 1);
    }
  }
}
