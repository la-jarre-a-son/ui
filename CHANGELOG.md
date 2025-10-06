# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://github.com/la-jarre-a-son/ui/compare/v1.3.0...v1.4.0) (2025-10-06)


### Features

* **Avatar:** added Avatar component ([483e029](https://github.com/la-jarre-a-son/ui/commit/483e029aa8f9c39eb44bcedd7424d8ec941d76c1))
* **Breadcrumb:** add separator prop ([da668ce](https://github.com/la-jarre-a-son/ui/commit/da668cedc40aa3b6c202e447f1cefa66664e6700))
* **Dot:** added Dot component ([99e23f8](https://github.com/la-jarre-a-son/ui/commit/99e23f8563658f80124040de1f9dae3fcf7866ec))
* **Icon:** migrate from fontawesome to flaticon-uicons ([c194af8](https://github.com/la-jarre-a-son/ui/commit/c194af81b1f0028fdefb84d153faacea1b5205fd))


### Bug Fixes

* **CardThumbnail:** add loading logic to transition image ([3c5d01f](https://github.com/la-jarre-a-son/ui/commit/3c5d01f6543dd769ccfef63279be2c387903ce57))
* **Checkbox:** indeterminate takes priority over checked ([24430f2](https://github.com/la-jarre-a-son/ui/commit/24430f2ed3b247184251e8762b2e73248022e2fd))
* **style:** do not use :global in non-module stylesheets ([fd4361f](https://github.com/la-jarre-a-son/ui/commit/fd4361f47cf7ee9e1a4e5e00ef9c30866c0ae5bb))
* **style:** remove color sass functions + update colors ([f5feeab](https://github.com/la-jarre-a-son/ui/commit/f5feeab4cb3d3b9d5a167be9cee2328f14483df3))
* **tests:** fix Dot & Tabs components tests ([8a8c280](https://github.com/la-jarre-a-son/ui/commit/8a8c280e6e583a1996479120f0b1363c2ca02427))

## [1.3.0](https://github.com/la-jarre-a-son/ui/compare/v1.2.3...v1.3.0) (2024-12-23)


### Features

* **Modal:** added disableAutoFocus prop to allow manual autofocus ([13b1bc1](https://github.com/la-jarre-a-son/ui/commit/13b1bc1d075f431399fa591ff1fd7b718ba2a106))

### [1.2.3](https://github.com/la-jarre-a-son/ui/compare/v1.2.2...v1.2.3) (2023-12-22)


### Bug Fixes

* **TreeView:** auto select group when hasCurrent ([376e708](https://github.com/la-jarre-a-son/ui/commit/376e708c150e6b73bd13b96726a77cec67d62e4f))

### [1.2.2](https://github.com/la-jarre-a-son/ui/compare/v1.2.1...v1.2.2) (2023-12-22)


### Bug Fixes

* **TreeView:** correctly walk children when auto opening current ([4e05a36](https://github.com/la-jarre-a-son/ui/commit/4e05a36c9dc5fd0787411a97c17764b2e04318db))

### [1.2.1](https://github.com/la-jarre-a-son/ui/compare/v1.2.0...v1.2.1) (2023-12-22)


### Bug Fixes

* **TreeView:** add sticky + minor fixes ([6989908](https://github.com/la-jarre-a-son/ui/commit/698990881599cc9917d42d892404de3f8ebdb0d4))

## [1.2.0](https://github.com/la-jarre-a-son/ui/compare/v1.1.3...v1.2.0) (2023-12-21)


### Features

* **hooks:**  useAutoScroll ([8b4a328](https://github.com/la-jarre-a-son/ui/commit/8b4a328f698ee524e23a1ac13c961d9ca09d4abc))
* **Tabs:** auto scroll to active tab ([36c241f](https://github.com/la-jarre-a-son/ui/commit/36c241f15a04c76f7e0396d4711cee63a2f53f93))
* **TreeView:** auto open and scroll to current item ([86d697b](https://github.com/la-jarre-a-son/ui/commit/86d697bd9f2dc91b314d5ba92f9bb8e4d20e2caf))


### Bug Fixes

* **ListItem:** set minWidth to 0 for sides ([b97a200](https://github.com/la-jarre-a-son/ui/commit/b97a200d589b716d7707e084110b78df82712c6f))
* **TreeView:** controllable externally and clickable sub items ([730365d](https://github.com/la-jarre-a-son/ui/commit/730365d67ff45bd1ad0bfd37d8ee80f6c9746fbd))

### [1.1.3](https://github.com/la-jarre-a-son/ui/compare/v1.1.2...v1.1.3) (2023-11-07)


### Bug Fixes

* **theme/jar:** added font-family fallbacks ([35e3349](https://github.com/la-jarre-a-son/ui/commit/35e33498103839381988a248257b1fde9e1032b5))

### [1.1.2](https://github.com/la-jarre-a-son/ui/compare/v1.1.1...v1.1.2) (2023-09-02)


### Bug Fixes

* **ModalContainer:** ref in state ([cc889b0](https://github.com/la-jarre-a-son/ui/commit/cc889b09181839c9c08de5b83f5e77ce604051ca))

### [1.1.1](https://github.com/la-jarre-a-son/ui/compare/v1.1.0...v1.1.1) (2023-09-02)


### Bug Fixes

* **ModalContainer:** ref was not always passed ([2936ad4](https://github.com/la-jarre-a-son/ui/commit/2936ad42eb0ebf3c01b8649f7fac853bf7747ee7))

## [1.1.0](https://github.com/la-jarre-a-son/ui/compare/v1.0.2...v1.1.0) (2023-09-02)


### Features

* **ModalContainer:** provide container for Modal and Drawer ([863c753](https://github.com/la-jarre-a-son/ui/commit/863c753afa3271d2da4e5c7bd94cb637f7c3f7e1))


### Bug Fixes

* **Drawer:** ensure fixed width & animation forwards ([2a9e220](https://github.com/la-jarre-a-son/ui/commit/2a9e220638b8a18cf07b754a96ac0762db887e2d))

### [1.0.2](https://github.com/la-jarre-a-son/ui/compare/v1.0.1...v1.0.2) (2023-08-31)


### Bug Fixes

* ensure vertical-align for inline-flex elements ([45763b5](https://github.com/la-jarre-a-son/ui/commit/45763b562544d4ac40361dbc5bf20e61c0b6c2c4))
* **scrollbar:** horizontal scrollbar not correctly stylized ([077867d](https://github.com/la-jarre-a-son/ui/commit/077867dde39b6c33763b430491fe17cd86b74c62))

### 1.0.1 (2023-08-30)


### Bug Fixes

* **FormField:** added margins to match FormControlLabel ([62b1906](https://github.com/la-jarre-a-son/ui/commit/62b19065aab9384458ebd64f179cc43d9fedc8a7))
* **Tab:** override Button background when ghost / outlined ([60b1574](https://github.com/la-jarre-a-son/ui/commit/60b15740fc3c4400908263b9f836ae2e2ffde99c))
