import { SujetoObservable } from "./SujetoObservable.ts";

export interface Observador {
    actualizar(alerta: SujetoObservable): void;
}