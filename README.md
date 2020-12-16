[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

# :space_invader: React Native Shopping List

Application written for university subject purposes.

It is used to mark the shopping list with informations such as product name, price in PLN, quantity and status whetever the item has been purchased.

Moreover, in the settings view, the user can choose the color theme of the application. This functionality has been programmed to automatically get HEX values from the theme.ts file in the src/utils directory. When a new theme object is added, it is automatically added to the "Settings" screen in the application build level. The form of adding new colors also corresponds to the JSON format, so you can implement loading themes to the application in a very simple and quick way, e.g. from an external server thanks to REST API / GraphQL using axios/apollo.

All methods of product modification (adding, removing, modifying) are also supported by the SQLite database which is implemented in React Native using the "react-native-sqlite-storage" library. These methods have been implemented in the "src/utils/sqlite.ts" file.

The entire application was written in TypeScript (TSX). Recoil.js is used for state management.

## :iphone: Screenshots

<img src="https://raw.githubusercontent.com/ecosse3/pjatk-smb1-rn-shopping-list/master/screenshots/Screenshot1.png?raw=true" width="300" /> <img src="https://raw.githubusercontent.com/ecosse3/pjatk-smb1-rn-shopping-list/master/screenshots/Screenshot2.png?raw=true" width="300" />
<img src="https://raw.githubusercontent.com/ecosse3/pjatk-smb1-rn-shopping-list/master/screenshots/Screenshot3.png?raw=true" width="300" /> <img src="https://raw.githubusercontent.com/ecosse3/pjatk-smb1-rn-shopping-list/master/screenshots/Screenshot4.png?raw=true" width="300" />

## :bookmark: License

This project is [MIT](LICENSE) licensed.
