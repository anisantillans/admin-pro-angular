import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: [],
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription;
  constructor() {
    //se coloca retry 1 para intentar una vez más, fuera del flujo 0
    // this.retornaObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (valor) => console.log('Sub:', valor),
    //     (error) => console.warn('Error', error),
    //     () => console.info('Obs terminado')
    //   );

    //quiere decir que envie los argumentos a la funcion que se especifica
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(1000).pipe(
      take(10),
      map((valor) => valor + 1),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
    //el filter me sirve para saber, si emitir un valor o no
    //tener en cuenta la posición de los operadores
    //el take limita el recorrido(2,4,6,8,10)
  }
  retornaObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    });

    return obs$;
  }
}
