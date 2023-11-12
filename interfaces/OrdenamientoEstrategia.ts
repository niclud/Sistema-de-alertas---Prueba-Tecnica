import { Alerta } from "../clases entidad/Alerta.ts";

export interface OrdenamientoEstrategia {
    ordenarAlertas(alertas: Alerta[]): Alerta[] 
}