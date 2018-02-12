# w-crud-importer
Позволяет быстро добавляь данные в таблицы rollun-js. Автоматически получает
столбцы таблицы.

Может создаватся с помощью ViewHelper`а. Об этом можно прочитать [здесь]().

ImporterViewHelper принимает асоциативный массив из следующих параметров:
* `"importfields"` - JSON-закодированный массив полей, которые будут записаны (по умолчанию - все,
которые есть в таблице);
* `"noId"` - флаг, включающий режим noId. В этом режиме импортер будет выкусывать
id из списка полей (предполагается, что id - первое поле; по умолчанию - `false`)
> Не играет роли, если указаны importFields

* `"inputseparator"` - разделитель в строке( по умолчанию - `"\t"`)
* `"popupbuttonLabel"` - Название кнопки, вызывающей импортер(по умолчанию - `"Add items"`)
* `"popuptitle"` - Заголовок окна импортера
* `"placeholdertext"` - placeholder в окне ввода
* `"formname"` - имя формы загрузки файов
* `"uploadurl"` - относительный адрес, на который будет отправлен запрос с файлом
* `"uploadaccept"` - тип файла, который можно будет загрузить (MIME тип или расширение)
* `"uploadheaders"` - дополнительные заголовки запроса

Пример:
```
<div id="my-div">
    <w-crud-import
        importfields='["fooField", "barField"]'
        label='Добавить вещей'
        noid='false'
        inputSeparator='\t'
        popuptitle='Добавить БОЛЬШЕ ВЕЩЕЙ!'
        placeholder='Внесите значения, разделённые заданным символом'
        formname='my-form'
        uploadurl='file2ds/test_store'
        uploadaccept='.csv'
        uploadheaders=''>
    </w-crud-import>
</div>
```

