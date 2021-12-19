import { Observable } from 'rxjs';
import { AcoesService } from './acoes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes, AcoesApi } from './modelo/acoes';
@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent implements OnInit {
  acoesInput = new FormControl();
  acoes$: Observable<Acoes>

  constructor(private acoesService: AcoesService) {}

  ngOnInit(): void {
    this.acoes$ = this.acoesService.getAcoes();
  }
}
