# Тестовая задача:
Файлы для задачи: https://app.aaccent.su/js/frontend-test.zip
1.Необходимо адаптивную страницу со списком товаров, фильтром по брендам. Список товаров находится в файле /assets/products.json, список брендов в файле /assets/brands.json 
2.Дизайн на свое усмотрение, примерный вид отображены в схемах desktop.png, mobile.png 
3.Также на странице должна быть иконка корзины, со счетчиком товаров в корзине. По клику на иконку должен совершаться переход на страницу корзины.
4.Должна быть пагинация, по 6 товаров на страницу
5.Должна быть возможность отправлять товары в корзину. Счетчик должен обновляться без перезагрузки страницы. 6.Фильтрация товаров должна проходить без перезагрузки.
7.На странице корзины должен быть список товаров, с ценой, переключателем количества, автоматическим пересчетом итоговый цены, должна быть поля имя, телефон и кнопка «Оформить заказ».
8.При оформлении заказа должен отправиться POST-запрос на адрес https://app.aaccent.su/js/confirm.php с json-данными о заказе в свободном формате.
Запрос вернет JSON-ответ “{“result”:”ok”}” , по возвращению этих данных должно всплыть модальное окно об успешном оформлении, при нажатии на кнопку «закрыть» корзина должна очищаться и переадресовываться на главную страницу
9.Веб-приложение необходимо сделать в виде SPA-приложения.
10.Результат должен быть выгружен на github.com 
Будет плюсом добавление «фишек», а-ля сортировки товаров, окон с быстрым просмотром товаров. 
Можно добавлять дополнительные json-данные, файлы и пр., по усмотрению исполнителя

## Прежде чем приступить к установке убедитесь что у вас имеются следующие компоненты списка:

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

### Тестовая страница [https://mvodev.github.io/aaccent/]

### Клонирование
```
  git clone https://github.com/mvodev/aaccent.git
```
### Установка
```
  npm i
```
### Сборка проекта в режиме dev server
```
  npm run dev
```
### Сборка проекта в режиме production
```
  npm run build
```
## Результат сборки проекта
  Находится в папке dist