const assert = require("chai").assert;
const cheerio = require("cheerio");
const expect = require('chai').expect;
const fs = require('fs');
const helpers = require("./helpers");
const parse5 = require("parse5");
const ts = require('typescript');

class ProductListComponent {}
class ProductPageComponent {}
let ar;

describe("Module 6 - AppComponent", () => {
  it("should only contain a single tag named router-outlet @app-component-html-uses-router-outlet", () => {
    const file = helpers.readFile("src/app/app.component.html");
    const nodes = helpers.parseFile(file);
    const appProductComponent = helpers.getHtmlTag("app-product-page", nodes);
    const appProductList = helpers.getHtmlTag("app-product-list", nodes);
    const routerOutlet = helpers.getHtmlTag("router-outlet", nodes);

    assert(
      appProductComponent.length === 0,
      "The AppComponent shouldn't have an `app-product-page` selector."
    );

    assert(
      appProductList.length === 0,
      "The `router-outlet` tag hasn't replaced the `app-product-list` tag yet."
    );

    assert(
      routerOutlet.length > 0,
      "There's currently no `router-outlet` tag in the AppComponent HTML file."
    );
  });
});

describe('Module 6 - AppModule', () => {
  it(`should have a const array named appRoutes where index 2 contains an object with the correct keys and values @app-module-approutes-array-contains-correct-default-route`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/app.module.ts').toString();
    } catch (e) {
      assert(false, "There is no `app.module.ts` file for some strange reason.")
    }
    let re = /(const\s+appRoutes\s*\:\s*Routes\s*\=\s*\[(?:[\w\s\:\'\"\,\{\}\/\;]*)\]\;?)\s*\@NgModule/
    let match = file.match(re);
    assert(match != undefined, "You haven't added an appRoutes array constant of type `Routes` in the correct place.");

    let match_trimmed = match[1].trim();

    let js = ts.transpile(match_trimmed)

    eval(js + "ar = appRoutes");
    
    if (ar.length > 2) {
      assert(ar[0].path == "products", "In the `appRoutes` array, the first object's `path` key is not set to `products`.")
      assert(ar[0].component.toString().match(/class ProductListComponent/), "In the `appRoutes` array, the first object's `component` key is not set to `ProductListComponent`.")
      assert(ar[1].path == "product/:id", "In the `appRoutes` array, the second object's `path` key is not set to `product/:id`.")
      assert(ar[1].component.toString().match(/class ProductPageComponent/), "In the `appRoutes` array, the second object's `component` key is not set to `ProductPageComponent`.")
      assert(ar[2].path == "", "In the `appRoutes` array, the third object's `path` key is not set to `\"\"`.")
      assert(ar[2].redirectTo == "products", "In the `appRoutes` array, the third object's `redirectTo` key is not set to `products`.")
      assert(ar[2].pathMatch == "full", "In the `appRoutes` array, the third object's `pathMatch` key is not set to `full`.")
    } else {
      assert(false, "You haven't added a third object with keys and values that represents a default route to the `appRoutes` array yet.");
    }
  });

  it(`should have a const array named appRoutes where index 0 contains an object with the correct keys and values @app-module-approutes-array-contains-correct-object1`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/app.module.ts').toString();
    } catch (e) {
      assert(false, "There is no `app.module.ts` file for some strange reason.")
    }
    let re = /const\s+appRoutes\s*\:\s*Routes\s*\=\s*\[([\w\s\:\'\"\,\{\}\/\;]*)\]\;?\s*\@NgModule/
    let match = file.match(re);
    assert(match != undefined, "You haven't added an appRoutes array constant of type `Routes` in the correct place.");

    let match_trimmed = match[1].trim();    
    let re2 = /\{\s*(?:\w+)\s*\:\s*(?:\'|\")(?:[\w\/\:]+)(?:\'|\")\s*\,\s*(?:\w+)\s*\:\s*(?:\w+)\s*\}\,?/g
    let match2 = match_trimmed.match(re2);
    assert(Array.isArray(match2), "You haven't added any objects with keys and values to the `appRoutes` array yet.");

    let re3 = /\{\s*(\w+)\s*\:\s*(?:\'|\")([\w\/\:]+)(?:\'|\")\s*\,\s*(\w+)\s*\:\s*(\w+)\s*\}/
    let match3 = match2[0].match(re3)

    let key1 = match3[1];
    let value1 = match3[2];
    let key2 = match3[3];
    let value2 = match3[4];

    assert(key1 == 'path', "The first object in the `appRoutes` constant doesn't have a `path` key.");
    assert(value1 == 'products', "The first object in the `appRoutes` constant's path key doesn't have a value of `products`.");
    assert(key2 == 'component', "The first object in the `appRoutes` constant doesn't have a `component` key.");
    assert(value2 == 'ProductListComponent', "The first object in the `appRoutes` constant's component key doesn't have a value of `ProductListComponent`.");
  });

  it(`should have a const array named appRoutes where index 1 contains an object with the correct keys and values @app-module-approutes-array-contains-correct-object2`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/app.module.ts').toString();
    } catch (e) {
      assert(false, "There is no `app.module.ts` file for some strange reason.")
    }
    let re = /const\s+appRoutes\s*\:\s*Routes\s*\=\s*\[([\w\s\:\'\"\,\{\}\/\;]*)\]\;?\s*\@NgModule/
    let match = file.match(re);
    assert(match != undefined, "You haven't added an appRoutes array constant of type `Routes` in the correct place.");
    
    let match_trimmed = match[1].trim();
    let re2 = /\{\s*(?:\w+)\s*\:\s*(?:\'|\")(?:[\w\/\:]+)(?:\'|\")\s*\,\s*(?:\w+)\s*\:\s*(?:\w+)\s*\}\,?/g
    let match2 = match_trimmed.match(re2);
    assert(Array.isArray(match2), "You haven't added any objects with keys and values to the `appRoutes` array yet.");

    if (match2.length == 1) {
      assert(false, "You haven't added a second object with keys and values to the `appRoutes` array yet.")
    } else {
      let re3 = /\{\s*(\w+)\s*\:\s*(?:\'|\")([\w\/\:]+)(?:\'|\")\s*\,\s*(\w+)\s*\:\s*(\w+)\s*\}/
      let match3 = match2[1].match(re3)
      
      let key1 = match3[1];
      let value1 = match3[2];
      let key2 = match3[3];
      let value2 = match3[4];
  
      assert(key1 == 'path', "The second object in the `appRoutes` constant doesn't have a `path` key.");
      assert(value1 == 'product/:id', "The second object in the `appRoutes` constant's path key doesn't have a value of `product/:id`.");
      assert(key2 == 'component', "The second object in the `appRoutes` constant doesn't have a `component` key.");
      assert(value2 == 'ProductPageComponent', "The second object in the `appRoutes` constant's component key doesn't have a value of `ProductPageComponent`.");
      }
  });

  it(`should have a const array named appRoutes of type Routes @app-module-defines-approutes-array`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/app.module.ts').toString();
    } catch (e) {
      assert(false, "There is no `app.module.ts` file for some strange reason.")
    }
    let re = /const\s+appRoutes\s*\:\s*Routes\s*\=\s*\[[\w\s\:\'\"\,\{\}\/\;]*\]\;?\s*\@NgModule/
    let match = file.match(re);
    assert(Array.isArray(match), "There is currently no array of type Routes declared before `@NgModule`.");
  });

  it(`should import the RouterModule and Routes classes @app-module-imports-routermodule`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/app.module.ts').toString();
    } catch (e) {
      assert(false, "There is no `app.module.ts` file for some strange reason.")
    }
    let re = /import\s*{([\w,\s]+)}\s*from\s*[\'|\"]@angular\/router[\'|\"]\;?/
    let match = file.match(re);
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "Nothing from `@angular/router` has been imported into the AppModule yet.")
    
    let arr = match[1].split(',');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    }

    assert(Array.isArray(arr) && arr.includes('RouterModule'), "`RouterModule` is not currently imported from `@angular/router`.");
    assert(Array.isArray(arr) && arr.includes('Routes'), "`Routes` is not currently imported from `@angular/router`.");
  });

  it(`should add the appRoutes to the NgModule imports section @app-module-ngmodule-imports-approutes`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/app.module.ts').toString();
    } catch (e) {
      assert(false, "There is no `app.module.ts` file for some strange reason.")
    }
    let re = /imports\s*\:\s*\[\s*([\w\s\(\)\.\,]+)\]/g
    let match = re.exec(file);
    assert(Array.isArray(match), "There isn't an `imports` array in the `@NgModule` for some reason.")

    let arr = match[1].split(',');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    }

    assert(Array.isArray(arr) && arr.includes('RouterModule.forRoot(appRoutes)'), "The `appRoutes` array hasn't been added in the `@NgModule`'s `imports` array.");
  });
});

describe("Module 6 - ProductListComponent", () => {
  it("should have anchor elements that have a routerLink attribute with the correct values @product-list-anchor-tags-have-routerlink-attribute", () => {
    let li, $, element, anchorTag;
    const productListFile = helpers.readFile(
      "src/app/product-list/product-list.component.html"
    );
    const productListNodes = helpers.parseFile(productListFile);

    helpers.readFile(
      "src/app/product-list/product-list.component.html",
      "The ProductListComponent doesn't exist - have you run the `ng` command to generate it yet?"
    );

    try {
      productListNodes[0].attrs.find(attr => (list = attr.value.match(/list/)));
      const productListing = parse5.serialize(productListNodes[0]);
      $ = cheerio.load(productListing);
      li = $("li");
      anchorTag = li.children("a");
      element = productListNodes[0].tagName;
    } catch (e) {
      assert(
        "The ProductListComponent's HTML file doesn't contain an `li` tag."
      );
    }

    assert(
      element !== "p",
      "It looks like you have not replaced the `<p></p>` element with an `ul` tag."
    );

    assert(
      element === "ul",
      "The ProductListComponent's HTML file doesn't contain an `ul` tag."
    );

    assert(
      li.length > 0,
      "It doesn't look like that there is a `<li></li>` element inside the ProductListComponent's HTML file."
    );

    assert(
      li.length < 2,
      "We shouldn't need more than one `<li></li>` element. We should be using the `ngFor` directive to generate the other list items."
    );

    assert(
      !!li.attr()["*ngfor"],
      "It doesn't look like that the ProductListComponent is using the `ngFor` directive."
    );

    assert(
      anchorTag.length > 0,
      "There aren't any list items with anchor tags as children in the ProductListComponent's template."
    );

    assert(
      anchorTag.text().match(/\s*{{\s*product.albumName\s*}}\s*/),
      "It doesn't look like that the opening and closing anchor tags are wrapping around `{{product.albumName}}`."
    );

    assert(
      !!anchorTag.attr()["routerlink"],
      "It looks like that the anchor tag inside ProductListComponent is not using the `routerLink` attribute with a value of `/product/{{product.id}}`."
    );

    assert(
      anchorTag.attr()["routerlink"].match(/\s*\/product\/{{product.id}}\s*/),
      "The `routerLink` directive doesn't have `/product/{{product.id}}` as its value."
    );

    assert(
      !!anchorTag.attr()["routerlinkactive"],
      "It looks like that the anchor tag inside ProductListComponent is not using the `routerLinkActive` attribute with a value of `active`."
    );

    assert(
      anchorTag.attr()["routerlinkactive"].match(/\s*active\s*/),
      "The `routerLinkActive` attribute doesn't have `active` as its value."
    );
  });

  it("should have anchor elements inside of li elements that contain the album name @product-list-li-tags-contain-anchor-tags", () => {
    let li, $, element, anchorTag;
    const productListFile = helpers.readFile(
      "src/app/product-list/product-list.component.html"
    );
    const productListNodes = helpers.parseFile(productListFile);

    helpers.readFile(
      "src/app/product-list/product-list.component.html",
      "The ProductListComponent doesn't exist - have you run the `ng` command to generate it yet?"
    );

    try {
      productListNodes[0].attrs.find(attr => (list = attr.value.match(/list/)));
      const productListing = parse5.serialize(productListNodes[0]);
      $ = cheerio.load(productListing);
      li = $("li");
      anchorTag = li.children("a");
      element = productListNodes[0].tagName;
    } catch (e) {
      assert(
        "The ProductListComponent's HTML file doesn't contain an `li` tag."
      );
    }

    assert(
      element !== "p",
      "It looks like you have not replaced the `<p></p>` element with an `ul` tag."
    );

    assert(
      element === "ul",
      "The ProductListComponent's HTML file doesn't contain an `ul` tag."
    );

    assert(
      li.length > 0,
      "It doesn't look like that there is a `<li></li>` element inside the ProductListComponent's HTML file."
    );

    assert(
      li.length < 2,
      "We shouldn't need more than one `<li></li>` element. We should be using the `ngFor` directive to generate the other list items."
    );

    assert(
      !!li.attr()["*ngfor"],
      "It doesn't look like that the ProductListComponent is using the `ngFor` directive."
    );

    assert(
      anchorTag.length > 0,
      "There aren't any list items with anchor tags as children in the ProductListComponent's template."
    );

    assert(
      anchorTag.text().match(/\s*{{\s*product.albumName\s*}}\s*/),
      "It doesn't look like that the opening and closing anchor tags are wrapping around `{{product.albumName}}`."
    );
  });
});
