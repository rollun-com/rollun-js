# w-adv-crud-app
Конфигурируемая версия crudApp.

Может создаватся с помощью ViewHelper`a. О нём можно прочитать [здесь]()

Принимает три параметра:
* `url` - (**обязятельный**) URL DataStore, который будет отображен в таблице.
* `title` - Заголовок таблицы.
* `options` - JSON c параметрами.

### Настройка
По умолчанию editForm редактирует все поля таблицы как строки. Это можно
изменить, передав в параметре `options` ключ `"widget_type"`, по которому находится
 обьект, содержащий пары типа ` (имя_поля) : (имя_редактора_для_поля)`.

 Пример:
 ```
 <w-crud-app
     title='Отличная таблица'
     url='http://www.myresource.dev/api/datastore/my_dataStore'
     v-bind:options='{
        "widget_type" : {
            "text" : "text_editor",
            "date" : "dateTime_editor"
        },
        "anotherParam" : "value"
     }'>
 </w-crud-app>
 ```
 Здесь поле `"text"` будет обрабатыватся редактором `"text_editor"`, а поле
 `"date"` - `"dateTime_editor"`. Остальные поля будут отбработаны по умолчанию
 (как строки).