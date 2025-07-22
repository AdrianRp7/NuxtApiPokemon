# Añadir un .env al proyecto con los datos siguientes

El proyecto tiene dos variables de entorno, por ello hay que crear un .env con las mismas:

```
NUXT_API_URL_POKEMON = https://pokeapi.co/api/v2/
NUXT_FRONT_URL = http://localhost:3000
```

# Ejecutar el proyecto

## Instalar las dependencias del proyecto

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Ejecutar desarrollo

El servidor será lanzado en `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Producción

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

## Producción preview

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Te saldrá algo como esto: http://[::]:3000. Es el equivalente a http://localhost:3000, en caso de que yendo a ese enlace, no vaya. Puedes usar el siguiente comando en lugar del anterior en el bash:

```bash
# npm
npm run preview -- --host 0.0.0.0
```

# Maquetación y otros

## Maquetacion

Para la maquetación he usado el ejemplo que daba el ejercicio, y he añadido una tarjeta que tenga los datos básicos por pokemón. Debido a que cuando pregunte, no se permitia usar componentes webs importados y tampoco tailwind. He creado una conjunto de ficheros scss con clases de utilidades básicas, para facilitar el desarrollo, todo esta en assests/scss.

- inject.scss: contiene las variables y los mixins, esto se injecta a todos los componentes de vue en el nuxt.config
- styles.scss: contiene las importaciones de las clases de utilidades.

## Modo Shiny

Se ha añadido un switch en la barra de navegación que al activarse hace que todo los sprites pasen a shiny

## Pagina de descripción de Pokemon

Cuando haces click a un pokemon, se mostrará una página con detalle de ese pokemon

## Redirección index to page/1

La pagina pasa del index directamente a la página 1 con un redirect.
