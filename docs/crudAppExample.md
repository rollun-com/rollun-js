# CrudApp: простейший пример
Данный туториал покажет вам, как создать простую таблицу с помощью rollun-js. 
> Результаты выполнения данного туториала доступны [здесь](https://github.com/rollun-com/rollun-js/tree/master/examples)
#### Шаг 1. Установка
Для начала скачайте библиотеку rollun-js c Github или установите её через
npm:

    npm install rollun-js

Затем перейдите в папку node_modules/rollun-js и установите зависимости самой библиотеки,
выполнив команду `npm install`.
После установки всех зависимостей библиотека почти полностью готова к работе.

Теперь создайте файл `index.html` в корневой папке проекта. Он будет точкой
входа в наше маленькое приложение.
#### Шаг 2. Подключение оформления
Для корректной работы работы библитоеке требуются [jquery](https://jquery.com/), 
[bootstrap](https://getbootstrap.com/), [boootbox](http://bootboxjs.com/) и 
[font-awesome](http://fontawesome.io/). Добавьте их:
```
<link rel="stylesheet" type="text/css"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>
```
#### Шаг 3. Подключение Dojo
Rollun-js использует [Dojo](https://dojotoolkit.org/), и перед началом работы
его нужно настроить. 
> Настройку `dojo` обязательно нужно провести до того, как будет подключён `dojo.js`. В противном случае 
настройки будут проигнорированы.

Для этого добавьте в ваш файл следующие строки:
```
 <script>
        dojoConfig = {
            isDebug: true,
            packages: [
                {name: 'dstore', location: '../dojo-dstore'},
                {name: 'rql', location: '../rollun-rql'}
            ]
        };
    </script>
```
Таким образом мы создадим объект `dojoConfig`, используемый для настройки
`dojo`. Подробнее о настройке `dojo` - [здесь](https://dojotoolkit.org/reference-guide/1.10/dojo/_base/config.html).
Теперь мы добавим сам dojo:
 ```
<script src="node_modules/rollun-js/node_modules/dojo/dojo.js"></script>
 ```
#### Шаг 4. Подключение Rollun-Js

Теперь мы подключим саму библиотеку. Для этого нужно добавить файл `index.js` из папки библиотеки:
```
<script src="node_modules/rollun-js/index.js"></script>
```
Он являет собой минифицированный `bundle` [webpack'a](https://webpack.js.org/)
и содержит весь функционал в удобном для загрузки виде. 

> Перед использованием библиотека должна пройти обработку вебпаком. Так что 
если вы внесёте в неё изменения, их надо будет добавить в бандл. Для этого из папки 
`rollun-js` выполните команду `wepback` (или `webpack --optimize-minimize`, чтобы 
получить минифицированную версию).  

Далее нам нужно инициализировать наше приложение. Делается это следующим образом:
```
<script>
    $(function () {
        require(['dojo/_base/declare', 'dstore/Rest', 'dstore/extensions/RqlQuery', 'rql/query'], function (declare, Rest, RqlQuery, query) {
            window.RqlStore = declare([Rest, RqlQuery]);
            Query = query.Query;
            app = RollunJs.app({el: '#example'});
        });
    });
</script>
```
После загрузки DOM эта конструкция вызовет функцию, которая создаст экземпляр `dstore/Rest`
и экземпляр `Vue`, привязанный к элементу `exapmle`. Теперь нам нужно создать
этот элемент и добавить в него нашу таблицу:
```
<div id="example" style='margin: 1%'>
    <w-crud-app ref='crud' title='myTable' url='' v-bind:options='{}'></w-crud-app>
</div>
```
> `w-crud-app` - компонент Vue, представляющий нашу таблицу. Подробнее о компонентах 
в Vue - [здесь](https://ru.vuejs.org/v2/guide/components.html).

#### Шаг 5. Источник данных
На этом этапе приложение уже отрисует нам таблицу. Но содержимого в ней не будет,
потому что мы не передали в `w-crud-app` параметр `url`. Он обозначает хранилище данных, 
из которого таблица будет брать данные. Ресурс по этосу адресу должен возвращать записи 
в JSON в виде массива из объектов, представляющих собой строки таблицы:
```
[
  {
    "id": "id",
    "data": "Some data",
  },
  {
    "id": "anotherId,
    "data": "Another piece of data",
  }
]
```
> Пример реализации такого DataStore - [здесь](https://github.com/rollun-com/rollun-datastore).

Для простоты мы не будем создавать полноценный DataStore. Для данного примера
достаточно будет обычного .json файла. Создайте файл `example.json` в корне
проекта и внесите в него следующие строки:
```
[
  {
    "id": 1,
    "text": "Hello",
    "number": "88005553535"
  },
  {
    "id": 2,
    "text": "World",
    "number": "12331233"
  }
]
```
Теперь передайте ссылку на этот файл в поле `url`:

    <w-crud-app ref='crud' title='myTable' url='exapmle.json' v-bind:options='{}'>
    
### Итог    
На этом тапе у вас есть полноценная таблица. Ну, почти. CRUD-операции работать не будут,
потому что вместо DataStore у нас json ¯\\\_(ツ)_/¯.
