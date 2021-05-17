import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent {
  //enviar valor del padre al hijo
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn btn-primary';
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return (this.progreso = 100);
    }
    if (this.progreso <= 100 && valor < 0) {
      this.valorSalida.emit(0);
      return (this.progreso = 0);
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }
}
