# Auctionator .lua to .csv converter

Программа для конвертации lua файлов созданных аукцинатором в csv для использования в таблицах эксель
Необходимые для сохранения товары указаны в массиве `namesToSearch` в файле `lua2csv.msj`

## Установка

1. Качаем и устанавливаем nodejs [по ссылке](https://nodejs.org/en/download/)
2. Качаем архив с программой с этой страницы, нажав на зелёную кнопку Code и выбрав пункт Download Zip
3. Распаковываем и используем

## Использование

1. Кладём .lua файлы в папку lua_files
2. Запускаем программу (node ./lua2csv.mjs), либо мб можно даже даблкликнуть
3. Получаем готовые csv в папке csv_files
