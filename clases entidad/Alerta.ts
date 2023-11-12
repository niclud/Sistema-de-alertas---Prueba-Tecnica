import { Observador } from "../interfaces/Observador";
import { SujetoObservable } from "../interfaces/SujetoObservable";
import { TipoAlerta } from "../interfaces/TipoAlerta";
import { TemaAlerta } from "./TemaAlerta";
import { Usuario } from "./Usuario";

export class Alerta implements SujetoObservable {
    private destinatarios: Array<Usuario>;
    private id: number;
    private tema: TemaAlerta;
    private descripcion: string;
    private tipo: TipoAlerta;
    private fechaExp: Date;

    constructor(id: number, tema: TemaAlerta, descripcion: string, tipo: TipoAlerta, fechaExp: Date) {
        this.destinatarios = new Array<Usuario>();
        this.id = id;
        this.tema = tema;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.fechaExp = fechaExp;
    }

    public getId(): number {
        return this.id;
    }

    public getTema(): TemaAlerta {
        return this.tema;
    }

    public setTema(tema: TemaAlerta): void {
        this.tema = tema;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public getTipo(): TipoAlerta {
        return this.tipo;
    }

    public setTipo(tipo: TipoAlerta): void {
        this.tipo = tipo;
    }

    public getFechaExp(): Date {
        return this.fechaExp;
    }

    public setFechaExp(fechaExp: Date): void {
        this.fechaExp = fechaExp;
    }

    public getDestinatarios(): Array<Usuario> {
        return this.destinatarios;
    }


    public registrarObservador(observador: Usuario): void {
        console.log(`El usuario ${observador.getNombre()} ${observador.getApellido()} ha sido registrado como observador de la alerta ${this.descripcion} por el tema ${this.tema.getDescripcion()}`);
        this.destinatarios.push(observador);
    }

    public removerObservador(observador: Observador): void {
        this.destinatarios = this.destinatarios.filter(destinatario => destinatario !== observador);
    }

    public notificarObservadores(): void {
        this.destinatarios.forEach(destinatario => {
            if(destinatario.getTemasSuscriptos().includes(this.tema)){
                destinatario.actualizar(this)
            }
        });
    }

    public notificarObservador(observador: Usuario): void {
        if(this.destinatarios.includes(observador)){
            observador.actualizar(this);
        }
    }

    public estaVigente(): boolean {
        return this.fechaExp > new Date();
    }
}