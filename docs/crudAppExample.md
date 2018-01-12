# CrudApp: простейший пример
Результаты данного туториала доступны [здесь]()
#### Шаг 1. Установка
Для начала скачайте библиотеку rollun-js c Github или установите её через
npm:

    npm install rollun-js

Затем перейдите в папку rollun-js и установите зависимости самой библиотеки,
выполнив команду `npm install`.
После установки всех зависимостей библиотека почти полностью готова к работе.
#### Шаг 2. Разметка
Теперь создайте файл index.html в корневой папке проекта. Он будет точкой
входа в наше маленькое приложение. Для корректной работы работы библитоеке
требуются jquery, bootstrap, boootbox и font-awesome:
```
<link rel="stylesheet" type="text/css"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
```
Rollun-js использует [Dojo](https://dojotoolkit.org/), и перед началом работы
его нужно настроить. Для этого добавьте в ваш файл следующие строки:
```
 <script>
        dojoConfig = {
            isDebug: true,
            packages: [
                {name: 'dstore', location: 'node_modules/rollun-js/node_modules/dojo-dstore'},
                {name: 'rql', location: 'node_modules/rollun-js/node_modules/rollun-rql'}
            ]
        };
    </script>
```
Таким образом мы создадим объект `dojoConfig`, используемый для настройки
dojo. Подробнее о настройке dojo - [здесь](https://dojotoolkit.org/reference-guide/1.10/dojo/_base/config.html).
Теперь мы добавим сам dojo, а также `index.js` из rollun-js:
 ```
<script src="node_modules/rollun-js/node_modules/dojo/dojo.js"></script>
<script src="node_modules/rollun-js/index.js"></script>
 ```
Последний являет собой минифицированный bundle `webpack`'а и содержит весь
функционал в удобном для загрузки виде.



