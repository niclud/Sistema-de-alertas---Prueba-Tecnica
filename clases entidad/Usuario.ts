import { Observador } from "../interfaces/Observador.ts";
import { OrdenamientoEstrategia } from "../interfaces/OrdenamientoEstrategia.ts";
import { Alerta } from "./Alerta.ts";
import { FIFOEstrategia } from "./FIFOEstrategia.ts";
import { LIFOEstrategia } from "./LIFOEstrategia.ts";
import { TemaAlerta } from "./TemaAlerta.ts";


export class Usuario implements Observador {
    private nombre: string;
    private apellido: string;
    private email: string;
    private password: string;
    private temasSuscriptos: TemaAlerta[]
    private alertasLeidas: Set<number>;
    private alertasNoLeidas: Alerta[];
    private ordenamientoFIFO: FIFOEstrategia = new FIFOEstrategia();
    private ordenamientoLIFO: LIFOEstrategia = new LIFOEstrategia();

    constructor(nombre: string, apellido: string, email: string, password: string, temasSuscriptos: Array<TemaAlerta>) {
        
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.temasSuscriptos = temasSuscriptos;

        this.alertasLeidas = new Set<number>();
        this.alertasNoLeidas = [];

    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getApellido(): string {
        return this.apellido;
    }

    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getTemasSuscriptos(): Array<TemaAlerta> {
        return this.temasSuscriptos;
    
    }

    /**
     * Los usuarios pueden optar sobre cuales temas quieren recibir alertas.
     * @param {TemaAlerta[]} temasSuscriptos 
     */
    public setTemasSuscriptos(temasSuscriptos: TemaAlerta[]): void {
        this.temasSuscriptos = temasSuscriptos;
    }

    /**
     * Los usuarios pueden optar sobre cuales temas quieren recibir alertas.
     * @param {TemaAlerta} tema 
     */
    public pushTemaSuscripto(tema: TemaAlerta): void {
        if(!this.temasSuscriptos.includes(tema)){
            this.temasSuscriptos.push(tema);
        }
    }

    /**
     * Recorre todas las alertas no leidas verificnado que esten vigentes y las devuelve ordenadas.
     * @returns {Alerta[]} - Las alertas no expiradas y no leidas por el usuario ordenadas.
     */
    public getAlertasNoLeidas(): Alerta[] {
        let alertasNoExpiradas: Alerta[] = [];
        this.alertasNoLeidas.forEach(alerta => {
            if(alerta.estaVigente()){
                alertasNoExpiradas.push(alerta);
            }
        });

        alertasNoExpiradas = this.ordenarAlertas(alertasNoExpiradas);

        return alertasNoExpiradas;
    }

    /**
     * Ordena las alertas por tipo de alerta y por estrategia de ordenamiento.
     * @param {Alerta} alertas - Las alertas a ordenar.
     * @returns {Alerta[]} - Las alertas ordenadas.
     */
    public ordenarAlertas(alertas: Alerta[]): Alerta[] {
        let alertasUrgentes: Alerta[] = this.ordenarAlertasPorEstrategia(alertas.filter(alerta => alerta.getTipo() == 'Urgente'), this.ordenamientoLIFO);
        let alertasInformativas: Alerta[] = this.ordenarAlertasPorEstrategia(alertas.filter(alerta => alerta.getTipo() == 'Informativa'), this.ordenamientoFIFO);
        // let alertasUrgentes: Alerta[] = this.ordenamientoLIFO.ordenarAlertas(alertas.filter(alerta => alerta.getTipo() == 'Urgente'));
        // let alertasInformativas: Alerta[] = this.ordenamientoFIFO.ordenarAlertas(alertas.filter(alerta => alerta.getTipo() == 'Informativa'));
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
     * Marca una alerta como leida la agrega al array de alertas leidas y las saca de las no leidas.
     * @param {number} idAlerta - El id de la alerta a marcar como leida.
     * @returns {void}
     */
    public marcarAlertaLeida(idAlerta: number): void {
        console.log(`El usuario ${this.getNombre()} ${this.getApellido()} ha marcado como leida la alerta ${idAlerta}`);
        this.alertasLeidas.add(idAlerta);
        this.alertasNoLeidas = this.alertasNoLeidas.filter(alerta => alerta.getId() !== idAlerta);
    }

    /**
     * Verifica si una alerta ya fue leida por el usuario.
     * @param {number} idAlerta - El id de la alerta a verificar.
     * @returns {boolean} - True si la alerta ya fue leida por el usuario, false en caso contrario.
     */
    public verificarAlertaLeida(idAlerta: number): boolean {
        return this.alertasLeidas.has(idAlerta);
    }

    /**
     * Metodo polimorfico que se ejecuta cuando un usuario es notificado de una alerta (patron observer).
     * @param {Alerta} alerta 
     */
    public actualizar(alerta: Alerta): void {
        if(alerta.getDestinatarios().includes(this) && !this.verificarAlertaLeida(alerta.getId())){
            this.alertasNoLeidas.push(alerta);
            console.log(`El usuario ${this.getNombre()} ${this.getApellido()} ha sido notificado de la alerta: ${alerta.getDescripcion()}`);
        }
    }    
}