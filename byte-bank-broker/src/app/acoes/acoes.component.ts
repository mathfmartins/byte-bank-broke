import { merge, Observable } from 'rxjs';
import { AcoesService } from './acoes.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes, AcoesApi } from './modelo/acoes';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent implements OnInit {
  acoesInput = new FormControl();
  acoesMerge$: Observable<Acoes>;
  todasAcoes$: Observable<Acoes>;
  acoesPeloInput: Observable<Acoes>;

  constructor(private acoesService: AcoesService) {}

  ngOnInit(): void {
    this.todasAcoes$ = this.acoesService.getAcoes().pipe(
      tap(() => console.log('Obervable de todas as Ações'))
    )
    this.acoesPeloInput = this.acoesInput.valueChanges.pipe(
      debounceTime(300),
      tap(() => console.log('Observable das Ações filtradas.')),
      filter((valueInput) => valueInput.length >= 3 || !valueInput.length),
      tap((value) => console.log(value)),
      switchMap((valueInput) => this.acoesService.getAcoes(valueInput))
    );

    this.acoesMerge$ = merge(this.todasAcoes$, this.acoesPeloInput);
  }
}
