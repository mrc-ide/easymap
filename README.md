# EasyMap

A web app for easily visualising area data.

## Developing

EasyMap runs entirely in the client, and is deployed to Github Pages at https://mrc-ide.github.io/easymap/

It is written in Typescript, using [Svelte](https://svelte.dev/sveltekit) and [SvelteKit](https://svelte.dev/docs/kit/introduction) 
with component library [Flowbite Svelte](https://flowbite-svelte.com/).

SvelteKit is a helpful framework for developing Svelte apps. Like Nuxt.js, it provides support for server-side 
integration, as well as useful features for the front end, like routing. Because EasyMap is only, we configure
SvelteKit to build using its [static adapter](https://svelte.dev/docs/kit/adapter-static), so that no code needs to run 
on the server. 

To run locally, install packages with `npm i` then start a development server with `npm run dev`.

## Building

To create a production version of the app `npm run build`.
You can then preview the production build with `npm run preview`.

## Testing

Unit tests are in the `tests/unit` folder. Run unit tests with `npm run test:unit`.
The `msw` package is used to allow mocking of http requests.

Playwright e2e tests are in `tests/e2e`. Run e2e tests with `npm run test:e2e`.

## Linting and formatting

We use eslint for linting and prettier for formatting. 

To run without making auto-fixes:
```
npm run lint
npm run format-check
```

To run with auto-fixes:
```
npm run lint-fix
npm run format-write
```

## Deployment

The app is deployed to Github Pages on push to main, when the `deploy.yml` workflow runs. 



