## Po instalacji node_modules

# serwer
- node index.js
# apka
- npm start

- dane sa pobierane z serwera o porcie 5000 :5000/meals
- mozna filtrowac dane po tym czy istnieje link do youtube, kategorii, pochodzeniu oraz sortować po nazwie
- do widoku szczegolowego przechodzi sie po kliknieci na zdjecie badz nazwe dania
- do widoku edycji poprzez ikonke w prawym gornym rogu karty z daniem, co robi reszta ikonek mozna sie domyslic

- formularz dodawania zawiera 4 walidatory
Name musi byc > 3 i < 50
Area jest required i >3 <5
Category musi byc kategoria ktoras z tych: 
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",

Link do youtube ma regexp ale nie musi byc podany