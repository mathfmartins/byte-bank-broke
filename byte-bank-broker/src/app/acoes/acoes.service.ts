import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, Acoes, AcoesApi } from './modelo/acoes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private http: HttpClient) {}

  getAcoes(): Observable<AcoesApi> {
    return this.http.get<AcoesApi>('http://localhost:3000/acoes');
  }

  ordenarPorCodigo(acaoA: Acao, acaoB: Acao): number {
    if (acaoA.codigo > acaoB.codigo) return 1;
    else if (acaoB.codigo > acaoA.codigo) return -1;
    else return 0;
  }
}