# CrudApp: простейший пример
Результаты данного туториала доступны [здесь](https://github.com/rollun-com/rollun-js/tree/master/examples)
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
требуются jquery, bootstrap, boootbox и font-awesome. Добавьте их:
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
                {name: 'dstore', location: '../dojo-dstore'},
                {name: 'rql', location: '../rollun-rql'}
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
Последний являет собой минифицированный bundle [webpack](https://webpack.js.org/)'а
и содержит весь функционал в удобном для загрузки виде. 

> Библиотека написана так, что без упаковки вебпаком работать не будет. Так что 
если вы внесёте в неё изменения, их надо будет добавить в бандл. Для этого из папки 
`rollun-js` выполните команду `wepback` (или `webpack --optimize-minimize`, чтобы 
получить минифицированную версию).  

Далее нам нужно инициализировать сам `crudApp`. Делается это следующим образом:
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
После загрузки DOM эта конструкция вызовет функцию, которая создаст экземпляр dstore/Rest
и инстанцию Vue, привязанную к элементу `exapmle`. Теперь нам нужно создать
этот элемент и добавить в него таблицу:
```
<div id="example">
    <w-crud-app ref='crud' title='myTable' url='' v-bind:options='{}'></w-crud-app>
</div>
```
На этом этапе приложение уже отрисует нам таблицу. Но содержимого в ней не будет,
потому что мы не передали в crudApp параметр `url`. Он должен быть ссылкой на
DataStore, возвращающий записи в Json в виде массива из объектов, предсьавляющих
собой строки таблицы:
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

На этом этапе вы получите полноценную таблицу. Ну, почти. CRUD-операции работать не будут,
потому что вместо полноценного DataStore у нас json ¯\\\_(ツ)_/¯.



