# rahdid-shop-front

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

```

## Notes

Before running, the following must be set in nuxt.config.js:

- app url server.host:server.port+router.base. //example: localhost:9011/

  ```javascript
  router: {
    base: '/'
  }
  
  server: {
    host: '127.0.0.1'
    port: 9011
  }
  ```
- base url must be same with router.base
  ```javascript
  publicRuntimeConfig: {
    baseUrl: '/'
  }
  ```

- api base url
  ```javascript
  axios: {
    baseURL: 'https://mehrandev.ir/api/v1/'
  }
  ```


