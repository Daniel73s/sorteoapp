import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class RegistroComponent implements OnInit {
  public formregistro: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    ci: ['', [Validators.required]]
  });;
  public spinner: boolean = false;
  public participantes: Participante[] = [];

  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {

  }


  add() {
    this.participantes.push(this.formregistro.value);
    this.formregistro.reset();
  }


  sortear(tamanio: number) {
    let numeroganador = Math.round(Math.random() * (tamanio - 1));
    let nombreganador = this.participantes[numeroganador].nombre + ' con el numero de carnet ' + this.participantes[numeroganador].ci;
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      Swal.fire({
        title: 'El ganador es:',
        text: nombreganador,
        icon: 'success',
        confirmButtonText: 'ok'
      })
    }, 2000);

  }
  remove(item: Participante): void {
    Swal.fire({
      title: 'Eliminar participante?',
      text: "El participante se eliminara de la lista",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.participantes.indexOf(item);
        if (index >= 0) {
          this.participantes.splice(index, 1);
        }
        Swal.fire(
          'Eliminado de la lista!',
          'no contara con el participante para el sorteo.',
          'success'
        )
      }
    })
  }
}
