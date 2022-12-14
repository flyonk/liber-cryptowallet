# Liber PWA Application

## Development processes

[Develop and Run (PWA & iOs) ](https://www.notion.so/Develop-and-Run-Yarn-Capacitor-4991d510c8e94f7eaffdb219895f341e)

### Livereload build

## Links

[Figma Liber App](https://www.figma.com/file/jiR05eX1dbN6NFNBEUolDa/Liber-App)

[Figma Liber UI Kit](https://www.figma.com/file/03BEDylTZpq3uwoGEaQ6nk/Liber-UI-KIT)

[API Schemes](https://www.notion.so/API-Design-7619223c43a34e9db2561dbeb1681b32)

[Sentry](http://172.31.27.249:9000/)

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

------------

# Components Design System

The components structure of UI project is based on [Atomic design](https://atomicdesign.bradfrost.com/)

## Rules

Basic rules for categorizing components.

### Atoms

path: *src/components/atoms*
- Smallest undividable components
- Generic, they contain **no logic**, built for reusability
- They can have variations
- They have 1 folder level

### Molecules

path: *src/components/molecules*
- They are a combination of atoms and molecules
- Also Generic, they contain **no logic**, built for reusability
- They can have variations
- They have slots
- They have 1 folder level

### Organisms

path: *src/components/organisms*
- They are a combination of atoms and molecules and organisms
- Specific, they **can contain app-related logic**
- They can push/pull data from store/services
- They have variations
- They have slots
- They have 1 folder level

### Templates

path: *src/components/templates*
- They are the combination of atoms, molecules, and organisms
- They present the layout of a page
- They have no data
- They **contain business logic**
- They have 2 folder level

### Pages

path: *src/components/pages*
- They are specific instances of components
- They define the list of pages of the app
- They push/pull data from store/services
- They have 2 folder level
