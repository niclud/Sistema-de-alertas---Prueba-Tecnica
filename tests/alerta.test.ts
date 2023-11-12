import { Alerta } from "../clases entidad/Alerta";
import { TemaAlerta } from "../clases entidad/TemaAlerta";
import { Usuario } from "../clases entidad/Usuario";


describe("Alerta", () => {
    test('Agregar observador', () => {
        // Crear un tema de alerta
        const tema = new TemaAlerta(1, 'Tema 1', 'Descripcion tema 1');
      
        // Crear un usuario
        const usuario = new Usuario('Juan', 'Perez', 'juan@gmail.com', '123456', [tema]);
        
        // Crear una alerta
        const alerta1 = new Alerta(1, tema, 'Alerta 1', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));

        // Registrar el usuario como observador de la alerta
        alerta1.registrarObservador(usuario);

        // Verificar si el usuario es observador de la alerta
        expect(alerta1.getDestinatarios().some(usuario => usuario.getEmail() === 'juan@gmail.com')).toBe(true);

    }),

    test('Quitar observador', () => {
        const tema = new TemaAlerta(1, 'Tema 1', 'Descripcion tema 1');
       
        const usuario = new Usuario('Juan', 'Perez', 'juan@gmail.com', '123456', [tema]);
        
        const alerta1 = new Alerta(1, tema, 'Alerta 1', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));

        alerta1.registrarObservador(usuario);

        // Quitar el usuario como observador de la alerta
        alerta1.removerObservador(usuario);

        // Verificar si el usuario es observador de la alerta
        expect(alerta1.getDestinatarios().some(usuario => usuario.getEmail() === 'juan@gmail.com')).toBe(false);

    }),

    test('Tiene fecha y hora de expiración', () => {
        const tema = new TemaAlerta(1, 'Tema de Prueba', 'Descripción');

        // Definir una fecha y hora de expiración conocida
        const fechaExpiracion = new Date(2023, 11, 15, 12, 0, 0); // Año, mes, día, hora, minuto, segundo

        // Crear una alerta con la fecha y hora de expiración
        const alerta = new Alerta(1, tema, 'Alerta de Prueba', 'Urgente', fechaExpiracion);

        // Verificar si la alerta tiene la fecha y hora de expiración correctas
        expect(alerta.getFechaExp()).toEqual(fechaExpiracion);
    });

    test('Notificar usuarios (uso de patron observer)', () => {
        const tema = new TemaAlerta(1, 'Tema 1', 'Descripcion tema 1');
       
        const usuario = new Usuario('Juan', 'Perez', 'juan@gmail.com', '123456', [tema]);
        
        const alerta1 = new Alerta(1, tema, 'Alerta 1', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));

        alerta1.registrarObservador(usuario);
       
        // metodo a probar
        alerta1.notificarObservadores();

        // Verificar si al usuario se le notificó la alerta si es asi deberia estar guardada en el array de alertas no leidas
        expect(usuario.getAlertasNoLeidas().some(alerta => alerta.getId() === 1)).toBe(true);
    
    })

})