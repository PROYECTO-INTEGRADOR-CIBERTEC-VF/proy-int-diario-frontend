# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # My Diary

  Base de frontend en React + TypeScript + Vite con una arquitectura modular preparada para autenticación, dashboard y módulos funcionales.

  ## Ejecutar

  ```powershell
  npm install
  npm run dev
  ```

  ## Estructura

  - `src/app/core`: API, guards, interceptors, servicios y modelos globales.
  - `src/app/shared`: componentes, hooks y utilidades reutilizables.
  - `src/app/features`: módulos por dominio como `auth`, `dashboard`, `diary`, `weather`, `countries`, `currency`, `profile` y `analytics`.
  - `src/app/layouts`: layouts principales.
  - `src/app/routes`: enrutador base del proyecto.
  - `src/environments`: configuraciones por entorno.
  - `src/styles`: estilos globales.
