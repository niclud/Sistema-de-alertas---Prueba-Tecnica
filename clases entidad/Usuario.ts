import { Observador } from "../interfaces/Observador";
import { Alerta } from "./Alerta";
import { FIFOEstrategia } from "./FIFOEstrategia";
import { LIFOEstrategia } from "./LIFOEstrategia";
import { TemaAlerta } from "./TemaAlerta";

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

    public setTemasSuscriptos(temasSuscriptos: TemaAlerta[]): void {
        this.temasSuscriptos = temasSuscriptos;
    }

    public pushTemaSuscripto(tema: TemaAlerta): void {
        if(!this.temasSuscriptos.includes(tema)){
            this.temasSuscriptos.push(tema);
        }
    }

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

    public ordenarAlertas(alertas: Alerta[]): Alerta[] {
        let alertasUrgentes: Alerta[] = this.ordenamientoLIFO.ordenarAlertas(alertas.filter(alerta => alerta.getTipo() == 'Urgente'));
        let alertasInformativas: Alerta[] = this.ordenamientoFIFO.ordenarAlertas(alertas.filter(alerta => alerta.getTipo() == 'Informativa'));
        return alertasUrgentes.concat(alertasInformativas);
    }


    public marcarAlertaLeida(idAlerta: number): void {
        console.log(`El usuario ${this.getNombre()} ${this.getApellido()} ha marcado como leida la alerta ${idAlerta}`);
        this.alertasLeidas.add(idAlerta);
        this.alertasNoLeidas = this.alertasNoLeidas.filter(alerta => alerta.getId() !== idAlerta);
    }

    public verificarAlertaLeida(idAlerta: number): boolean {
        return this.alertasLeidas.has(idAlerta);
    }

    public actualizar(alerta: Alerta): void {
        if(alerta.getDestinatarios().includes(this) && !this.verificarAlertaLeida(alerta.getId())){
            this.alertasNoLeidas.push(alerta);
            console.log(`El usuario ${this.getNombre()} ${this.getApellido()} ha sido notificado de la alerta: ${alerta.getDescripcion()}`);
        }
    }    
}