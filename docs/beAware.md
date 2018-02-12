# Важно
#### 1. PUT и POST запросы в dstore
https://github.com/SitePen/dstore/blob/018918af486c0e1a28d3747e07d7e821d2fe9659/Rest.js#L75
https://github.com/SitePen/dstore/blob/018918af486c0e1a28d3747e07d7e821d2fe9659/Rest.js#L88
Для того, чтобы отправлять POST запросы, нужно в `options` передать
`incremental: true` и не передавать `id`. Во всех других случаях уйдёт PUT
запрос

#### 2. read с несуществующим id в dstore
https://github.com/SitePen/dstore/blob/018918af486c0e1a28d3747e07d7e821d2fe9659/Store.js#L180
https://github.com/SitePen/dstore/blob/018918af486c0e1a28d3747e07d7e821d2fe9659/Store.js#L187
dstore создаст модель хранилища со всеми свойствами, которые были определены
в обьекте ответа. То есть в ответ на такой запрос ожидается `null` или пустой обьект
