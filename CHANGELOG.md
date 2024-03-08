# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [10.1.1](https://github.com/haiilo/catalyst/compare/v6.5.1...v10.1.1) (2024-03-08)


### ⚠ BREAKING CHANGES

* **angular:** change dialog actions: replace row-reverse with justify-content end to fix a11y (#451)
* **core:** make translator property in i18n service private. use set() to update it
* **tokens:** rename --font-family-body to font-family-base
* **core:** full rework of editorial typo styles incl. removal of default margins (#405)

### Features

* add attachToElement property to cat-datepicker component ([#462](https://github.com/haiilo/catalyst/issues/462)) ([1d6c299](https://github.com/haiilo/catalyst/commit/1d6c2998f6a7413bf31ad375e863ff3416549d08))
* add cat-label css class helper ([bd56b19](https://github.com/haiilo/catalyst/commit/bd56b195455daa0aa02afcbda91ad1ce5e77b3e7))
* add new info state to theming ([3c8c2ba](https://github.com/haiilo/catalyst/commit/3c8c2ba41fb38e2158de8809ec816d4df31e8890))
* add space-between alignment for dialog actions buttons ([#450](https://github.com/haiilo/catalyst/issues/450)) ([a4abb0f](https://github.com/haiilo/catalyst/commit/a4abb0f458fcefd8641ad768a512de16ae371057))
* add styles for cat-dialog-pull-out class ([#448](https://github.com/haiilo/catalyst/issues/448)) ([acba12b](https://github.com/haiilo/catalyst/commit/acba12b1a2efba2c45cca907707a9c05ac2f4c8e))
* **angular:** add panelClass to dialogs ([214e44e](https://github.com/haiilo/catalyst/commit/214e44e35f21b7529697e7a710f6321181a7cfb1))
* **angular:** added errorInit to show form errors directly after initialization (default: false) ([c18a400](https://github.com/haiilo/catalyst/commit/c18a4000c1f3e0360f95ba838726f0a600a23c22))
* **angular:** adjust peer dependency versions for angular and angular CDK ([a6403f7](https://github.com/haiilo/catalyst/commit/a6403f7142dfe7ed926aa646571f8752015eaff6))
* **angular:** change dialog actions: replace row-reverse with justify-content end to fix a11y ([#451](https://github.com/haiilo/catalyst/issues/451)) ([2e48742](https://github.com/haiilo/catalyst/commit/2e48742bbfb5d4071ecd8efa09ab99e352b27c6f))
* **angular:** improve i18n logging ([bdf0979](https://github.com/haiilo/catalyst/commit/bdf09796133a5d046a61b78c8657bd975b58afd3))
* **angular:** update prettier ([eb1b37e](https://github.com/haiilo/catalyst/commit/eb1b37e073cbc1bfd9fe1fa916fe43687f095730))
* bootstrap releases ([#402](https://github.com/haiilo/catalyst/issues/402)) ([70c28a8](https://github.com/haiilo/catalyst/commit/70c28a83ae1897f773cb10000f771eceeb8cd976))
* **core:** add more select connector helpers ([98bad9a](https://github.com/haiilo/catalyst/commit/98bad9aa890eb553d9227c100cdb4fae76c27dc6))
* **core:** add password toggle button to inputs ([6779f5d](https://github.com/haiilo/catalyst/commit/6779f5d91572ea6f1d9131b944c2f1e0c0767fca))
* **core:** add select methods for focus and blur ([1d3ac8f](https://github.com/haiilo/catalyst/commit/1d3ac8f2dc73ec1cbcc76a8407fb7ebeb754ba98))
* **core:** full rework of editorial typo styles incl. removal of default margins ([#405](https://github.com/haiilo/catalyst/issues/405)) ([70e6b9e](https://github.com/haiilo/catalyst/commit/70e6b9ea687f68fad5f1fa6da42e1f917133d584))
* **core:** make translator property in i18n service private. use set() to update it ([d4c21e5](https://github.com/haiilo/catalyst/commit/d4c21e5711d1a99d1929446946c8a3c8c9beb7c3))
* **core:** move to @stencil/core v4.8.0 ([f272cbb](https://github.com/haiilo/catalyst/commit/f272cbb3147434fb4adefc3db29cb0e3bc7aa7a8))
* **core:** streamline CSS shadow parts on form elements ([5dd17a4](https://github.com/haiilo/catalyst/commit/5dd17a4bf92363ee0a759cee1085a29e02cbad38))
* **core:** support error state of tabs ([ebc28b0](https://github.com/haiilo/catalyst/commit/ebc28b0a4fb0c97555af410259b888c132a11e4e))
* **core:** support slotted labels and hints in datepicker (closes [#424](https://github.com/haiilo/catalyst/issues/424)) ([6ac32a4](https://github.com/haiilo/catalyst/commit/6ac32a4d876cadc76f0ac7c80c5efc2023f9608f))
* **core:** update eslint ([9e16908](https://github.com/haiilo/catalyst/commit/9e1690808d83ced15855a67efbc98fb09299715c))
* **core:** update icons to v2.1.0 ([66015d0](https://github.com/haiilo/catalyst/commit/66015d0e5eec2295f00af66bfdb2572eb6c32939))
* **core:** update prettier to v3.1.0 ([6821fad](https://github.com/haiilo/catalyst/commit/6821fad0a7bef4a0be664c601854d9afa1f84bf0))
* **core:** update ts and finally move to jest v29 ([6a1c0ac](https://github.com/haiilo/catalyst/commit/6a1c0acd633bd02eab4f03139038a1921e9c9508))
* support non-boolean values for checkboxes and toggles ([e9ea78e](https://github.com/haiilo/catalyst/commit/e9ea78e0abe916f8fb1af926489346833e29592f))
* **tokens:** update styledictionary ([e97cbcd](https://github.com/haiilo/catalyst/commit/e97cbcd70d4d613aa8c16f298afd8bbff41cb9f4))
* update to stencil 4.7.1 ([599ce34](https://github.com/haiilo/catalyst/commit/599ce344ed859494447c9fd3471ca01465dc08b1))


### Bug Fixes

* 21242 as the motion reduction implementation prevents transition dom events from firing ([#417](https://github.com/haiilo/catalyst/issues/417)) ([672a027](https://github.com/haiilo/catalyst/commit/672a02797e777def2fdefda00bef6e020914d216))
* add flip fallback axis for tooltips ([#458](https://github.com/haiilo/catalyst/issues/458)) ([7e47cf1](https://github.com/haiilo/catalyst/commit/7e47cf18c0dc07b8bb032598de2511cb67d40ba4))
* adjust release please ci setup ([7550312](https://github.com/haiilo/catalyst/commit/75503127c5f32f8fb2bcd43d54441db67d785159))
* adjust release please ci setup ([fd7a0d5](https://github.com/haiilo/catalyst/commit/fd7a0d55b2688b422166d0d5b378142b6b6d99b2))
* **angular-formly:** add missing errorInit prop to formly bindings ([77ad994](https://github.com/haiilo/catalyst/commit/77ad99422935de2e43d3f119a6073bb1c019fe50))
* **angular:** add germany as language ([#477](https://github.com/haiilo/catalyst/issues/477)) ([99e28d5](https://github.com/haiilo/catalyst/commit/99e28d5b65c8795c42abd09891f21fcfd656f5ec))
* backport jest ([1e498df](https://github.com/haiilo/catalyst/commit/1e498dfc380e7c7a4c240e1150a60c4a13e92962))
* cleanup ([07ec13d](https://github.com/haiilo/catalyst/commit/07ec13d88bd9d77944f4b9f8ec2850ab0474afb9))
* **core:** activeTab in tabs is not mutable (closes [#406](https://github.com/haiilo/catalyst/issues/406)) ([8d9f87c](https://github.com/haiilo/catalyst/commit/8d9f87c9b76114c5cf0b0e416f2c34ad67a38f12))
* **core:** add missing color helpers ([3067619](https://github.com/haiilo/catalyst/commit/30676191c68b6280a0775887c77de9b0cf905890))
* **core:** add missing spacer var for forms ([8cfea11](https://github.com/haiilo/catalyst/commit/8cfea11362e3c00d09232a7ef27b9a88b5f851c8))
* **core:** add missing translation keys to CDN version ([c8fce82](https://github.com/haiilo/catalyst/commit/c8fce82f0d9d93ed75c30f97a9c71f2ad795a749))
* **core:** adjust spacings ([6379808](https://github.com/haiilo/catalyst/commit/6379808dbdc7c29c378d27e3777489bcb055053e))
* **core:** avoid flex wrap in single selects ([e09fba1](https://github.com/haiilo/catalyst/commit/e09fba140fe5f2606eafcd8fe6073c122a580c56))
* **core:** emit catClick on tab click (closes [#416](https://github.com/haiilo/catalyst/issues/416)) ([73a5a95](https://github.com/haiilo/catalyst/commit/73a5a95a384e66d075cd75b39be42cee9c102c4c))
* **core:** fix broken catalyst color references in tooltips, alerts and color utilities ([25112fe](https://github.com/haiilo/catalyst/commit/25112feb4e59bae88494c0eeb6475b7faff30aba))
* **core:** fix broken datepicker days (closes [#438](https://github.com/haiilo/catalyst/issues/438)) ([adc48b9](https://github.com/haiilo/catalyst/commit/adc48b997922651a430f2c9486c06bc0ab65377e))
* **core:** fix broken dialog background (closes [#436](https://github.com/haiilo/catalyst/issues/436)) ([0dab1ad](https://github.com/haiilo/catalyst/commit/0dab1ad459d6d4ad75ff12f8e52868f2a816be0c))
* **core:** fix broken dialog background definition ([795956d](https://github.com/haiilo/catalyst/commit/795956d9e07d8b83947f587ff0b2abe99dbda605))
* **core:** fix broken month labels in datepicker (closes [#456](https://github.com/haiilo/catalyst/issues/456)) ([e4de85c](https://github.com/haiilo/catalyst/commit/e4de85c41840d37ce2c0bccbc122b9aa5739639b))
* **core:** fix broken scss build ([386f978](https://github.com/haiilo/catalyst/commit/386f97822a96304867c0a3ac8abb03966eecf945))
* **core:** fix broken tests in CI ([e65f344](https://github.com/haiilo/catalyst/commit/e65f344affa6eb9abb9391e40a2bb26ca1ed7cb6))
* **core:** fix broken week day names in datepicker ([35d8e12](https://github.com/haiilo/catalyst/commit/35d8e1237bacdfbc438120c6f07213acb1d9492b))
* **core:** fix linting error ([1fd2512](https://github.com/haiilo/catalyst/commit/1fd2512de6cacab51ba0811b3d549a2e563eb349))
* **core:** fix pnpm lock file ([#476](https://github.com/haiilo/catalyst/issues/476)) ([e73475a](https://github.com/haiilo/catalyst/commit/e73475a28d5368315b6c89f3afd2fcc6a5c07aa3))
* **core:** fix wrng indentation of radio buttons ([6260e58](https://github.com/haiilo/catalyst/commit/6260e58ca1bcea71c96619a9e3feee1d6b82a6a0))
* **core:** improve formly handling and select connector utils ([33ccc89](https://github.com/haiilo/catalyst/commit/33ccc8991f194ad7fc626162e8d4bc7d053447ee))
* **core:** language switch is broken in demo page ([4de6e94](https://github.com/haiilo/catalyst/commit/4de6e9470bf713d7cc73b23f43a58fca29b6795f))
* **core:** radio buttons accept non-string values ([dec8302](https://github.com/haiilo/catalyst/commit/dec83025c9fad14e1fd68fc1220a1af422bb7aac))
* **core:** remove console log ([d1d5b59](https://github.com/haiilo/catalyst/commit/d1d5b597ca84b8a5f31ff297b1d90edb21127990))
* **core:** remove prettier errors ([5ab6dbc](https://github.com/haiilo/catalyst/commit/5ab6dbcf230f0355af21ed6dfe2a8cda8357bcdc))
* **core:** remove unneded margin overwrite from catalyst headline classes ([25ffe00](https://github.com/haiilo/catalyst/commit/25ffe0057bcc56eadf282e20c5c45151e372b980))
* **core:** set bold font to 700 ([932551a](https://github.com/haiilo/catalyst/commit/932551a5d36531f01fd606c34e270f000adb62cf))
* **core:** support narrow articles ([edd7092](https://github.com/haiilo/catalyst/commit/edd709270351c6c596bebf382abee2385e986397))
* **core:** tooltips are announced by the screenreader (closes [#425](https://github.com/haiilo/catalyst/issues/425)) ([71df679](https://github.com/haiilo/catalyst/commit/71df679c068d62f86913f0de9a1730a8006edf19))
* **core:** update lockfile ([6278c0d](https://github.com/haiilo/catalyst/commit/6278c0d748be4ee4cc793956626c3907271cc8de))
* **core:** xs icon buttons have wrong height ([28fc081](https://github.com/haiilo/catalyst/commit/28fc0815438eac2645b08631f6c157ec1b758609))
* datepicker disabled state change is unstable ([#466](https://github.com/haiilo/catalyst/issues/466)) ([d287f49](https://github.com/haiilo/catalyst/commit/d287f492ddb9fcac9ff2875b0e37c707259ea420))
* extend content width to 100% in cat-alert component ([96d9831](https://github.com/haiilo/catalyst/commit/96d9831049a69dbabe4d2de70b6e2983e2995d67))
* fix pnpm lock file ([#474](https://github.com/haiilo/catalyst/issues/474)) ([1c22734](https://github.com/haiilo/catalyst/commit/1c22734109b68bb4f5b246c5a930cc027d1dddf1))
* make mode dynamically changeable for datepicker ([#468](https://github.com/haiilo/catalyst/issues/468)) ([d17d28a](https://github.com/haiilo/catalyst/commit/d17d28a387f0299f8acf3fc0bf5ad963e67948d3))
* release.yml ([baf99ea](https://github.com/haiilo/catalyst/commit/baf99ea32d32e267410e4e6cb77590ff7831650a))
* run prettier after build ([10e973c](https://github.com/haiilo/catalyst/commit/10e973cec4c69667cad7b0213462ce8a44b66df6))
* **tokens:** fix broken token build ([be1d67c](https://github.com/haiilo/catalyst/commit/be1d67c69774541443028d896cc4013b2f459673))
* **tokens:** rename --font-family-body to font-family-base ([c6804d9](https://github.com/haiilo/catalyst/commit/c6804d93a6f96294f36c9c79fce557eac3940f67))
* trigger new release ([7c8b7a1](https://github.com/haiilo/catalyst/commit/7c8b7a1762b60199704936694fd81b6c005f67c2))
* update lock file ([#471](https://github.com/haiilo/catalyst/issues/471)) ([6eda0b7](https://github.com/haiilo/catalyst/commit/6eda0b7a87cc54064f4a1cddfc322ee09e8cf52d))
* update lockfile ([fdc3ab0](https://github.com/haiilo/catalyst/commit/fdc3ab0573d37177fd3b99e43850f41cd63f4e7e))
* update release-please config ([619c19e](https://github.com/haiilo/catalyst/commit/619c19ec443613a0c17e6c632d5c9966613dc68c))
* update typo styles for nested links in alerts ([4ca67d9](https://github.com/haiilo/catalyst/commit/4ca67d912dbc3cfa90fe6889034819d45175a4ca))

### [6.5.1](https://github.com/haiilo/catalyst/compare/v6.5.0...v6.5.1) (2023-10-16)


### Bug Fixes

* **core:** not able to programmatically set active tab ([ec1cc1c](https://github.com/haiilo/catalyst/commit/ec1cc1cb1a0d6fca6a68734250b31c897df2077d))
* **core:** update radio group on dynamic radio changes (closes [#400](https://github.com/haiilo/catalyst/issues/400)) ([2761ceb](https://github.com/haiilo/catalyst/commit/2761cebc671f3d843a2e2dd6f921e550bb9fc192))

## [6.5.0](https://github.com/haiilo/catalyst/compare/v6.4.7...v6.5.0) (2023-10-16)


### Features

* **core:** spike translation function support ([14ef956](https://github.com/haiilo/catalyst/commit/14ef9569a2e300e273281476ec7d356dc2cf611a))
* new look for alerts and badges ([#396](https://github.com/haiilo/catalyst/issues/396)) ([b572c8e](https://github.com/haiilo/catalyst/commit/b572c8efe546dfef57756f6ab25575467edcac1e))


### Bug Fixes

* **angular:** update errors on blur (closes [#397](https://github.com/haiilo/catalyst/issues/397)) ([29254c2](https://github.com/haiilo/catalyst/commit/29254c246ea1b3c2bcdb0ae1f37316599a734151))
* **core:** allow datepicker to open on icon click (closes [#394](https://github.com/haiilo/catalyst/issues/394)) ([8c5ee85](https://github.com/haiilo/catalyst/commit/8c5ee856242c84e95df11ffd693b122288e3a453))
* **core:** nested selects closes modal on esc (closes [#387](https://github.com/haiilo/catalyst/issues/387)) ([d425bf1](https://github.com/haiilo/catalyst/commit/d425bf1227f3b050a9ac881679ff1bc1045e2a54))
* **core:** update dependencies ([7e8f331](https://github.com/haiilo/catalyst/commit/7e8f331e38afb961ea6d49c28a5e1554838058ea))
* form error hints are not announced by the screen reader ([#398](https://github.com/haiilo/catalyst/issues/398)) ([9e23dca](https://github.com/haiilo/catalyst/commit/9e23dca07347bbbee5c0c140194a44de2c1aa428))
* **tokens:** update dev dependencies ([7cd9290](https://github.com/haiilo/catalyst/commit/7cd92900f72c294f3e0b1081133f7a92499b6442))
* update dev dependencies ([430566b](https://github.com/haiilo/catalyst/commit/430566b82809d1af760a36e27ddddd5856804136))

### [6.4.7](https://github.com/haiilo/catalyst/compare/v6.4.6...v6.4.7) (2023-09-13)


### Bug Fixes

* **angular:** angular CDK dialog styles are not scoped properly ([38788af](https://github.com/haiilo/catalyst/commit/38788af854f5025cfae3ac0153d1d98d0bc848e7))

### [6.4.6](https://github.com/haiilo/catalyst/compare/v6.4.5...v6.4.6) (2023-09-08)


### Bug Fixes

* **core:** datepicker uses incorrect formatting tokens ([742a8b0](https://github.com/haiilo/catalyst/commit/742a8b05e2ca6b4e2b499185593ff103d28aedb1))

### [6.4.5](https://github.com/haiilo/catalyst/compare/v6.4.4...v6.4.5) (2023-08-29)


### Bug Fixes

* **core:** single select shows no items when there are still options (closes [#364](https://github.com/haiilo/catalyst/issues/364)) ([146c6f7](https://github.com/haiilo/catalyst/commit/146c6f7dec9427ee40e2c4c8010898831893b6b3))

### [6.4.4](https://github.com/haiilo/catalyst/compare/v6.4.3...v6.4.4) (2023-08-28)


### Bug Fixes

* **core:** button font weight is not adjustable (closes [#365](https://github.com/haiilo/catalyst/issues/365)) ([00b6343](https://github.com/haiilo/catalyst/commit/00b634352d86deebf19dc040554129b39421e519))

### [6.4.3](https://github.com/haiilo/catalyst/compare/v6.4.2...v6.4.3) (2023-08-28)


### Features

* new type section on overview page ([4636f85](https://github.com/haiilo/catalyst/commit/4636f855790c76eeb40e797b11f3a20aaaeac150))


### Bug Fixes

* **core:** fixed broken spacings in nav cat-card ([#360](https://github.com/haiilo/catalyst/issues/360)) ([3bcaf73](https://github.com/haiilo/catalyst/commit/3bcaf73b61b9cd255a2a8ef7097f579d87484b55))
* **core:** min and max are not updating after datepicker initialized (closes [#370](https://github.com/haiilo/catalyst/issues/370)) ([9ee44d0](https://github.com/haiilo/catalyst/commit/9ee44d025dbc59f5cae60a2cd9b5d85642f5b783))

### [6.4.2](https://github.com/haiilo/catalyst/compare/v6.4.1...v6.4.2) (2023-08-15)


### Features

* **core:** rework main overview site ([07f3f48](https://github.com/haiilo/catalyst/commit/07f3f48f51e4ea858332345eaafe8f7a233c791e))


### Bug Fixes

* **core:** emit correct values for daterange picker ([087dcb8](https://github.com/haiilo/catalyst/commit/087dcb844ca2a03c894b01d8becea731ecc684a1))
* **core:** sync setLocale across multiple i18n registries ([22bcd01](https://github.com/haiilo/catalyst/commit/22bcd017f063ceb4f4bb7e555fbafa9a4f1ff3e0))
* **core:** update dependencies ([9da11bd](https://github.com/haiilo/catalyst/commit/9da11bd6777dfcb39ac7e855cc5ffa55b1cb1de5))

### [6.4.1](https://github.com/haiilo/catalyst/compare/v6.4.0...v6.4.1) (2023-08-09)


### Bug Fixes

* **core:** remove prettier errors ([dee7a07](https://github.com/haiilo/catalyst/commit/dee7a07d4f42f866ea55b00c846bd9ad72c1e379))
* **core:** use correct token asset path ([73eb465](https://github.com/haiilo/catalyst/commit/73eb46538a9d7c745e7f8ed10dbe02ab6b7ac8dd))

## [6.4.0](https://github.com/haiilo/catalyst/compare/v6.3.3...v6.4.0) (2023-08-08)


### Features

* **core:** Added source sans 3 as variable font option ([#334](https://github.com/haiilo/catalyst/issues/334)) ([5824a0e](https://github.com/haiilo/catalyst/commit/5824a0e035321e1eea4bb7697f4b1a6ede09ca67))
* **core:** new "link" style for button ([#330](https://github.com/haiilo/catalyst/issues/330)) ([833a98c](https://github.com/haiilo/catalyst/commit/833a98c6148b6ab069a37fab271bcd239cdde895))

### [6.3.3](https://github.com/haiilo/catalyst/compare/v6.3.2...v6.3.3) (2023-08-03)


### Bug Fixes

* **core:** broken attribute to hide labels for inputs ([#332](https://github.com/haiilo/catalyst/issues/332)) ([32efbb6](https://github.com/haiilo/catalyst/commit/32efbb639d6bc5332a2b7b4d68c64a9ba739b304))
* **core:** clear buttons close dropdown, datepicker randomly opens again ([#343](https://github.com/haiilo/catalyst/issues/343)) ([57c99c4](https://github.com/haiilo/catalyst/commit/57c99c47bc70dfdafc6cbb652b9b10894e80e0eb))

### [6.3.2](https://github.com/haiilo/catalyst/compare/v6.3.1...v6.3.2) (2023-08-02)


### Features

* minor follow up improvements for tabs ([831ad9f](https://github.com/haiilo/catalyst/commit/831ad9fac5463be7496b976b3bfed67ec737befe))


### Bug Fixes

* **angular:** update angular dependencies ([b31ac53](https://github.com/haiilo/catalyst/commit/b31ac53622ac725cd51c4ad023c7bb45200ec486))
* **core:** cat-datepicker inside cat-dropdown leads to misbehavior ([#340](https://github.com/haiilo/catalyst/issues/340)) ([0bfb610](https://github.com/haiilo/catalyst/commit/0bfb610d7c88a62ca078303a8e5bcd988c10962f))
* **core:** cat-select doesn't update properly when using search and clicking outside after selection ([#315](https://github.com/haiilo/catalyst/issues/315)) ([2df8a9d](https://github.com/haiilo/catalyst/commit/2df8a9dc7e45489b6b16e77418a733c3c64233cf))
* **core:** keep option list available after pressing the clear button ([#314](https://github.com/haiilo/catalyst/issues/314)) ([439e49d](https://github.com/haiilo/catalyst/commit/439e49dd5d54c6d502b38dcd3ddefece99d7e0bb))
* **core:** update core dependencies ([171a025](https://github.com/haiilo/catalyst/commit/171a0259938899da249c28f2d0c9cd823bec4884))
* fix broken ci tasks ([25e24d4](https://github.com/haiilo/catalyst/commit/25e24d472f4df158fcec3fccf0dc19c60a68e2d8))

### [6.3.1](https://github.com/haiilo/catalyst/compare/v6.3.0...v6.3.1) (2023-07-26)


### Bug Fixes

* **core:** datepicker not updating properly when setting to / from disabled ([c425d66](https://github.com/haiilo/catalyst/commit/c425d6661d589ced10e8f221f7da98a61db74a96))

## [6.3.0](https://github.com/haiilo/catalyst/compare/v6.2.3...v6.3.0) (2023-07-25)


### Features

* **core:** implement inline datepicker ([#318](https://github.com/haiilo/catalyst/issues/318)) ([fd86c7b](https://github.com/haiilo/catalyst/commit/fd86c7bd99af8348e520123d7d327d69b3ca5bb2))
* **core:** provide a local string array connector ([#313](https://github.com/haiilo/catalyst/issues/313)) ([c102c06](https://github.com/haiilo/catalyst/commit/c102c06e51b57508efe389c83a62267022f09810))


### Bug Fixes

* **core:** add missing proxies for datepicker-inline ([997f2f5](https://github.com/haiilo/catalyst/commit/997f2f5f85b080d3e24c687f6f563db7c6d70587))
* **core:** increase base z-index to 1000 ([2440bcb](https://github.com/haiilo/catalyst/commit/2440bcbe202c85afbca0cba6659ae168aaa422c5))

### [6.2.3](https://github.com/haiilo/catalyst/compare/v6.2.2...v6.2.3) (2023-07-20)


### Features

* **core:** adjust tabs padding and hover & active states ([#293](https://github.com/haiilo/catalyst/issues/293)) ([f1fc9f2](https://github.com/haiilo/catalyst/commit/f1fc9f22c220ce4262f4022d1f83b44d740f1bb0))
* **core:** improved visuals and animations for dropdowns ([#305](https://github.com/haiilo/catalyst/issues/305)) ([f237a1b](https://github.com/haiilo/catalyst/commit/f237a1b2e04474870690a89d3d36c3a500c85b66))
* **core:** inputs now use ellipsis when text is truncated ([#306](https://github.com/haiilo/catalyst/issues/306)) ([e459781](https://github.com/haiilo/catalyst/commit/e4597819bf4a071defbb2dd3f338edb0b427b53c))
* **core:** set display flex for cat-flex-row and cat-flex-col helper classes ([75a88f1](https://github.com/haiilo/catalyst/commit/75a88f15b32c9b2f27ed4c1edd0e7511383f86b3))


### Bug Fixes

* **core:** base z-index can now be set via CSS properties. fixes [#303](https://github.com/haiilo/catalyst/issues/303), [#308](https://github.com/haiilo/catalyst/issues/308) ([#311](https://github.com/haiilo/catalyst/issues/311)) ([84147ad](https://github.com/haiilo/catalyst/commit/84147ad2a170dba6f6fd87a367a9ff2ef26810a5))
* **core:** update datepicker while handling via form ([#309](https://github.com/haiilo/catalyst/issues/309)) ([9059f4f](https://github.com/haiilo/catalyst/commit/9059f4f799d38f1eff34d339b574eccdfde84577))

### [6.2.2](https://github.com/haiilo/catalyst/compare/v6.2.1...v6.2.2) (2023-07-17)


### Features

* **tokens:** change tokens to comply with the design token community group (DTCG) specification ([09240e9](https://github.com/haiilo/catalyst/commit/09240e9281252bc3358f031ceb970e564a76a5e7))


### Bug Fixes

* **core:** enable cat-select dropdown flip if there is available space ([#288](https://github.com/haiilo/catalyst/issues/288)) ([5b626ba](https://github.com/haiilo/catalyst/commit/5b626ba38dd60b5793a15288a09a3cc1ad6fcf89))
* **core:** fix hidden input label ([#286](https://github.com/haiilo/catalyst/issues/286)) ([66339c9](https://github.com/haiilo/catalyst/commit/66339c925dabc7e2899c236a6680fe6d9c8e8152))
* **core:** radio group listening to non radio events ([#300](https://github.com/haiilo/catalyst/issues/300)) ([0280dba](https://github.com/haiilo/catalyst/commit/0280dba078e81e7b17e5df4f7d735f563f1aa697))

### [6.2.1](https://github.com/haiilo/catalyst/compare/v6.1.2...v6.2.1) (2023-07-07)


### Features

* move to pnpm ([#287](https://github.com/haiilo/catalyst/issues/287)) ([a8cea1b](https://github.com/haiilo/catalyst/commit/a8cea1ba9aa193f85a750121d9960d5082839e36))


### Bug Fixes

* **core:** adjust test pattern to fix tests ([c3e55e4](https://github.com/haiilo/catalyst/commit/c3e55e40fc75c12e8105af4bad98045bb18bac40))
* **core:** rework tooltip show / hide logic to prevent sticky tooltips ([7dedddf](https://github.com/haiilo/catalyst/commit/7dedddf0929408dde5cbfa0de0a01d5bf2994b63))

## [6.2.0](https://github.com/haiilo/catalyst/compare/v6.1.4...v6.2.0) (2023-07-06)

### [6.1.4](https://github.com/haiilo/catalyst/compare/v6.1.3...v6.1.4) (2023-07-06)

### [6.1.3](https://github.com/haiilo/catalyst/compare/v6.1.2...v6.1.3) (2023-07-06)

### [6.1.2](https://github.com/haiilo/catalyst/compare/v6.1.1...v6.1.2) (2023-07-05)


### Bug Fixes

* **core:** fix test setup ([846d3fc](https://github.com/haiilo/catalyst/commit/846d3fc5086980002b9cc464e2a392f220cd8976))
* **core:** update checkbox behaviour for indeterminate state ([1850788](https://github.com/haiilo/catalyst/commit/1850788df921a49df77f9db5ea754bf104ac3db7))

### [6.1.1](https://github.com/haiilo/catalyst/compare/v6.1.0...v6.1.1) (2023-07-03)


### Features

* update stencil to version 4.0.1 ([#282](https://github.com/haiilo/catalyst/issues/282)) ([62b59a7](https://github.com/haiilo/catalyst/commit/62b59a7577ae574b277d05b75a2e1eae440ec34b))


### Bug Fixes

* **core:** fix cat-select tagging support for selecting newly created… ([#240](https://github.com/haiilo/catalyst/issues/240)) ([d2e45b4](https://github.com/haiilo/catalyst/commit/d2e45b42ebb5941f64fdc2852b7b04dedd16313d))
* **core:** toggle indeterminate state ([#281](https://github.com/haiilo/catalyst/issues/281)) ([6cc1ac3](https://github.com/haiilo/catalyst/commit/6cc1ac3bd537a61002aa5ee192e1629f2447db66))

## [6.1.0](https://github.com/haiilo/catalyst/compare/v6.0.3...v6.1.0) (2023-07-03)


### Bug Fixes

* **core:** update peer dependencies ([b8a0831](https://github.com/haiilo/catalyst/commit/b8a0831cf8376b3cd02e61e0f0fa0f0d9e3ebb88))

### [6.0.3](https://github.com/haiilo/catalyst/compare/v6.0.2...v6.0.3) (2023-07-03)


### Bug Fixes

* **core:** add missing font weight 600 to lato ([ce15940](https://github.com/haiilo/catalyst/commit/ce159409822b08b8d59700338035b30025971c1c))
* **core:** regenerate package-lock.json file ([91d5884](https://github.com/haiilo/catalyst/commit/91d5884d49581565bfa1ec66a75c16dccee745aa))
* **core:** remove duplicate cat-muted definition ([e1f7aaf](https://github.com/haiilo/catalyst/commit/e1f7aafa5fedb86f9ebdd194d1b20d5d743f3587))
* **core:** remove outdated i18n messages ([0459e56](https://github.com/haiilo/catalyst/commit/0459e565caed8da77b7d4258d45d5da941c20eca))

### [6.0.2](https://github.com/haiilo/catalyst/compare/v6.0.1...v6.0.2) (2023-06-19)


### Bug Fixes

* **release:** update ci workflow ([ad1cafd](https://github.com/haiilo/catalyst/commit/ad1cafd41e1f5c9065e1f3731fd308141326c661))

### [6.0.1](https://github.com/haiilo/catalyst/compare/v6.0.0...v6.0.1) (2023-06-19)


### Bug Fixes

* **core:** remove console logs and fix formats in datepicker ([ba7c99b](https://github.com/haiilo/catalyst/commit/ba7c99b6da3db7194267ea832f2fe5093e1ce85d))
* **core:** rename datepicker in docs ([551b59e](https://github.com/haiilo/catalyst/commit/551b59ee2357f19c789a7ac221fa2180713b5ccf))

## [6.0.0](https://github.com/haiilo/catalyst/compare/v5.4.0...v6.0.0) (2023-06-16)


### Features

* **core:** add range picker ([#272](https://github.com/haiilo/catalyst/issues/272)) ([9595f8e](https://github.com/haiilo/catalyst/commit/9595f8e149fce9e7366d29645914d68bc7aec225))
* **core:** implement date- and timepicker ([#270](https://github.com/haiilo/catalyst/issues/270)) ([3ba6f75](https://github.com/haiilo/catalyst/commit/3ba6f75dfbfa0edb5cb198a0d5a330cc322a06c8))
* **core:** implement weekpicker ([#273](https://github.com/haiilo/catalyst/issues/273)) ([00d6f25](https://github.com/haiilo/catalyst/commit/00d6f2573ad674e41aa26c7ee841be626a3669b4))
* **core:** remove old datepicker ([fdabade](https://github.com/haiilo/catalyst/commit/fdabade3918aac4b52ff67c0b2e43d08d09f01b3))


### Bug Fixes

* **core:** cleanup form handling ([47c4483](https://github.com/haiilo/catalyst/commit/47c4483f88f162119ebd432ee7c876b1ef61ca9a))
* **core:** stop event propagation on cat-select open/close arrow and … ([#269](https://github.com/haiilo/catalyst/issues/269)) ([9db5612](https://github.com/haiilo/catalyst/commit/9db56120d6a3cf333de3a8a287b35053a6e902fb))

## [5.4.0](https://github.com/haiilo/catalyst/compare/v5.3.0...v5.4.0) (2023-06-09)


### Features

* add default icons for catalyst components ([#227](https://github.com/haiilo/catalyst/issues/227)) ([9e3ddb7](https://github.com/haiilo/catalyst/commit/9e3ddb79490a7d2958616fc46d8939176110006a))
* **core:** add output event to get page ([#243](https://github.com/haiilo/catalyst/issues/243)) ([a68cca0](https://github.com/haiilo/catalyst/commit/a68cca00a5a6b904bf8baab26209ef618e45fe80))
* **core:** add utility classes for cat-border-top, bottom, left, right ([#205](https://github.com/haiilo/catalyst/issues/205)) ([6852a01](https://github.com/haiilo/catalyst/commit/6852a016ecb5c88734c03ba2a64a6743ab2eb04d))
* **core:** change font-weight for all headlines to 600 ([#233](https://github.com/haiilo/catalyst/issues/233)) ([3ccadc2](https://github.com/haiilo/catalyst/commit/3ccadc237339a2d71331078b9e087f7f9f5111c2))
* **core:** change lowercase pm/am to uppercase AM/PM + Imask spike ([#221](https://github.com/haiilo/catalyst/issues/221)) ([f7452ad](https://github.com/haiilo/catalyst/commit/f7452ad83633b1b2eecd3921248d9e36c1f02e18))
* **core:** new cat-timepicker component ([#217](https://github.com/haiilo/catalyst/issues/217)) ([390128d](https://github.com/haiilo/catalyst/commit/390128dd582f31a3797b640a1e2c0445161115b0))
* **core:** restyle checkbox, toggle and radio button hint message ([#215](https://github.com/haiilo/catalyst/issues/215)) ([669b60a](https://github.com/haiilo/catalyst/commit/669b60a5a1fb0d66c0099a0c958fcff269dbc9d2))
* **core:** set pnum font feature setting on headings ([#202](https://github.com/haiilo/catalyst/issues/202)) ([0c2b238](https://github.com/haiilo/catalyst/commit/0c2b238f7848cf26ac94a5d646ce6fae6c3dc8dd))
* **core:** support for icons in cat-select component ([#239](https://github.com/haiilo/catalyst/issues/239)) ([b41ea0c](https://github.com/haiilo/catalyst/commit/b41ea0c05f0eaf1a27c8de4bc96fdddee4ed66a6))
* **core:** update libs to latest version ([#192](https://github.com/haiilo/catalyst/issues/192)) ([6deb56c](https://github.com/haiilo/catalyst/commit/6deb56cb6d37d196ea6a5fb664563586b6ecdf74))
* **tokens:** updating the line height for text size s in general to 1.5 ([#214](https://github.com/haiilo/catalyst/issues/214)) ([e0300a4](https://github.com/haiilo/catalyst/commit/e0300a46606eca31b74d3eff8a511399fa01a3ab))


### Bug Fixes

* **core:** add border to dropdowns ([#195](https://github.com/haiilo/catalyst/issues/195)) ([4b81a3a](https://github.com/haiilo/catalyst/commit/4b81a3ad6d91bffb2013389ccb159767ac8be19d))
* **core:** add tilde (~) to vanilajs-datepicker sass file import ([0a06332](https://github.com/haiilo/catalyst/commit/0a0633240f21239b49b197950a9692e6c79fea5e))
* **core:** add vanillajs-datepicker scss file to build assets ([e25bfe0](https://github.com/haiilo/catalyst/commit/e25bfe0a70baa8d297af87e8a9fb28e95fbc7439))
* **core:** align input shadows to be the same as for buttons ([#213](https://github.com/haiilo/catalyst/issues/213)) ([5011d4a](https://github.com/haiilo/catalyst/commit/5011d4a6f76292d6ac5ed784a84ef0cb4d84ada8))
* **core:** change [@import](https://github.com/import) to [@use](https://github.com/use) on cat-datepicker scss file ([8abd872](https://github.com/haiilo/catalyst/commit/8abd87224ed3ef8b84bae0e67a0ce1b64c7a0f0e))
* **core:** change componentDidLoad to componentDidRender in cat-datepicker ([6198247](https://github.com/haiilo/catalyst/commit/6198247f814f42f4da2839f5198e056ce2c98302))
* **core:** close dropdown when losing focus ([#181](https://github.com/haiilo/catalyst/issues/181)) ([2342251](https://github.com/haiilo/catalyst/commit/23422512955a7c53577a219203c084b1f6f548ed))
* **core:** create a copy of vanilajs-datepicker style file ([fabd28b](https://github.com/haiilo/catalyst/commit/fabd28baa362c1a99b501951f62366fac0829696))
* **core:** debugging ([9b63d8f](https://github.com/haiilo/catalyst/commit/9b63d8fb791e4463d67c08a1fc08cf692b15c340))
* **core:** fix the min-height of the cat-textarea ([#201](https://github.com/haiilo/catalyst/issues/201)) ([d84df74](https://github.com/haiilo/catalyst/commit/d84df747f50450119da8d827955e6c2abad5730d))
* **core:** import vanillajs-datepicker style into cat-input component ([1ee4f8e](https://github.com/haiilo/catalyst/commit/1ee4f8ecaddd66e89b1d89e045b6244cc86fc9ab))
* **core:** move style content inside the main datepicker scss file ([382fe6c](https://github.com/haiilo/catalyst/commit/382fe6cdaaab00bfa95e2642c857cbdc529d8a43))
* **core:** remove debug output from SCSS ([a37d943](https://github.com/haiilo/catalyst/commit/a37d943654676a5d6c91199cac75ff9b7a988fda))
* **core:** remove error logs in tests ([#232](https://github.com/haiilo/catalyst/issues/232)) ([b8289a0](https://github.com/haiilo/catalyst/commit/b8289a0b50f6b437ad9eb7e12292c27cfcb807a3))
* **core:** show all options when an item is selected ([#153](https://github.com/haiilo/catalyst/issues/153)) ([f821ce3](https://github.com/haiilo/catalyst/commit/f821ce31d75d4d064deb33037b42de97e6b19292))

## [5.3.0](https://github.com/haiilo/catalyst/compare/v5.2.3...v5.3.0) (2023-03-22)


### Features

* **core:** add button-group component ([#178](https://github.com/haiilo/catalyst/issues/178)) ([c375f28](https://github.com/haiilo/catalyst/commit/c375f28aab3374aa2edb8dc8745cfc5e9b98593a))
* **core:** horizontal alignment for form groups and selects ([#168](https://github.com/haiilo/catalyst/issues/168)) ([230601d](https://github.com/haiilo/catalyst/commit/230601dd51230cd1a328f192d7dd0a4bd46f1b7e))
* **core:** increase opacity on background-color for outline and text buttons ([#180](https://github.com/haiilo/catalyst/issues/180)) ([76f2ca3](https://github.com/haiilo/catalyst/commit/76f2ca3906b9f3b83d0673e95832ed5b52de194b))


### Bug Fixes

* **core:** make dropdowns responsive to the viewports dimensions ([#182](https://github.com/haiilo/catalyst/issues/182)) ([6d677d7](https://github.com/haiilo/catalyst/commit/6d677d7ec25bb1cc4393a6796a10ead29bc052d5))
* **core:** reduce min height of dialogs ([5ab48d5](https://github.com/haiilo/catalyst/commit/5ab48d56a8b2a92c3465997ce124b129afe43be1))
* **core:** rework tooltip trigger selection ([#189](https://github.com/haiilo/catalyst/issues/189)) ([b4834e1](https://github.com/haiilo/catalyst/commit/b4834e12b942bdf4258f3bcf6b3888109d5a7cbd))
* **core:** tooltip positioning is wrong when trigger is changing location ([#185](https://github.com/haiilo/catalyst/issues/185)) ([1258386](https://github.com/haiilo/catalyst/commit/1258386109a652bb2d3b9bc4ebd7c19f961e440c))

### [5.2.3](https://github.com/haiilo/catalyst/compare/v5.2.2...v5.2.3) (2023-03-08)


### Bug Fixes

* **angular:** input validation ([1efd767](https://github.com/haiilo/catalyst/commit/1efd767c6315626389d5530ce4fc9bc52c2ff58a))

### [5.2.2](https://github.com/haiilo/catalyst/compare/v5.2.1...v5.2.2) (2023-03-08)


### Bug Fixes

* **core:** fix broken async form validation ([#172](https://github.com/haiilo/catalyst/issues/172)) ([de2e28a](https://github.com/haiilo/catalyst/commit/de2e28a581e4a69f77c347fbbc8e679e4544a7d2))

### [5.2.1](https://github.com/haiilo/catalyst/compare/v5.2.0...v5.2.1) (2023-03-07)


### Features

* **core:** input validation ([#169](https://github.com/haiilo/catalyst/issues/169)) ([9ed072a](https://github.com/haiilo/catalyst/commit/9ed072a30c5692880f6cb57bda82a0802205fc38))

## [5.2.0](https://github.com/haiilo/catalyst/compare/v5.1.1...v5.2.0) (2023-03-06)


### Features

* **core:** add border utility classes ([0eb0fe8](https://github.com/haiilo/catalyst/commit/0eb0fe8d6c667ab2119e38693d7a2dc6b6be46d6))
* **core:** add border utility classes ([6e5aa9b](https://github.com/haiilo/catalyst/commit/6e5aa9b526bb1443a4757baf5c26d8cff187b2f4))
* **core:** remove solid border from elevation ([#166](https://github.com/haiilo/catalyst/issues/166)) ([a37f0bb](https://github.com/haiilo/catalyst/commit/a37f0bb3059ce4f410a971c7d6af2cfbb1b4bf06))
* **tokens:** remap tokens: font.muted → neutral.500 ([ffe6eeb](https://github.com/haiilo/catalyst/commit/ffe6eeb612ee7e0921a55bd70545a2cb1288d9a2))


### Bug Fixes

* **core:** align label character count always to the right ([#158](https://github.com/haiilo/catalyst/issues/158)) ([4438e69](https://github.com/haiilo/catalyst/commit/4438e69c07de1b30d8ff220eaef7442caff95ace))
* **core:** change position strategy from 'absolute' to 'fixed' to be able to have nested dropdowns ([#157](https://github.com/haiilo/catalyst/issues/157)) ([e776f24](https://github.com/haiilo/catalyst/commit/e776f2424e4a4e15e2eeb945960255e6a2ade5e2))
* **core:** change tooltip strategy to fixed ([#162](https://github.com/haiilo/catalyst/issues/162)) ([2108a04](https://github.com/haiilo/catalyst/commit/2108a04a99d97c851b8314f77147194204af048a))
* **core:** fix spacing on single selects using avatars ([#165](https://github.com/haiilo/catalyst/issues/165)) ([b22ce20](https://github.com/haiilo/catalyst/commit/b22ce20e28718859c8b37db8a95b7a858397d66f))

### [5.1.1](https://github.com/haiilo/catalyst/compare/v5.1.0...v5.1.1) (2023-02-17)


### Bug Fixes

* **core:** remove outdated SCSS import ([47e08df](https://github.com/haiilo/catalyst/commit/47e08df17c956bab058d34bf6a4eac732d83cdbf))

## [5.1.0](https://github.com/haiilo/catalyst/compare/v5.0.1...v5.1.0) (2023-02-17)

### [5.0.1](https://github.com/haiilo/catalyst/compare/v5.0.0...v5.0.1) (2023-02-14)


### Features

* **react:** add github build action ([e5c5539](https://github.com/haiilo/catalyst/commit/e5c5539a0e85f6848d60fa511266bed656d02ae3))
* **react:** add github build action status to Readme ([e31c534](https://github.com/haiilo/catalyst/commit/e31c5346962aa8a629207790cb5192e5e87be8bc))


### Bug Fixes

* **core:** correct display of select dropdowns ([750d7da](https://github.com/haiilo/catalyst/commit/750d7dab07e80de4279bd3d7b9ad066996ecf45f))
* **core:** correct display of select dropdowns ([90ecce3](https://github.com/haiilo/catalyst/commit/90ecce3d63f74398dc2669a0d793bdaa5a9dfb03))

## [5.0.0](https://github.com/haiilo/catalyst/compare/v4.1.2...v5.0.0) (2023-02-13)


### Features

* **angular:** add connector input for angular select wrapper component ([a963d4f](https://github.com/haiilo/catalyst/commit/a963d4f1a03f5d7f637d1c55846d46a38d1ca2eb))
* **core:** form-alignment ([#132](https://github.com/haiilo/catalyst/issues/132)) ([b64ee7f](https://github.com/haiilo/catalyst/commit/b64ee7fbf4c93ded310d0b043026d83e416cf152))
* **core:** tooltip slots ([#149](https://github.com/haiilo/catalyst/issues/149)) ([4dc2666](https://github.com/haiilo/catalyst/commit/4dc26661b1f2845eb84ce00bd17e585f84751333))
* **core:** update stencilJs to v3.0.0 ([e31a981](https://github.com/haiilo/catalyst/commit/e31a98115373ee928db0f129986262b29f6e14e4))
* **react:** add core as dependency ([c0066d2](https://github.com/haiilo/catalyst/commit/c0066d20ad845cebf79e442853c6acf618667ead))
* **react:** update to react v18 and fix build target output ([d931af6](https://github.com/haiilo/catalyst/commit/d931af69381df2886fa4bb62ea49b3830ac07c3f))


### Bug Fixes

* **core:** select does not open ([060ed26](https://github.com/haiilo/catalyst/commit/060ed2601abe4bdd8641465759e6e7719333be2a))
* **core:** tooltip alignment ([#142](https://github.com/haiilo/catalyst/issues/142)) ([ee99e10](https://github.com/haiilo/catalyst/commit/ee99e106fff100d91d0ecb750ff8a8c2fd8d4be2))
* **tokens:** update lato font stack ([#141](https://github.com/haiilo/catalyst/issues/141)) ([921fe1f](https://github.com/haiilo/catalyst/commit/921fe1f47ef8b62e40c3a8f55a60c3ad124912e0))

### [4.1.2](https://github.com/haiilo/catalyst/compare/v4.1.1...v4.1.2) (2023-02-03)


### Bug Fixes

* **core:** check connector status before resolving select values ([#138](https://github.com/haiilo/catalyst/issues/138)) ([36dfea3](https://github.com/haiilo/catalyst/commit/36dfea395de7e5b5d38268e63673fd43dadb389b))

### [4.1.1](https://github.com/haiilo/catalyst/compare/v4.1.0...v4.1.1) (2023-01-31)


### Features

* **core:** fix avatar initials in select component ([#131](https://github.com/haiilo/catalyst/issues/131)) ([a47f2a4](https://github.com/haiilo/catalyst/commit/a47f2a4f60e2587ea6cd61f3e3eb4bd3d63b9283))


### Bug Fixes

* **core:** add flex-shrink to horizontal lines ([fb32555](https://github.com/haiilo/catalyst/commit/fb32555d3486f6d9b5f80ddb18f2a4914ec60cc6))

## [4.1.0](https://github.com/haiilo/catalyst/compare/v4.0.0...v4.1.0) (2023-01-25)


### Features

* **core:** add fine-grained control for input validation ([#127](https://github.com/haiilo/catalyst/issues/127)) ([6241a26](https://github.com/haiilo/catalyst/commit/6241a26cb9bb10370aaa64a9e391ae4b2bdfe6e8))
* **core:** add fine-grained error control to textarea and select ([464f62a](https://github.com/haiilo/catalyst/commit/464f62a064824cf56eb179f3947960a2dbb4df54))
* **core:** add nativeAttributes to all form elements ([809d333](https://github.com/haiilo/catalyst/commit/809d3337f6a613c7a7a9aa29267df96da7417b95))

## [4.0.0](https://github.com/haiilo/catalyst/compare/v3.0.2...v4.0.0) (2023-01-18)


### Features

* **core:** input validation ([40f93d0](https://github.com/haiilo/catalyst/commit/40f93d0dbfde6e3b4540183e3bd73dcdcf38a8e6))
* **core:** input validation ([f0fb791](https://github.com/haiilo/catalyst/commit/f0fb7917cf18d370453ff29a9cb1070c49cc9e07))
* **core:** input validation ([d49c2cb](https://github.com/haiilo/catalyst/commit/d49c2cbbd666ed0cfe9bfb95a4984c36d0b47a95))
* **core:** input validation ([4a453f2](https://github.com/haiilo/catalyst/commit/4a453f290518b870025e18eea61060074ca838d4))

### [3.0.2](https://github.com/haiilo/catalyst/compare/v3.0.1...v3.0.2) (2023-01-12)


### Features

* **core:** add initials in the avatar of the select options ([#119](https://github.com/haiilo/catalyst/issues/119)) ([a4f9e98](https://github.com/haiilo/catalyst/commit/a4f9e9826601c5f23cf0c02da4192c5748b26b87))

### [3.0.1](https://github.com/haiilo/catalyst/compare/v3.0.0...v3.0.1) (2023-01-06)


### Features

* **core:** remove cat-modal ([b907e68](https://github.com/haiilo/catalyst/commit/b907e68b2fb551f0ef9e62b73f000631e789cff4))
* **tokens:** rename background.body to background.surface and all Dark tokens to Inverted ([01943d1](https://github.com/haiilo/catalyst/commit/01943d12428969cfa7799e0f23735a419724857c))


### Bug Fixes

* **core:** correctly set autofill styles ([dbc283e](https://github.com/haiilo/catalyst/commit/dbc283eed408d9c47fc783e03afc757f18d16f78))
* **core:** update scroll shadows after element resize ([#112](https://github.com/haiilo/catalyst/issues/112)) ([4076485](https://github.com/haiilo/catalyst/commit/4076485d27cb0862f11b96a9b98ef9e659e2a26b))

## [3.0.0](https://github.com/haiilo/catalyst/compare/v2.5.0...v3.0.0) (2023-01-06)

## [2.5.0](https://github.com/haiilo/catalyst/compare/v2.4.9...v2.5.0) (2023-01-06)


### Bug Fixes

* **core:** sync singletons ([321acae](https://github.com/haiilo/catalyst/commit/321acaecf45c2c444df45b22757b8a5adf1591ee))

### [2.4.9](https://github.com/haiilo/catalyst/compare/v2.4.8...v2.4.9) (2022-12-18)

### [2.4.8](https://github.com/haiilo/catalyst/compare/v2.4.7...v2.4.8) (2022-12-16)

### [2.4.7](https://github.com/haiilo/catalyst/compare/v2.4.6...v2.4.7) (2022-12-16)


### Features

* **core:** adjust elevation styles ([6f06f60](https://github.com/haiilo/catalyst/commit/6f06f605d05291578bce1f9da0ae814a033a74a0))

### [2.4.6](https://github.com/haiilo/catalyst/compare/v2.4.5...v2.4.6) (2022-12-02)


### Bug Fixes

* **core:** add value programmatically on selects ([#101](https://github.com/haiilo/catalyst/issues/101)) ([a3232d5](https://github.com/haiilo/catalyst/commit/a3232d50e470d90492b4f5ec14a4f281d3abf57b))

### [2.4.5](https://github.com/haiilo/catalyst/compare/v2.4.4...v2.4.5) (2022-11-30)


### Features

* **core:** add additional JSON build output ([c1167cd](https://github.com/haiilo/catalyst/commit/c1167cd415ae65d3bb0e55e434ef5f42f5298915))
* **core:** add new partial index file to be included in shadow DOM elements ([73031cd](https://github.com/haiilo/catalyst/commit/73031cd22d4b2c73d7ac7e3e38e1f740575400d9))

### [2.4.4](https://github.com/haiilo/catalyst/compare/v2.4.3...v2.4.4) (2022-11-28)


### Bug Fixes

* **core:** cleanup block quote styles ([a9b0d60](https://github.com/haiilo/catalyst/commit/a9b0d609ee4417665d5f2b7e5c8ed0dd2e85b0cb))
* **core:** streamline muted backgrounds ([1eb9ee7](https://github.com/haiilo/catalyst/commit/1eb9ee73f8f78da4eda122636330156fde56b330))

### [2.4.3](https://github.com/haiilo/catalyst/compare/v2.4.2...v2.4.3) (2022-11-24)


### Bug Fixes

* **core:** disable horizontal resize for textareas ([bc3d95c](https://github.com/haiilo/catalyst/commit/bc3d95c5b5c382e051ecd32a98acc151590f786d))
* **core:** fix wrong label alignment ([3106d9e](https://github.com/haiilo/catalyst/commit/3106d9e2cf13e4b0c157608464707c0edd7bc524))

### [2.4.2](https://github.com/haiilo/catalyst/compare/v2.4.1...v2.4.2) (2022-11-23)

### [2.4.1](https://github.com/haiilo/catalyst/compare/v2.4.0...v2.4.1) (2022-11-23)

## [2.4.0](https://github.com/haiilo/catalyst/compare/v2.1.3...v2.4.0) (2022-11-23)


### Features

* **core:** adjust quote typo styles ([73469a5](https://github.com/haiilo/catalyst/commit/73469a596e2468a5646739a78168bf16e4e20db3))
* **core:** reflect properties ([#98](https://github.com/haiilo/catalyst/issues/98)) ([8410a49](https://github.com/haiilo/catalyst/commit/8410a499aeaeaf5c16c707705e347eec3c97836d))
* **core:** support ext. labels ([#99](https://github.com/haiilo/catalyst/issues/99)) ([5e4e00f](https://github.com/haiilo/catalyst/commit/5e4e00f57bada3a7e9b35f006573e2627183f8c7))


### Bug Fixes

* **core:** badge fix ([5afff33](https://github.com/haiilo/catalyst/commit/5afff33b5431df236eed91420aa112e96e542f33))
* **core:** fixed bug ([da6ca6b](https://github.com/haiilo/catalyst/commit/da6ca6b7f9dd408a8039992893084c9b5e547cfb))
* **core:** fixed lint ([e6b0fcc](https://github.com/haiilo/catalyst/commit/e6b0fcc1c6feed9d647436a01d728aba03eb3273))
* **core:** pr changes ([211a2cf](https://github.com/haiilo/catalyst/commit/211a2cf791bea33f3d53c9fe250459450a39dbeb))

## [2.3.0](https://github.com/haiilo/catalyst/compare/v2.1.3...v2.3.0) (2022-11-22)


### Bug Fixes

* **core:** badge fix ([5afff33](https://github.com/haiilo/catalyst/commit/5afff33b5431df236eed91420aa112e96e542f33))
* **core:** fixed bug ([da6ca6b](https://github.com/haiilo/catalyst/commit/da6ca6b7f9dd408a8039992893084c9b5e547cfb))
* **core:** fixed lint ([e6b0fcc](https://github.com/haiilo/catalyst/commit/e6b0fcc1c6feed9d647436a01d728aba03eb3273))
* **core:** pr changes ([211a2cf](https://github.com/haiilo/catalyst/commit/211a2cf791bea33f3d53c9fe250459450a39dbeb))

## [2.2.0](https://github.com/haiilo/catalyst/compare/v2.1.3...v2.2.0) (2022-11-22)


### Bug Fixes

* **core:** badge fix ([5afff33](https://github.com/haiilo/catalyst/commit/5afff33b5431df236eed91420aa112e96e542f33))
* **core:** fixed bug ([da6ca6b](https://github.com/haiilo/catalyst/commit/da6ca6b7f9dd408a8039992893084c9b5e547cfb))
* **core:** fixed lint ([e6b0fcc](https://github.com/haiilo/catalyst/commit/e6b0fcc1c6feed9d647436a01d728aba03eb3273))
* **core:** pr changes ([211a2cf](https://github.com/haiilo/catalyst/commit/211a2cf791bea33f3d53c9fe250459450a39dbeb))

### [2.1.3](https://github.com/haiilo/catalyst/compare/v2.1.2...v2.1.3) (2022-11-21)


### Bug Fixes

* **core:** remove sanitize assets file ([dd42e5e](https://github.com/haiilo/catalyst/commit/dd42e5eb7191b3df5b4e9666cfff64e915f9046d))

### [2.1.2](https://github.com/haiilo/catalyst/compare/v2.1.1...v2.1.2) (2022-11-21)


### Bug Fixes

* **core:** fine tune headline styles for catalyst ([425c015](https://github.com/haiilo/catalyst/commit/425c015bc6421bd6319997aedf27a2f844562d24))

### [2.1.1](https://github.com/haiilo/catalyst/compare/v2.1.0...v2.1.1) (2022-11-16)


### Bug Fixes

* **core:** update tooltip when content is async ([#91](https://github.com/haiilo/catalyst/issues/91)) ([9482b3b](https://github.com/haiilo/catalyst/commit/9482b3b2e2c07d9e5ae485985b22354e22df3e2d))

## [2.1.0](https://github.com/haiilo/catalyst/compare/v2.0.3...v2.1.0) (2022-11-10)


### ⚠ BREAKING CHANGES

* **core:** add and rename methods to focus / blur / click

### Features

* **core:** add and rename methods to focus / blur / click ([fb83a3d](https://github.com/haiilo/catalyst/commit/fb83a3d4ba4a285f9b7d6daff1d500c5d6c3b708))

### [2.0.3](https://github.com/haiilo/catalyst/compare/v2.0.2...v2.0.3) (2022-11-05)


### Bug Fixes

* **core:** active state for link buttons ([cda9000](https://github.com/haiilo/catalyst/commit/cda900044ffbdebf783da1d5a185fe8fdb4d550f))

### [2.0.2](https://github.com/haiilo/catalyst/compare/v2.0.1...v2.0.2) (2022-11-04)


### Features

* **core:** support string inputs for current attribute in buttons ([c5adac0](https://github.com/haiilo/catalyst/commit/c5adac088334b6141cb6efc65c9b671d569e20f0))


### Bug Fixes

* **core:** add docs and adjust pagination details ([ba94d32](https://github.com/haiilo/catalyst/commit/ba94d3216c27c9cdb435d07c41ed0ac6dd860383))
* **core:** build ([704c330](https://github.com/haiilo/catalyst/commit/704c330c9843618ed4cf3d895945318bff299e48))

### [2.0.1](https://github.com/haiilo/catalyst/compare/v2.0.0...v2.0.1) (2022-11-03)


### Bug Fixes

* **core:** load latest CDN version ([32eb72e](https://github.com/haiilo/catalyst/commit/32eb72e9bb213f30511c53108997264f12e5301f))

## [2.0.0](https://github.com/haiilo/catalyst/compare/v1.3.1...v2.0.0) (2022-11-03)


### ⚠ BREAKING CHANGES

* **core:** rework notifications
* **core:** buttons in nav elements now require a cat-nav-item class
* **core:** rename cat-menu to cat-dropdown
* **core:** simplify message handling with I18n service

### Features

* **core:** add menu animations ([b249eb2](https://github.com/haiilo/catalyst/commit/b249eb2faeb1577db2431aefafaeb290c72b71a0))
* **core:** add modes to notifications ([de1ca91](https://github.com/haiilo/catalyst/commit/de1ca91994868020e9daf5df399e0c28ed879a37))
* **core:** add utility class to reset line height: cat-line-height-1 ([50a881b](https://github.com/haiilo/catalyst/commit/50a881bb6b28c8216e28a59e29fd2ee5fe6c61a9))
* **core:** pagination ([#76](https://github.com/haiilo/catalyst/issues/76)) ([d79a5d5](https://github.com/haiilo/catalyst/commit/d79a5d5eaa4260af0c9b0e6b4a5c6ba42cfcecbe))
* **core:** rename cat-menu to cat-dropdown ([06766bf](https://github.com/haiilo/catalyst/commit/06766bf4fea5ded7c4dd58bd01acf46dcf5b8fc1))
* **core:** rework notifications ([f82d305](https://github.com/haiilo/catalyst/commit/f82d305740eebdfa8d30b87c1224b2a27433d8ff))
* **core:** simplify message handling with I18n service ([f69812f](https://github.com/haiilo/catalyst/commit/f69812f03b06d4d39b3eebc08c6e8e24fa58cd46))
* **core:** update style lint ([56c64cf](https://github.com/haiilo/catalyst/commit/56c64cf5b2754080d97fc00a91b9344b5f586d2a))


### Bug Fixes

* **core:** add spacing to buttons with icons in navs ([48b0445](https://github.com/haiilo/catalyst/commit/48b0445652ce592ec5b5475051634c8f0dbe68f0))
* **core:** buttons in nav elements now require a cat-nav-item class ([e84d48b](https://github.com/haiilo/catalyst/commit/e84d48b9b2ea0f8309e15b621fb18d0fc5b2be7f))
* **core:** fix errors in dropdown trigger handling ([b00d858](https://github.com/haiilo/catalyst/commit/b00d85819892f0f06e8d52d845e41a47c72bf6fa))
* **core:** fixed tests ([#75](https://github.com/haiilo/catalyst/issues/75)) ([f3b67e9](https://github.com/haiilo/catalyst/commit/f3b67e9b5473f1e4e36b7f63418a35143612dfa6))
* **core:** remove console errors in tests ([#77](https://github.com/haiilo/catalyst/issues/77)) ([e4b27ce](https://github.com/haiilo/catalyst/commit/e4b27cee1086d34e588d825b064d5e57facbbd6c))
* **core:** remove host-context from form-hints ([455351e](https://github.com/haiilo/catalyst/commit/455351e18317487f1ab40e1973839eff49969ca3))
* **core:** remove style lint error ([7006267](https://github.com/haiilo/catalyst/commit/700626759a009c4ba184401a2ed421779b4a10cf))
* **core:** update docs for dropdowns ([61b32ca](https://github.com/haiilo/catalyst/commit/61b32ca306c4a126d90ee3bed8472afa1d1c53ce))
* **core:** update menu offset ([51bd512](https://github.com/haiilo/catalyst/commit/51bd512f89502e25f17f9a53aa4097557152ef79))
* **tokens:** correctly expose JS variables ([7a97665](https://github.com/haiilo/catalyst/commit/7a976658f926c351177a7795ed8a24f8d3a55785))

### [1.3.1](https://github.com/haiilo/catalyst/compare/v1.3.0...v1.3.1) (2022-10-26)


### Bug Fixes

* **core:** add disableOverflow for menus ([#72](https://github.com/haiilo/catalyst/issues/72)) ([25be4d7](https://github.com/haiilo/catalyst/commit/25be4d7733e9d6632ce5b80001f7c3e798b2d0d9))
* **core:** allow overflow for menus ([#74](https://github.com/haiilo/catalyst/issues/74)) ([92f8d0a](https://github.com/haiilo/catalyst/commit/92f8d0a7196edb8fcdb384966b7c0bb6ee8cdfae))

## [1.3.0](https://github.com/haiilo/catalyst/compare/v1.2.5...v1.3.0) (2022-10-26)


### Features

* **core:** update color palette, add emoji font mapping, cleanup ([073af69](https://github.com/haiilo/catalyst/commit/073af69aed5b8c590a78b3ba65597d6aad74f133))


### Bug Fixes

* **core:** add noAutoClose for menus ([8d2cafb](https://github.com/haiilo/catalyst/commit/8d2cafb20a9ec97bb7182a1c424e0a8d594a26a4))
* **core:** fix menu component inside card component ([#73](https://github.com/haiilo/catalyst/issues/73)) ([69fe866](https://github.com/haiilo/catalyst/commit/69fe8665295ee79250390f811d71d1a0257470f7))
* **core:** fix preselected tags behaviour ([#71](https://github.com/haiilo/catalyst/issues/71)) ([813f495](https://github.com/haiilo/catalyst/commit/813f49580c93c8ac41bbc41b6fdd68748ab9fb5e))
* **core:** lint error ([a18275e](https://github.com/haiilo/catalyst/commit/a18275e2581a06de3cd4b354c952b00b209f5a0b))

### [1.2.5](https://github.com/haiilo/catalyst/compare/v1.2.4...v1.2.5) (2022-10-24)


### Bug Fixes

* **core:** fix build error ([83cc701](https://github.com/haiilo/catalyst/commit/83cc701d3cf60bf296432e630c9c4294957a26e4))
* **core:** replace tilde imports ([744816a](https://github.com/haiilo/catalyst/commit/744816a67db962e33a6be8541bc36acac8367a83))

### [1.2.4](https://github.com/haiilo/catalyst/compare/v1.2.3...v1.2.4) (2022-10-21)


### Bug Fixes

* **core:** add line height to cat-select ([#70](https://github.com/haiilo/catalyst/issues/70)) ([d36e646](https://github.com/haiilo/catalyst/commit/d36e646a1b4440b3ed8da512b64a5f21aa3a4562))
* **core:** fix cat-select ellipsis in angular projects ([#69](https://github.com/haiilo/catalyst/issues/69)) ([a27d820](https://github.com/haiilo/catalyst/commit/a27d8204442d5ec967905af8236cea884b0d05a3))
* **tokens:** adjust brand.600 color ([8a64f26](https://github.com/haiilo/catalyst/commit/8a64f261fdadcbaca4338f087f37b77263319757))

### [1.2.3](https://github.com/haiilo/catalyst/compare/v1.2.2...v1.2.3) (2022-10-18)


### Bug Fixes

* **core:** disabled states ([dbb7ce8](https://github.com/haiilo/catalyst/commit/dbb7ce8c3bf4f1162c9db39e7b40bcf2b0cdea86))

### [1.2.2](https://github.com/haiilo/catalyst/compare/v1.2.1...v1.2.2) (2022-10-17)


### Bug Fixes

* **core:** fix tokens / fix tabbable trigger ([f6cb510](https://github.com/haiilo/catalyst/commit/f6cb510562610600b0b565834eabfb40ad4dc46a))

### [1.2.1](https://github.com/haiilo/catalyst/compare/v1.2.0...v1.2.1) (2022-10-14)


### Features

* add close method to menu ([3d0feb4](https://github.com/haiilo/catalyst/commit/3d0feb4374527fb31e700ce662a26a647439e6ee))

## [1.2.0](https://github.com/haiilo/catalyst/compare/v1.1.1...v1.2.0) (2022-10-13)


### Features

* **core:** adjust badge border radius and colors ([190379a](https://github.com/haiilo/catalyst/commit/190379a04fc8e0d6ffe9bd1c3f112ba93418ad4b))
* **core:** adjust brand color palette ([40caacf](https://github.com/haiilo/catalyst/commit/40caacf13cea148afb3920177d98d1a003d3c023))
* **core:** adjust button active state ([b98ad8a](https://github.com/haiilo/catalyst/commit/b98ad8aefd9c7975d5568354cca35d31dfbc69b1))
* **core:** adjust colors of alerts ([ba2f1c8](https://github.com/haiilo/catalyst/commit/ba2f1c81bbd053b0d8c4d5aa64b9f90425e4a8fe))
* **core:** adjust tab padding ([06e7c46](https://github.com/haiilo/catalyst/commit/06e7c46aaecb995e407318895fb97bd6f2840e42))


### Bug Fixes

* **core:** fix line height of badges ([3fe8354](https://github.com/haiilo/catalyst/commit/3fe8354a05013b2a64314df2f32471af89d95754))
* **core:** update button docs ([f9b0f0d](https://github.com/haiilo/catalyst/commit/f9b0f0d7f2a1b0dcf1854fd54aa6076b993f6652))

### [1.1.1](https://github.com/haiilo/catalyst/compare/v1.1.0...v1.1.1) (2022-10-11)


### Features

* **core:** add custom id to select items ([#68](https://github.com/haiilo/catalyst/issues/68)) ([88f0176](https://github.com/haiilo/catalyst/commit/88f01763117023e8eaf86b21a4aafb2a0264ec7b))


### Bug Fixes

* **core:** fix shrinking avatar in select components ([ad784b4](https://github.com/haiilo/catalyst/commit/ad784b4040d97574ae50d0b5cf505111092f65bc))
* **core:** rework alert, avatar, badge ([9351f2a](https://github.com/haiilo/catalyst/commit/9351f2a0a68fb8c841637ecb3f1534f208f4fbfc))
* **core:** rework cards ([1852155](https://github.com/haiilo/catalyst/commit/18521554855b82968380803a8369eba5ac5a3de6))

## [1.1.0](https://github.com/haiilo/catalyst/compare/v1.0.2...v1.1.0) (2022-10-06)


### Features

* **core:** add round option to tooltips ([338f08d](https://github.com/haiilo/catalyst/commit/338f08dc3c6b8a290350683c768c713efca11f94))
* **core:** add size option (s,m,l) to tooltips ([6f5d8a7](https://github.com/haiilo/catalyst/commit/6f5d8a79fb21f36c8eb577d2a26137d81e64dbf7))
* **core:** add tagging support to select ([6a6cf11](https://github.com/haiilo/catalyst/commit/6a6cf1144f966afc139c3cf9c1ad895c6d1f0e63))
* **core:** make alerts compatible with utility classes ([14ef6fa](https://github.com/haiilo/catalyst/commit/14ef6faf45fbb6cf12d109473ee258f55e3f73e1))


### Bug Fixes

* **core:** decrease default show delay for tooltips from 500ms to 250ms ([046ad48](https://github.com/haiilo/catalyst/commit/046ad480524b2d7f30115d344680de70104ceac2))
* **core:** decrease size of checkbox checkmark and dash ([719789b](https://github.com/haiilo/catalyst/commit/719789b3ab7ca48388c63677397f4fb021f589e5))

### [1.0.2](https://github.com/haiilo/catalyst/compare/v1.0.1...v1.0.2) (2022-09-19)

### [1.0.1](https://github.com/haiilo/catalyst/compare/v1.0.0...v1.0.1) (2022-09-09)


### Bug Fixes

* **angular:** remove invalid import ([b46504c](https://github.com/haiilo/catalyst/commit/b46504c42e41b664b413438e05c9fb6145517f1b))
* remove unused choices dependency and leftover translations ([1b9db8f](https://github.com/haiilo/catalyst/commit/1b9db8fb93c62739c8b59df61d19aca24ce09973))

## [1.0.0](https://github.com/haiilo/catalyst/compare/v0.15.3...v1.0.0) (2022-09-09)

### [0.15.3](https://github.com/haiilo/catalyst/compare/v0.15.2...v0.15.3) (2022-09-07)


### Features

* **core:** add avatar support to new select ([#64](https://github.com/haiilo/catalyst/issues/64)) ([7362d49](https://github.com/haiilo/catalyst/commit/7362d493f1bb71af69ec06dc76c16426af02bebd))

### [0.15.2](https://github.com/haiilo/catalyst/compare/v0.15.1...v0.15.2) (2022-09-06)


### Bug Fixes

* **core:** add some adjustments in the new select ([#63](https://github.com/haiilo/catalyst/issues/63)) ([1fff633](https://github.com/haiilo/catalyst/commit/1fff6334c0c5e29166aabeed6b522a1ecdeaf14f))

### [0.15.1](https://github.com/haiilo/catalyst/compare/v0.15.0...v0.15.1) (2022-09-01)


### Bug Fixes

* **core:** export the interfaces and keys correctly from the new select ([#62](https://github.com/haiilo/catalyst/issues/62)) ([3b98613](https://github.com/haiilo/catalyst/commit/3b98613ce7f759ed614275e6f2fef97486cf1b7c))

## [0.15.0](https://github.com/haiilo/catalyst/compare/v0.14.3...v0.15.0) (2022-08-31)


### Features

* add second draft implementation of new select component  ([#59](https://github.com/haiilo/catalyst/issues/59)) ([646d8d3](https://github.com/haiilo/catalyst/commit/646d8d3e1a405394de114836ce18afdf809391f6))
* add support to single select ([#61](https://github.com/haiilo/catalyst/issues/61)) ([d9d2094](https://github.com/haiilo/catalyst/commit/d9d20948e48ad2e5199a4d40afe6532e7c18185a))
* added first draft implementation of new select component ([#58](https://github.com/haiilo/catalyst/issues/58)) ([cc36fa5](https://github.com/haiilo/catalyst/commit/cc36fa50dbf8c6db56a2a96fc6366b341b1d8eee))


### Bug Fixes

* **core:** badges without content are not round ([0cad59d](https://github.com/haiilo/catalyst/commit/0cad59dc03f75398ca818b98c5049355fa29a8cb))
* minor adjustments in new select ([#60](https://github.com/haiilo/catalyst/issues/60)) ([8dfdf75](https://github.com/haiilo/catalyst/commit/8dfdf759be2943c639b8a833a39900f8b31cc49f))

### [0.14.3](https://github.com/haiilo/catalyst/compare/v0.14.2...v0.14.3) (2022-08-16)

### [0.14.2](https://github.com/haiilo/catalyst/compare/v0.14.1...v0.14.2) (2022-08-15)


### Bug Fixes

* **core:** change default value ([#57](https://github.com/haiilo/catalyst/issues/57)) ([08a1107](https://github.com/haiilo/catalyst/commit/08a110730583ee4608f525ece0ee3ae5ebfe9c03))

### [0.14.1](https://github.com/haiilo/catalyst/compare/v0.14.0...v0.14.1) (2022-08-03)


### Features

* **core:** input date & time work with min and max ([#56](https://github.com/haiilo/catalyst/issues/56)) ([934128e](https://github.com/haiilo/catalyst/commit/934128e6b9e2ad1cf4831bee33c3f79aa23c81df))

## [0.14.0](https://github.com/haiilo/catalyst/compare/v0.10.2...v0.14.0) (2022-07-29)


### Features

* **angular:** export radio groups ([2bd037a](https://github.com/haiilo/catalyst/commit/2bd037ab31dd3d2b0c22886bbcd3660de042b661))
* **core:** add input types ([#54](https://github.com/haiilo/catalyst/issues/54)) ([4fad146](https://github.com/haiilo/catalyst/commit/4fad1461f60c783ee085656b39670b66e4540848))
* **core:** added private ([04ce47c](https://github.com/haiilo/catalyst/commit/04ce47c31c3927849d484345603ef794b3a61e14))
* **core:** blur support ([#47](https://github.com/haiilo/catalyst/issues/47)) ([68744a8](https://github.com/haiilo/catalyst/commit/68744a8939b09d9ad5f9a6ae1e4d79510288e056))
* **core:** fixed console errors ([#51](https://github.com/haiilo/catalyst/issues/51)) ([ac78bbe](https://github.com/haiilo/catalyst/commit/ac78bbe1e40176eebcb3f6bb588b1fde6a4052a2))
* **core:** fixed console errors ([#52](https://github.com/haiilo/catalyst/issues/52)) ([5f9bb61](https://github.com/haiilo/catalyst/commit/5f9bb617586c70e46ac8b053c1cccc6e4b05924d))
* **core:** implement pull-out classes ([8a2de32](https://github.com/haiilo/catalyst/commit/8a2de322e3b6c39b6a9209b589a5841707e5af1f))
* **core:** lint and prettier ([d741d62](https://github.com/haiilo/catalyst/commit/d741d62ba3238cc1b2e5dd673ed1992a71dcf966))
* **core:** merge ([f21e826](https://github.com/haiilo/catalyst/commit/f21e8267601fe1d22180c4e0f40848d104178865))
* **core:** merge ([7c83a4a](https://github.com/haiilo/catalyst/commit/7c83a4a91bd8d81c2cb34120896734f17e0a15ca))
* **core:** package lock ([688a146](https://github.com/haiilo/catalyst/commit/688a146fdb39d7202f77b6a424dc481a96ff4448))
* **core:** pr changes ([a3dabe0](https://github.com/haiilo/catalyst/commit/a3dabe00aa1e455a8c454e67b42cef2491e12d10))
* **core:** prettier ([543a036](https://github.com/haiilo/catalyst/commit/543a0365fd2f570ff7410c2636036a4365ac7c1b))
* **core:** prettier ([ec89c60](https://github.com/haiilo/catalyst/commit/ec89c60e6eaa3c6d1a584373c1e6cc4fcb69144f))
* **core:** prettier ([e51a198](https://github.com/haiilo/catalyst/commit/e51a19848bac09608ba356b672d2ebd247a0b320))
* **core:** prettier fix ([e7985d0](https://github.com/haiilo/catalyst/commit/e7985d0e912165153326c0fb5516fb864fd07c63))
* **core:** prettier fix ([f7d381e](https://github.com/haiilo/catalyst/commit/f7d381efed3904e512508f91813bcdf9e9e28e40))
* **core:** removed base size from tokens ([#50](https://github.com/haiilo/catalyst/issues/50)) ([9fe36a6](https://github.com/haiilo/catalyst/commit/9fe36a6f695e5a35282942c9db238ea98c6e6541))
* **core:** update card component spacings ([#44](https://github.com/haiilo/catalyst/issues/44)) ([5992ad1](https://github.com/haiilo/catalyst/commit/5992ad1bd8661475db3576e875c6ca86789bfefc))
* **core:** update notifications design ([c9ce3ce](https://github.com/haiilo/catalyst/commit/c9ce3cef87c455c502257bd1c921e7bfdce5f59a))
* **core:** update package lock ([62b2dad](https://github.com/haiilo/catalyst/commit/62b2dadd05b3bdeb2829a63cd5d554d8b4a73d04))
* **core:** updated badge ([#46](https://github.com/haiilo/catalyst/issues/46)) ([40711e5](https://github.com/haiilo/catalyst/commit/40711e5113f44d6fc4b3caa936c20c11271f5ea2))
* **core:** updated tooltip ui ([#48](https://github.com/haiilo/catalyst/issues/48)) ([caba631](https://github.com/haiilo/catalyst/commit/caba631d446ade9a78ec7e0a7fdcb1021498096d))
* **core:** upgrade alert component ([#53](https://github.com/haiilo/catalyst/issues/53)) ([4b49ec7](https://github.com/haiilo/catalyst/commit/4b49ec7ab4acd4ec37522dc5c50cf60ba5f1129a))


### Bug Fixes

* **core:** fix wrong values in flex utility classes ([c59cb62](https://github.com/haiilo/catalyst/commit/c59cb626284c2dfc29be106db1373a04c8b310ee))
* **core:** radio group value access ([eeafc9e](https://github.com/haiilo/catalyst/commit/eeafc9e2f034e4e4f25e271a5a8c89d09cb1e80d))
* **core:** render tab when some prop is changed ([#55](https://github.com/haiilo/catalyst/issues/55)) ([6039302](https://github.com/haiilo/catalyst/commit/60393028a8b63faa676b4b5da4398016427acef0))
* **core:** rework select component ([dbf30bc](https://github.com/haiilo/catalyst/commit/dbf30bcf83ace4cc8b9f3346c496f2f038b898f1))
* **core:** update docs ([c8dbd6c](https://github.com/haiilo/catalyst/commit/c8dbd6cb2a1d6b8fdeefb98333bcb5e3c6fa9326))

## [0.13.0](https://github.com/haiilo/catalyst/compare/v0.12.0...v0.13.0) (2022-07-22)


### Features

* **core:** fixed console errors ([#52](https://github.com/haiilo/catalyst/issues/52)) ([5f9bb61](https://github.com/haiilo/catalyst/commit/5f9bb617586c70e46ac8b053c1cccc6e4b05924d))
* **core:** removed base size from tokens ([#50](https://github.com/haiilo/catalyst/issues/50)) ([9fe36a6](https://github.com/haiilo/catalyst/commit/9fe36a6f695e5a35282942c9db238ea98c6e6541))

## [0.12.0](https://github.com/haiilo/catalyst/compare/v0.11.0...v0.12.0) (2022-07-21)


### Features

* **core:** blur support ([#47](https://github.com/haiilo/catalyst/issues/47)) ([68744a8](https://github.com/haiilo/catalyst/commit/68744a8939b09d9ad5f9a6ae1e4d79510288e056))
* **core:** fixed console errors ([#51](https://github.com/haiilo/catalyst/issues/51)) ([ac78bbe](https://github.com/haiilo/catalyst/commit/ac78bbe1e40176eebcb3f6bb588b1fde6a4052a2))
* **core:** implement pull-out classes ([8a2de32](https://github.com/haiilo/catalyst/commit/8a2de322e3b6c39b6a9209b589a5841707e5af1f))
* **core:** updated tooltip ui ([#48](https://github.com/haiilo/catalyst/issues/48)) ([caba631](https://github.com/haiilo/catalyst/commit/caba631d446ade9a78ec7e0a7fdcb1021498096d))


### Bug Fixes

* **core:** fix wrong values in flex utility classes ([c59cb62](https://github.com/haiilo/catalyst/commit/c59cb626284c2dfc29be106db1373a04c8b310ee))
* **core:** update docs ([c8dbd6c](https://github.com/haiilo/catalyst/commit/c8dbd6cb2a1d6b8fdeefb98333bcb5e3c6fa9326))

## [0.11.0](https://github.com/haiilo/catalyst/compare/v0.10.2...v0.11.0) (2022-07-15)


### Features

* **angular:** export radio groups ([2bd037a](https://github.com/haiilo/catalyst/commit/2bd037ab31dd3d2b0c22886bbcd3660de042b661))
* **core:** update card component spacings ([#44](https://github.com/haiilo/catalyst/issues/44)) ([5992ad1](https://github.com/haiilo/catalyst/commit/5992ad1bd8661475db3576e875c6ca86789bfefc))
* **core:** updated badge ([#46](https://github.com/haiilo/catalyst/issues/46)) ([40711e5](https://github.com/haiilo/catalyst/commit/40711e5113f44d6fc4b3caa936c20c11271f5ea2))


### Bug Fixes

* **core:** radio group value access ([eeafc9e](https://github.com/haiilo/catalyst/commit/eeafc9e2f034e4e4f25e271a5a8c89d09cb1e80d))
* **core:** rework select component ([dbf30bc](https://github.com/haiilo/catalyst/commit/dbf30bcf83ace4cc8b9f3346c496f2f038b898f1))

### [0.10.5](https://github.com/haiilo/catalyst/compare/v0.10.2...v0.10.5) (2022-07-12)


### Features

* **core:** update card component spacings ([#44](https://github.com/haiilo/catalyst/issues/44)) ([5992ad1](https://github.com/haiilo/catalyst/commit/5992ad1bd8661475db3576e875c6ca86789bfefc))

### [0.10.2](https://github.com/haiilo/catalyst/compare/v0.10.1...v0.10.2) (2022-07-07)


### Features

* **core:** add some improvements to select component ([0ffd310](https://github.com/haiilo/catalyst/commit/0ffd310b73148386c93acdf7acefc33d2629b493))
* **core:** adjust spacings of card navigation ([dc2ac7b](https://github.com/haiilo/catalyst/commit/dc2ac7be134565de63ea7150f280d7bb202eef41))

### [0.10.1](https://github.com/haiilo/catalyst/compare/v0.10.0...v0.10.1) (2022-07-04)


### Features

* **core:** add label alignment options to checkbox / radio / toggle ([#41](https://github.com/haiilo/catalyst/issues/41)) ([4a4d803](https://github.com/haiilo/catalyst/commit/4a4d803888825c8c76f87596046563b74543bc0a))


### Bug Fixes

* **core:** add remove item button, add scrolled bottom emitter ([#40](https://github.com/haiilo/catalyst/issues/40)) ([46b80ed](https://github.com/haiilo/catalyst/commit/46b80edf9d5393c071a54d3b28d9b3df0dbc7ada))
* **core:** button hover style change ([#39](https://github.com/haiilo/catalyst/issues/39)) ([e67f375](https://github.com/haiilo/catalyst/commit/e67f3753046cb2c747763b6b12a92782339e1b3e))
* Fix radio buttons in a radio group ([#38](https://github.com/haiilo/catalyst/issues/38)) ([cf2a453](https://github.com/haiilo/catalyst/commit/cf2a45305fd121370ec3b9cfbb83d3293ad6439c))

## [0.10.0](https://github.com/haiilo/catalyst/compare/v0.9.0...v0.10.0) (2022-06-30)


### Features

* **core:** add .cat-plain class to lists ([4007849](https://github.com/haiilo/catalyst/commit/40078498b30cf032d4c9c77215522fe28012ea47))
* **core:** add pull-out helper classes for cards ([ae803a0](https://github.com/haiilo/catalyst/commit/ae803a01f38ccfedc69281258af61c954b30dc6c))
* **core:** fix value accessor ([697b15d](https://github.com/haiilo/catalyst/commit/697b15d44a276c1edcf94271cf047032b91987d2))
* **core:** fix value accessor ([8e7c20b](https://github.com/haiilo/catalyst/commit/8e7c20b8c5aed15b2aea094ff3753c18aba8cd35))


### Bug Fixes

* **core:** hotfix for the select multiple component ([#37](https://github.com/haiilo/catalyst/issues/37)) ([c604584](https://github.com/haiilo/catalyst/commit/c604584a14d1891accca3b4f7ebbc4fa3f74c187))
* **core:** remove global scripts from bundle ([5cb52ec](https://github.com/haiilo/catalyst/commit/5cb52eccc4dae6eaf4a29f16891786fda2f72467))

## [0.9.0](https://github.com/haiilo/catalyst/compare/v0.8.3...v0.9.0) (2022-06-29)


### Features

* **angular:** add injector for singleton services ([067b50e](https://github.com/haiilo/catalyst/commit/067b50ebee5367044f9ae7d35fdf21fd0a1ad5e6))
* **core:** watcher for the value property added ([#35](https://github.com/haiilo/catalyst/issues/35)) ([c3cf098](https://github.com/haiilo/catalyst/commit/c3cf098af4d68406f5057f2883bd0d4e47ce5d67))

### [0.8.3](https://github.com/haiilo/catalyst/compare/v0.8.1...v0.8.3) (2022-06-28)


### Features

* **core:** added select and modal components in declarations and exports ([#32](https://github.com/haiilo/catalyst/issues/32)) ([2be7173](https://github.com/haiilo/catalyst/commit/2be71730e8902aef629cc991ece7358c732a4edc))
* label & hint support for selects ([#34](https://github.com/haiilo/catalyst/issues/34)) ([6cff9fd](https://github.com/haiilo/catalyst/commit/6cff9fd2d1e9ddfa92ff0c44ad22f676fb028b2d))
* support label & hints for select ([#33](https://github.com/haiilo/catalyst/issues/33)) ([7243559](https://github.com/haiilo/catalyst/commit/7243559ccb143bad359bb6938f1edec37b68fa0d))

### [0.8.2](https://github.com/haiilo/catalyst/compare/v0.8.1...v0.8.2) (2022-06-27)


### Features

* **core:** added select and modal components in declarations and exports ([#32](https://github.com/haiilo/catalyst/issues/32)) ([2be7173](https://github.com/haiilo/catalyst/commit/2be71730e8902aef629cc991ece7358c732a4edc))

### [0.8.1](https://github.com/haiilo/catalyst/compare/v0.8.0...v0.8.1) (2022-06-24)

## [0.8.0](https://github.com/haiilo/catalyst/compare/v0.7.0...v0.8.0) (2022-06-24)


### Features

* **core:** added select ([#26](https://github.com/haiilo/catalyst/issues/26)) ([c24557a](https://github.com/haiilo/catalyst/commit/c24557a5e9bdae6993a580a135c16276a38120cd))
* **core:** icon component supports icons with a non 24px*24px viewbox ([63438c0](https://github.com/haiilo/catalyst/commit/63438c0d1bbea9fff08611ba9105e5b3e3f773a8))
* **core:** implement modal ([#22](https://github.com/haiilo/catalyst/issues/22)) ([3bd53fd](https://github.com/haiilo/catalyst/commit/3bd53fd9a1122c26eeea8b6366a32c59e5c63187))


### Bug Fixes

* **angular:** added missing exports ([4e1cf92](https://github.com/haiilo/catalyst/commit/4e1cf92f95a723505afe882ace868276c18f4578))
* **core:** index imports ([4ef2dbb](https://github.com/haiilo/catalyst/commit/4ef2dbb835336b2c1daf01eb55aef1298975fedd))
* **core:** slotted labels are displayed correctly ([e887985](https://github.com/haiilo/catalyst/commit/e887985e56f32620b50c6519ec4a4cf79e3b59a0))

### [0.7.1](https://github.com/haiilo/catalyst/compare/v0.7.0...v0.7.1) (2022-06-13)


### Features

* **core:** icon component supports icons with a non 24px*24px viewbox ([63438c0](https://github.com/haiilo/catalyst/commit/63438c0d1bbea9fff08611ba9105e5b3e3f773a8))


### Bug Fixes

* **core:** slotted labels are displayed correctly ([e887985](https://github.com/haiilo/catalyst/commit/e887985e56f32620b50c6519ec4a4cf79e3b59a0))

## [0.7.0](https://github.com/haiilo/catalyst/compare/v0.6.0...v0.7.0) (2022-06-10)


### Features

* **core:** support slotted hints ([#23](https://github.com/haiilo/catalyst/issues/23)) ([e9d3c37](https://github.com/haiilo/catalyst/commit/e9d3c37ec66e1b315cb7e2f762a833d6e0dfb43a))
* **core:** support slotted labels ([#24](https://github.com/haiilo/catalyst/issues/24)) ([0dda269](https://github.com/haiilo/catalyst/commit/0dda26990dc55d25b2386adfb927245e8d47a4cd))
* implement tabs ([#27](https://github.com/haiilo/catalyst/issues/27)) ([0b468ed](https://github.com/haiilo/catalyst/commit/0b468ed4cc04b6169e41f38e4d3cee1c1fae5855))


### Bug Fixes

* **core:** correct form value accessor functions ([#30](https://github.com/haiilo/catalyst/issues/30)) ([23422b3](https://github.com/haiilo/catalyst/commit/23422b398d1f06a4a2b86bd29c9998846e76c66f))
* **core:** tooltip correctly working on mobile [#18](https://github.com/haiilo/catalyst/issues/18) ([e30f908](https://github.com/haiilo/catalyst/commit/e30f9088dabf6436d8a5cd940476e4ea9832a3a9))

## [0.6.0](https://github.com/haiilo/catalyst/compare/v0.5.14...v0.6.0) (2022-06-02)


### Features

* **core:** adjust spacing of badges ([#21](https://github.com/haiilo/catalyst/issues/21)) ([b0401ee](https://github.com/haiilo/catalyst/commit/b0401eea9d0730b355716be29c1d29107a6ca40f))
* **core:** implement user avatars ([#29](https://github.com/haiilo/catalyst/issues/29)) ([55be9dd](https://github.com/haiilo/catalyst/commit/55be9dd07b2f8adc29833c169f9f0da379496b66))


### Bug Fixes

* **core:** make boolean properties false by default ([#25](https://github.com/haiilo/catalyst/issues/25)) ([b18cf91](https://github.com/haiilo/catalyst/commit/b18cf910e3572ffefe0055a6429b085398b6aad7))
* **core:** used "lato-medium" for headings ([#28](https://github.com/haiilo/catalyst/issues/28)) ([c984056](https://github.com/haiilo/catalyst/commit/c984056331194d54a95cc6eca7990a5bff744134))

### 0.5.14 (2022-05-11)

### 0.5.13 (2022-05-11)


### Features

* **core:** add missing exported components to angular module ([1323e0d](https://github.com/haiilo/catalyst/commit/1323e0d1fb7b0a12dc58ee0f34f925b10c98d49e))

### 0.5.12 (2022-05-06)

### 0.5.11 (2022-05-06)

### 0.5.10 (2022-05-06)

### 0.5.9 (2022-05-06)


### Features

* move to @haiilo/catalyst-icons@0.3.1 ([1c6c50c](https://github.com/haiilo/catalyst/commit/1c6c50c7e3fe249139a4fde43efe4c993738413f))

### 0.5.8 (2022-05-05)

### 0.5.7 (2022-05-05)

### 0.5.6 (2022-05-05)

### [0.5.5](https://github.com/haiilo/catalyst/compare/v0.5.4...v0.5.5) (2022-05-05)

### [0.5.4](https://github.com/haiilo/catalyst/compare/v0.5.3...v0.5.4) (2022-05-05)

### [0.5.3](https://github.com/haiilo/catalyst/compare/v0.5.2...v0.5.3) (2022-05-05)

### [0.5.2](https://github.com/haiilo/catalyst/compare/v0.5.1...v0.5.2) (2022-05-05)


### Features

* **core:** move back to node 16 (LTS) ([1947a1f](https://github.com/haiilo/catalyst/commit/1947a1faa8940758379098feefcea18f7e25b10c))
* move from lerna to npm workspaces ([d051ead](https://github.com/haiilo/catalyst/commit/d051eadc909d09b2badf5aee22e1e4f78652bd7c))

## [0.5.1](https://github.com/haiilo/catalyst/compare/v0.5.0...v0.5.1) (2022-05-02)

**Note:** Version bump only for package catalyst





# [0.5.0](https://github.com/haiilo/catalyst/compare/v0.4.0...v0.5.0) (2022-05-02)


### Bug Fixes

* **core:** adjust tooltip styles ([e32fe78](https://github.com/haiilo/catalyst/commit/e32fe787483ba0b9173864cd42c05b994f2593c5))
* **core:** fix menu & tooltip z-indexes ([5f7dc67](https://github.com/haiilo/catalyst/commit/5f7dc6763c1d591adea6952982f2c64eb76ae318))
* **core:** fixed tooltip test ([#12](https://github.com/haiilo/catalyst/issues/12)) ([868da66](https://github.com/haiilo/catalyst/commit/868da66e93e53b32a8f5bda88a6dd0db50b1b84b))


### Features

* add radio button component ([642cff0](https://github.com/haiilo/catalyst/commit/642cff0d7f037202c5abf65f1bf8381970bcdd69))
* **core:** add aspect ratio utility classes ([ff29637](https://github.com/haiilo/catalyst/commit/ff296379411af1efb613b5b22ccb8c3288d9940c))
* **core:** add card component ([3be7246](https://github.com/haiilo/catalyst/commit/3be724616b8fa924e719a73aa688aa29a9c2f891))
* **core:** add input component ([337649a](https://github.com/haiilo/catalyst/commit/337649a44001f908110372c3341963bbbd0167f9))
* **core:** add navigation styles ([6afb6e9](https://github.com/haiilo/catalyst/commit/6afb6e9017f0dafb2c0712d914f43f895b4b9124))
* **core:** add style to kbd and code element ([844059d](https://github.com/haiilo/catalyst/commit/844059d8b4e89a4c7bf76f2b125515f24f2e8383))
* **core:** add textarea component ([9f94637](https://github.com/haiilo/catalyst/commit/9f94637fddd03f4bf98b6d90fa93ce814341efdb))
* **core:** added checkbox & toggle component ([205b0d0](https://github.com/haiilo/catalyst/commit/205b0d0cc468d40fe742a22fb1608ef25525918f))





# [0.4.0](https://github.com/haiilo/catalyst/compare/v0.3.2...v0.4.0) (2022-04-26)


### Features

* **core:** add tooltip component ([8134e98](https://github.com/haiilo/catalyst/commit/8134e98cde4f7b9e746c2179ffafdbfe8eff4128))





## [0.3.2](https://github.com/haiilo/catalyst/compare/v0.3.1...v0.3.2) (2022-04-25)

**Note:** Version bump only for package catalyst





## 0.3.1 (2022-04-23)


### Bug Fixes

* **core:** button alignment in blocks ([5a33502](https://github.com/haiilo/catalyst/commit/5a33502be421e6e5b6709e206dc7f0ee62d01d83))
* **core:** fix cat-token function for map types ([ee63111](https://github.com/haiilo/catalyst/commit/ee63111ea583cecacb8cdb92f120f6f495140b2e))
* **core:** update broken token dependency ([03b2241](https://github.com/haiilo/catalyst/commit/03b22411afb0944f89ab45217766234df08ff865))
* lerna integration ([ebab9a3](https://github.com/haiilo/catalyst/commit/ebab9a37748e11a33fd552502ed95bfec949c409))
* umd warning ([e678c5f](https://github.com/haiilo/catalyst/commit/e678c5fa6e8d89105323de0fcb90b9cfdba6222c))


### Features

* **core:** add a11y to menu component ([e8c2bfa](https://github.com/haiilo/catalyst/commit/e8c2bfaa5b7dac51046dfc22ab7f4b767ec99623))
* **core:** add alert ([8cad923](https://github.com/haiilo/catalyst/commit/8cad92339ac74b142ca6a4a0ec143982c659b970))
* **core:** add badge ([d250eb8](https://github.com/haiilo/catalyst/commit/d250eb808f77c34a430b5406edba7c11e12cf4bd))
* **core:** add initial menu component implementation ([#3](https://github.com/haiilo/catalyst/issues/3)) ([219370b](https://github.com/haiilo/catalyst/commit/219370bf5957585c23aab2b728dff0812da2c3a6))
* **core:** add skeleton component ([561f7a6](https://github.com/haiilo/catalyst/commit/561f7a627770aaef6daadca0acc5c0c858261320))
* **core:** added scrollable component ([347886b](https://github.com/haiilo/catalyst/commit/347886b2782801e445da7afc2f768aa531862084))
* **core:** changes for coyo app integration ([7304886](https://github.com/haiilo/catalyst/commit/7304886e5a2a781adcb0db2b1a63ddc58eaa6ef8))
* **core:** changes for coyo app integration ([2b6cc05](https://github.com/haiilo/catalyst/commit/2b6cc057bbd813f328ff36374a514bc56d6a15bd))
* **core:** changes for coyo app integration ([101297d](https://github.com/haiilo/catalyst/commit/101297dde26a5e8ecd007cd535667d2d3e71441a))
* **core:** extend border radius helper utilities ([fe9ba2e](https://github.com/haiilo/catalyst/commit/fe9ba2e3f38f0d2e71b372aaa23a2b281e153e34))
* **core:** flex & grid helpers ([4152d04](https://github.com/haiilo/catalyst/commit/4152d041190d7f31693d024cd6519e2ffb220e23))
* **core:** typo and color styles ([b20fa87](https://github.com/haiilo/catalyst/commit/b20fa87cf62dfdb142fc6fbb819d4899e4eb1158))


### Reverts

* Revert "added storybook" ([3077805](https://github.com/haiilo/catalyst/commit/30778059db1fcdae8a6b0d012d712c8b21010461))
