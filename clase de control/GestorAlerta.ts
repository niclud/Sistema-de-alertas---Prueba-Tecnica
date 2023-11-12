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
    
    public registrarAlerta(alerta: Alerta): void {
        this.alertas.push(alerta);
        console.log()
        console.log(`La alerta ${alerta.getDescripcion()} ha sido registrada con el tema ${alerta.getTema().getDescripcion()}`);
        console.log()
        this.usuarios.forEach(usuario => {
            if(usuario.getTemasSuscriptos().includes(alerta.getTema())) {
                alerta.registrarObservador(usuario);
            }
        });
    }

    public notificarAlertas(alerta: Alerta): void {
        alerta.notificarObservadores();
    }

    public notificarAlertaPorUsuario(alerta: Alerta, usuario: Usuario): void {
        alerta.notificarObservador(usuario);
    }

    public obtenerAlertasNoExpiradasPorTema(idTema: number): Alerta[] {
        let alertasNoExpiradas: Alerta[] = [];
        this.alertas.forEach(alerta => {
            if(alerta.estaVigente() && alerta.getTema().getId() == idTema){
                alertasNoExpiradas.push(alerta);
            }
        });


        return this.ordenarAlertas(alertasNoExpiradas);
    }
    
    public ordenarAlertas(alertas: Alerta[]): Alerta[] {
        let alertasUrgentes: Alerta[] = this.ordenarAlertasPorEstrategia(alertas.filter(alerta => alerta.getTipo() == 'Urgente'), this.ordenamientoLIFO);
        let alertasInformativas: Alerta[] = this.ordenarAlertasPorEstrategia(alertas.filter(alerta => alerta.getTipo() == 'Informativa'), this.ordenamientoFIFO);
        return alertasUrgentes.concat(alertasInformativas);
    }
    
    public ordenarAlertasPorEstrategia(alertas: Alerta[], tipoOrdenamiento: OrdenamientoEstrategia): Alerta[] {
        return tipoOrdenamiento.ordenarAlertas(alertas);
    }

    public registrarUsuario(usuario: Usuario): void {
        if(!this.usuarios.includes(usuario) ){
            this.usuarios.push(usuario);
            console.log()
            console.log(`El usuario ${usuario.getNombre()} ${usuario.getApellido()} ha sido registrado con los temas: ${usuario.getTemasSuscriptos().map(tema => tema.getDescripcion())}`);
            console.log()
        }
    }

    public marcarAlertaLeida(idAlerta: number, usuario: Usuario): void {
        usuario.marcarAlertaLeida(idAlerta); 
    }

    public obtenerAlertasNoLeidasPorUsuario(usuario: Usuario): Alerta[] {
        return usuario.getAlertasNoLeidas();
    }

}