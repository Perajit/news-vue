# news-vue
Application listing top news from [News API](https://newsapi.org), implemented with VueJS.

Please see features overview in [Wiki](https://github.com/Perajit/news-vue/wiki).

## Table of Contents
- [Setup project](#setup-project)
- [Serve application](#serve-application)
- [Run unit tests](#run-unit-tests)


## Setup project

### Install dependencies
```
$ yarn install
 ```

### Configure environment variables
Set default request parameters for [News API](https://newsapi.org) as environment variables.
Create `.env` or `.env.local` file in the root folder of the project and add configurations to the file.

- __VUE_APP_API_KEY__ : Your API key. ([Register here](https://newsapi.org/register))
- __country__ : The 2-letter ISO 3166-1 code of the country you want to get headlines for. 


## Serve application
To complie and run application with hot-reload for development:
```
$ yarn serve
```


## Build application
To compiles and minifies for production:
```
$ yarn build
```


## Run unit tests
```
$ yarn test:unit
