import { Observador } from "./Observador.ts";

export interface SujetoObservable {
    registrarObservador(observador: Observador): void;
    removerObservador(observador: Observador): void;
    notificarObservadores(): void;
}