# Sistema-de-alertas---Prueba-Tecnica
# Sistema de Alertas

Este proyecto implementa un sistema de alertas que se basa en el patrón de diseño Observer y Strategy. El sistema permite a los usuarios recibir y gestionar alertas, las cuales pueden ser de diferentes tipos y caducar en momentos específicos.

## Descripción del proyecto

El sistema de alertas está diseñado para:

- **Usuarios:** Permite a los usuarios suscribirse a diferentes temas de alerta y recibir notificaciones sobre las alertas de interés.
- **Alertas:** Pueden tener un tema asociado, diferentes tipos (Urgente, Informativa) y una fecha y hora de expiración.

## Patrones de diseño utilizados

### Observer

El patrón Observer se aplica para notificar a los usuarios suscritos sobre las nuevas alertas relacionadas con los temas que les interesan. Los usuarios actúan como observadores que reciben notificaciones cuando se agregan nuevas alertas.

### Strategy

El patrón Strategy se utiliza para manejar estrategias de ordenamiento de alertas. Por ejemplo, se pueden implementar diferentes estrategias de ordenamiento de alertas no leídas, como FIFO (First In, First Out) o LIFO (Last In, First Out).

## Estructura del código

El proyecto se organiza en:

- **Clases de entidad:** Aquí se definen las clases base como `Alerta`, `TemaAlerta`, `Usuario`, entre otras.
- **Patrones de diseño:** Los patrones Observer y Strategy están implementados en las clases relacionadas con la gestión de alertas y usuarios.
- **Pruebas unitarias:** La lógica está respaldada por pruebas que cubren casos de uso comunes.

## Cómo ejecutar el proyecto

Asegúrate de tener instalado Node.js y las dependencias necesarias:

<!-- ```bash -->
npm install


## Ejecución con Deno

Este proyecto se ha desarrollado en TypeScript y se puede ejecutar en Deno, un entorno de ejecución de JavaScript y TypeScript sin la necesidad de un gestor de paquetes.

### Instalación de Deno

Si aún no tienes Deno instalado, puedes hacerlo mediante el siguiente comando en tu terminal:

<!-- ```bash -->
curl -fsSL https://deno.land/x/install/install.sh | sh

Windows
iwr https://deno.land/x/install/install.ps1 -useb | iex

Para verificar que se instale ejecutar
deno --version

Para ejecutar el archivo main que hace un posible flujo del sistema
deno run --allow-read --allow-write main.ts

## Cómo ejecutar los test

Asegurate de tener instalado Jest y de tener el archivo jest.config.js bien configuardo
npm install jest ts-jest @types/jest -D

Para ejecutar los test solo basta con ejecutar 
```bash
todos los test en conjunto
npx jest

un solo test
npx jest "nombre-del-test" 


