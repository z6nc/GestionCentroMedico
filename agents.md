# 🧠 Contexto del Proyecto

El proyecto corresponde al **Sistema de Gestión del Centro Médico**, desarrollado con un enfoque **frontend moderno, modular y limpio**, utilizando las siguientes tecnologías principales:

- **React** con **TypeScript**  
- **TailwindCSS** para el diseño  
- **Zod** y **React Hook Form** para validación de formularios  
- **SWR** para manejo de peticiones a APIs  
- **Jotai** para el estado global  
- **React Router** para la navegación entre páginas  

---

# ⚙️ Guías de Desarrollo

## 1. Estructura y Organización
- Mantener una **arquitectura limpia y modular**.  
- Crear **carpetas por dominio o funcionalidad**, evitando archivos monolíticos.  
- Se pueden crear nuevos archivos o subcarpetas cuando sea necesario, pero siempre priorizando **orden y legibilidad**.  
- Todos los **estados globales** deben almacenarse en la carpeta `/store`.  

## 2. Buenas Prácticas
- Aplicar los principios de **Clean Code**: nombres claros, funciones pequeñas y sin lógica innecesaria.  
- Usar **camelCase** para todas las constantes, variables y funciones.  
- Tipar los componentes **solo cuando sea necesario**; si un componente no requiere tipado explícito, no forzarlo.  
- Evitar **clases y programación orientada a objetos**; se prioriza la **programación funcional**.  
- Priorizar **la funcionalidad antes que los estilos**; el diseño puede refinarse después.  

## 3. Formularios y Validaciones
- Todo formulario debe construirse utilizando:
  - **React Hook Form** para el manejo de formularios.
  - **Zod** para la validación de esquemas.  
- La validación debe realizarse **antes del envío de datos**, garantizando la integridad de la información.  

## 4. Consumo de APIs
- Todas las peticiones HTTP deben realizarse con **SWR** para aprovechar la revalidación y el caché integrado.  
- No se deben usar `fetch` o `axios` directamente fuera de SWR.  
- Las rutas de la API deben centralizarse en un archivo `api.ts` o `services/api.ts` para mantener consistencia.  

## 5. Estado Global
- El manejo de estado global se realiza con **Jotai**.  
- Cada átomo (estado) debe declararse en la carpeta `/store`.  
- Evitar crear estados globales innecesarios; usar estados locales cuando sea posible.  

## 6. Navegación
- La navegación entre páginas debe realizarse exclusivamente mediante el componente **`<Link />`** de **React Router**.  
- Evitar el uso de `window.location` o redirecciones manuales.  

## 7. Estilos y Componentes
- Usar **TailwindCSS** para todos los estilos.  
- Mantener los componentes **reutilizables** y con props bien definidas.  
- Si un componente crece demasiado, dividirlo en subcomponentes.  

## 8. Dependencias y Paquetes
- Todo comando para instalar una dependencia o paquete debe realizarse con **Bun**

## 9. Tipos de TypeScript
- Cada entidad debe tener su propio archivo de tipos siguiendo la convención:
user.types.ts
appointment.types.ts
service.types.ts.
- Mantener los tipos claros y específicos para cada entidad.
- Evitar mezclar tipos de diferentes entidades en un mismo archivo.

## 10. Estructura de Carpetas Sugerida
/src
  /components    # Componentes reutilizables
  /pages         # Páginas principales
  /hooks         # Custom hooks
  /store         # Estados globales (Jotai)
  /services      # Funciones para consumir APIs
  /types         # Tipos de TypeScript (user.types.ts, appointment.types.ts, etc.)
  /utils         # Funciones utilitarias
  App.tsx
  routes.tsx

## 10. Notas Adicionales
- Mantener siempre orden y limpieza en el código.
- Priorizar funcionalidad sobre diseño en la fase inicial.
- Evitar estados globales innecesarios y componentes con lógica excesiva.
