import { Alerta } from "../clases entidad/Alerta";
import { TemaAlerta } from "../clases entidad/TemaAlerta";
import { Usuario } from "../clases entidad/Usuario";

describe("Usuario", () => {
    test('Marcar alerta como leida', () => {
        
        const tema = new TemaAlerta(1, 'Tema 1', 'Descripcion tema 1');
       
        const usuario = new Usuario('Juan', 'Perez', 'juan@gmail.com', '123456', [tema]);
        
        const alerta1 = new Alerta(1, tema, 'Alerta 1', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));

        alerta1.registrarObservador(usuario);

        // metodo a probar 
        usuario.marcarAlertaLeida(1);

        expect(usuario.getAlertasNoLeidas().some(alerta => alerta.getId() === 1)).toBe(false);
        expect(usuario.verificarAlertaLeida(1)).toBe(true);

        }
    )
        
    test('Obtener alertas con el ordenamiento correspondiente', () => {
        const temaAlerta1 = new TemaAlerta(1, 'Tema 1', 'Descripcion tema 1');
        const temaAlerta2 = new TemaAlerta(2, 'Tema 2', 'Descripcion tema 2');
        const temaAlerta3 = new TemaAlerta(3, 'Tema 3', 'Descripcion tema 3');
        const temas = [temaAlerta1, temaAlerta2, temaAlerta3];

        const alerta1 = new Alerta(1, temaAlerta1, 'Alerta 1', 'Urgente', new Date(2023, 10, 10, 10, 10, 10));
        const alerta2 = new Alerta(2, temaAlerta2, 'Alerta 2', 'Informativa', new Date(2023, 11, 10, 10, 10, 10));
        const alerta3 = new Alerta(3, temaAlerta3, 'Alerta 3', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));
        const alertas = [alerta1, alerta2, alerta3];


        const usuario = new Usuario('Juan', 'Perez', 'juan@gmail.com', '123456', temas);

        alertas.forEach(alerta => alerta.registrarObservador(usuario));
        
        alertas.forEach(alerta => alerta.notificarObservadores());

        expect(usuario.getAlertasNoLeidas()).toEqual([alerta3, alerta2]);     
        }
    ),
    
    test('Agregar tema suscripto', () => {
        const temaAlerta1 = new TemaAlerta(1, 'Tema 1', 'Descripcion tema 1');
        const temaAlerta2 = new TemaAlerta(2, 'Tema 2', 'Descripcion tema 2');
        const temas = [temaAlerta1];

        const usuario = new Usuario('Juan', 'Perez', 'juan@gmail.com', '123456', temas);

        usuario.pushTemaSuscripto(temaAlerta2);

        expect(usuario.getTemasSuscriptos()).toEqual([temaAlerta1, temaAlerta2]);     
        
    })

});