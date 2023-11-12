import { GestorAlerta } from "./clase de control/GestorAlerta.ts";
import { Alerta } from "./clases entidad/Alerta.ts";
import { TemaAlerta } from "./clases entidad/TemaAlerta.ts";
import { Usuario } from "./clases entidad/Usuario.ts";


console.log('Ejecutando main.ts');

const gestor: GestorAlerta = new GestorAlerta();

// se resuelve el requerimiento 2. Se pueden registrar temas sobre los cuales se enviarán alertas
console.log('------------------------------ se crean los temas --------------------------')
const temaAlerta1: TemaAlerta = new TemaAlerta(1, 'Tema 1', 'Descripcion tema 1');
console.log(temaAlerta1.getDescripcion());
const temaAlerta2: TemaAlerta = new TemaAlerta(2, 'Tema 2', 'Descripcion tema 2');
console.log(temaAlerta2.getDescripcion());
const temaAlerta3: TemaAlerta = new TemaAlerta(3, 'Tema 3', 'Descripcion tema 3');
console.log(temaAlerta3.getDescripcion());

// se resuelve los requerimientos 1. Se pueden registrar usuarios que recibirán alertas y 
// 3. Los usuarios pueden optar sobre cuales temas quieren recibir alertas..
console.log('------------------------------ se crean los usuarios --------------------------')
const usuario1: Usuario = new Usuario('Juan', 'Perez', 'juan@gmail.com', '123456', [temaAlerta1, temaAlerta2]);
const usuario2: Usuario = new Usuario('Pedro', 'Gomez', 'pedro@gmail.com', '123456', [temaAlerta2, temaAlerta3]);
const usuario3: Usuario = new Usuario('Maria', 'Lopez', 'maria@gmail.com', '123456', [temaAlerta3]);


console.log('------------------------------ se registran los usuarios --------------------------')
gestor.registrarUsuario(usuario1);
gestor.registrarUsuario(usuario2);
gestor.registrarUsuario(usuario3);


// se resuleve los requerimientos 
// 4. Se puede enviar una alerta sobre un tema y lo reciben todos los usuarios que han optado recibir alertas de ese tema.
// 6. Una alerta puede tener una fecha y hora de expiración. 
// 7. Hay dos tipos de alertas: Informativas y Urgentes.

console.log('------------------------------ se registran las alertas --------------------------')
const alerta1: Alerta = new Alerta(1, temaAlerta1, 'Alerta 1', 'Urgente', new Date(2023, 10, 10, 10, 10, 10));
const alerta2: Alerta = new Alerta(2, temaAlerta2, 'Alerta 2', 'Informativa', new Date(2023, 11, 10, 10, 10, 10));
const alerta3: Alerta = new Alerta(3, temaAlerta3, 'Alerta 3', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));
const alerta4: Alerta = new Alerta(4, temaAlerta2, 'Alerta 4', 'Informativa', new Date(2023, 11, 10, 10, 10, 10));
const alerta5: Alerta = new Alerta(5, temaAlerta1, 'Alerta 5', 'Informativa', new Date(2023, 10, 10, 10, 10, 10));
const alerta6: Alerta = new Alerta(6, temaAlerta2, 'Alerta 6', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));
const alerta7: Alerta = new Alerta(7, temaAlerta3, 'Alerta 7', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));
const alerta8: Alerta = new Alerta(8, temaAlerta2, 'Alerta 8', 'Urgente', new Date(2023, 11, 10, 10, 10, 10));

gestor.registrarAlerta(alerta1);
gestor.registrarAlerta(alerta2);
gestor.registrarAlerta(alerta3);
gestor.registrarAlerta(alerta4);
gestor.registrarAlerta(alerta5);
gestor.registrarAlerta(alerta6);
gestor.registrarAlerta(alerta7);
gestor.registrarAlerta(alerta8);



console.log('------------------------------ se notifican las alertas --------------------------')
gestor.notificarAlertas(alerta1);
gestor.notificarAlertas(alerta2);
gestor.notificarAlertas(alerta3);
gestor.notificarAlertas(alerta4);
gestor.notificarAlertas(alerta5);
gestor.notificarAlertas(alerta6);
gestor.notificarAlertas(alerta7);
gestor.notificarAlertas(alerta8);

// se visualiza la resolucion para el requerimiento 
// 5. Se puede enviar una alerta sobre un tema a un usuario 
// específico, solo lo recibe ese único usuario
console.log('------------------------------ se notifican las alertas por usuario --------------------------')
gestor.notificarAlertaPorUsuario(alerta1, usuario1);
gestor.notificarAlertaPorUsuario(alerta7, usuario3);

console.log()

// se visualiza la resolucion para el requerimiento
// 9. Se pueden obtener todas las alertas no expiradas de un usuario que aún no ha leído.
// 11. el ordenamiento de las alertas 
console.log('-------------------------------- se obtiene el listado de alertas no expiradas y no leidas por usuario -------------------------')
gestor.obtenerAlertasNoLeidasPorUsuario(usuario1).forEach(alerta => console.log([alerta.getDescripcion(), alerta.getTipo(), alerta.getFechaExp()]));

console.log()

// 10. Se pueden obtener todas las alertas no expiradas para un tema. Se informa para cada 
// alerta si es para todos los usuarios o para uno específico 
// 11. el ordenamiento de las alertas
console.log('-------------------------------- se obtiene el listado de alertas no expiradas por tema -------------------------')
gestor.obtenerAlertasNoExpiradasPorTema(2).forEach(alerta => console.log([alerta.getDescripcion(), alerta.getTipo(), alerta.getFechaExp()]));

console.log()


// se visualiza la resolucion para el requerimiento
// 8. Un usuario puede marcar una alerta como leída.
console.log('-------------------------------- se marcan las alertas como leidas -------------------------')
gestor.marcarAlertaLeida(2, usuario1);
gestor.marcarAlertaLeida(6, usuario1);
gestor.marcarAlertaLeida(7, usuario3);

console.log()

console.log('-------------------------------- se obtiene el listado de alertas no expiradas y no leidas por usuario -------------------------')
gestor.obtenerAlertasNoLeidasPorUsuario(usuario1).forEach(alerta => console.log([alerta.getDescripcion(), alerta.getTipo(), alerta.getFechaExp()]));

console.log()

console.log('-------------------------------- se obtiene el listado de alertas no expiradas por tema -------------------------')
gestor.obtenerAlertasNoExpiradasPorTema(2).forEach(alerta => console.log([alerta.getDescripcion(), alerta.getTipo(), alerta.getFechaExp()]));
