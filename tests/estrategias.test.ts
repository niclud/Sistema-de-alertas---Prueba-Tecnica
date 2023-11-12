import { Alerta } from "../clases entidad/Alerta";
import { FIFOEstrategia } from "../clases entidad/FIFOEstrategia";
import { LIFOEstrategia } from "../clases entidad/LIFOEstrategia";
import { TemaAlerta } from "../clases entidad/TemaAlerta";


describe("Estrategias", () => {
    test('Estrategia FIFO', () => {
        const estrategiaFIFO = new FIFOEstrategia();
        const temaAlerta1 = new TemaAlerta(1, 'Tema 1', 'Descripcion tema 1');
        const alerta1 = new Alerta(1, temaAlerta1, 'Alerta 1', 'Urgente', new Date(2023, 10, 10, 10, 10, 10));
        const alerta2 = new Alerta(2, temaAlerta1, 'Alerta 2', 'Informativa', new Date(2023, 11, 10, 10, 10, 10));
        const alerta3 = new Alerta(3, temaAlerta1, 'Alerta 3', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));
        const alertas = [alerta1, alerta2, alerta3];
        const alertasOrdenadas = [alerta1, alerta2, alerta3];
        expect(estrategiaFIFO.ordenarAlertas(alertas)).toEqual(alertasOrdenadas);
    }),

    test('Estrategia LIFO', () => {
        const estrategiaLIFO = new LIFOEstrategia();
        const temaAlerta1 = new TemaAlerta(1, 'Tema 1', 'Descripcion tema 1');
        const alerta1 = new Alerta(1, temaAlerta1, 'Alerta 1', 'Urgente', new Date(2023, 10, 10, 10, 10, 10));
        const alerta2 = new Alerta(2, temaAlerta1, 'Alerta 2', 'Informativa', new Date(2023, 11, 10, 10, 10, 10));
        const alerta3 = new Alerta(3, temaAlerta1, 'Alerta 3', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));
        const alertas = [alerta1, alerta2, alerta3];
        const alertasOrdenadas = [alerta3, alerta2, alerta1];
        expect(estrategiaLIFO.ordenarAlertas(alertas)).toEqual(alertasOrdenadas);
    });
});