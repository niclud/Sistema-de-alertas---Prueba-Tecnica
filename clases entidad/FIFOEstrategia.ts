import { OrdenamientoEstrategia } from "../interfaces/OrdenamientoEstrategia";
import { Alerta } from "./Alerta";

export class FIFOEstrategia implements OrdenamientoEstrategia {
    ordenarAlertas(alertas: Alerta[]): Alerta[] {
        // Clonar el array de alertas para no modificar el original
        const alertasClon = [...alertas];
        // Reordenar las alertas: la primera en llegar se coloca primero
        return alertasClon;
    }
}