import { Alerta } from "../clases entidad/Alerta.ts";
import { FIFOEstrategia } from "../clases entidad/FIFOEstrategia.ts";
import { LIFOEstrategia } from "../clases entidad/LIFOEstrategia.ts";
import { Usuario } from "../clases entidad/Usuario.ts";
import { OrdenamientoEstrategia } from "../interfaces/OrdenamientoEstrategia.ts";

export class GestorAlerta {
    private alertas: Alerta[];
    private usuarios: Usuario[];
    
    private ordenamientoFIFO: FIFOEstrategia = new FIFOEstrategia();
    private ordenamientoLIFO: LIFOEstrategia = new LIFOEstrategia();

    constructor() {
        this.alertas = [];
        this.usuarios = [];
    }
    
    /**
    * Registra una nueva alerta en el sistema y notifica a los usuarios interesados en el tema de la alerta.
    * @param {Alerta} alerta - La alerta a registrar en el sistema.
    * @returns {void}
    */
    public registrarAlerta(alerta: Alerta): void {
        this.alertas.push(alerta);
        console.log(`La alerta ${alerta.getDescripcion()} ha sido registrada con el tema ${alerta.getTema().getDescripcion()}`);
        // notificar a los usuarios interesados en el tema de la alerta
        this.usuarios.forEach(usuario => {
            if(usuario.getTemasSuscriptos().includes(alerta.getTema())) {
                alerta.registrarObservador(usuario);
            }
        });
    }

    /**
     * Notifica a los usuarios interesados en el tema de la alerta.
     * @param {Alerta} alerta - La alerta a notificar.
     * @returns {void}
     */
    public notificarAlertas(alerta: Alerta): void {
        alerta.notificarObservadores();
    }

    /**
     * Notifica a un usuario interesado en el tema de la alerta.
     * @param {Alerta} alerta - La alerta a notificar.
     * @param {Usuario} usuario - El usuario a notificar.
     * @returns {void}
     */
    public notificarAlertaPorUsuario(alerta: Alerta, usuario: Usuario): void {
        alerta.notificarObservador(usuario);
    }

    /**
     * Obtiene todas las alertas no expiradas sobre un tema y las devuelve ordenadas.
     * @param {number} idTema - Id del tema a filtrar.
     * @returns {Alerta[]} - Las alertas que cumplan con el filtro.
     */
    public obtenerAlertasNoExpiradasPorTema(idTema: number): Alerta[] {
        let alertasNoExpiradas: Alerta[] = [];
        this.alertas.forEach(alerta => {
            if(alerta.estaVigente() && alerta.getTema().getId() == idTema){
                alertasNoExpiradas.push(alerta);
            }
        });


        return this.ordenarAlertas(alertasNoExpiradas);
    }
    
    /**
     * Ordena las alertas por tipo de alerta y por estrategia de ordenamiento.
     * @param {Alerta} alertas - Las alertas a ordenar.
     * @returns {Alerta[]} - Las alertas ordenadas.
     */
    public ordenarAlertas(alertas: Alerta[]): Alerta[] {
        let alertasUrgentes: Alerta[] = this.ordenarAlertasPorEstrategia(alertas.filter(alerta => alerta.getTipo() == 'Urgente'), this.ordenamientoLIFO);
        let alertasInformativas: Alerta[] = this.ordenarAlertasPorEstrategia(alertas.filter(alerta => alerta.getTipo() == 'Informativa'), this.ordenamientoFIFO);
        return alertasUrgentes.concat(alertasInformativas);
    }
    

    /**
     * Ejecuta el metodo polimorfico ordenarAlertas de la estrategia de ordenamiento.
     * @param {Alerta[]} alertas - Las alertas a ordenar.
     * @param {OrdenamientoEstrategia} tipoOrdenamiento - La estrategia de ordenamiento a utilizar.
     * @returns  {Alerta[]} - Las alertas ordenadas.
     */
    public ordenarAlertasPorEstrategia(alertas: Alerta[], tipoOrdenamiento: OrdenamientoEstrategia): Alerta[] {
        return tipoOrdenamiento.ordenarAlertas(alertas);
    }


    /**
     * Registra un nuevo usuario en el sistema.
     * @param {Usuario} usuario - El usuario a registrar.
     * @returns {void}
     */
    public registrarUsuario(usuario: Usuario): void {
        if(!this.usuarios.includes(usuario) ){
            this.usuarios.push(usuario);
            console.log(`El usuario ${usuario.getNombre()} ${usuario.getApellido()} ha sido registrado con los temas: ${usuario.getTemasSuscriptos().map(tema => tema.getDescripcion())}`);
        }
    }

    /**
     * Marca una alerta como leida para un usuario.
     * @param {number} idAlerta - Id de la alerta a marcar como leida.
     * @param {Usuario} usuario - El usuario que marca la alerta como leida.
     * @returns {void}
     */
    public marcarAlertaLeida(idAlerta: number, usuario: Usuario): void {
        usuario.marcarAlertaLeida(idAlerta); 
    }


    /**
     * Trae las aleras no leidas de un usuario.
     * @param {Usuario} usuario 
     * @returns {Alerta[]} 
     */
    public obtenerAlertasNoLeidasPorUsuario(usuario: Usuario): Alerta[] {
        return usuario.getAlertasNoLeidas();
    }

}