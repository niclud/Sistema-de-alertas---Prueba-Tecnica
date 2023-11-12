import { OrdenamientoEstrategia } from "../interfaces/OrdenamientoEstrategia.ts";
import { Alerta } from "./Alerta.ts";

export class LIFOEstrategia implements OrdenamientoEstrategia {
    public ordenarAlertas(alertas: Alerta[]): Alerta[] {
        // Clonar el array de alertas para no modificar el original
        const alertasClon = [...alertas];

        // Reordenar las alertas: la última en llegar se coloca primero
        return alertasClon.reverse();
    }
}