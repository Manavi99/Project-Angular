const assert = require("chai").assert;
const cheerio = require("cheerio");
const expect = require('chai').expect;
const fs = require('fs');
const helpers = require("./helpers");
const parse5 = require("parse5");
const { readFileSync } = require("fs");
const { tsquery } = require("@phenomnomnominal/tsquery");

describe("Module 5 - AppComponent", () => {
  it("should contain the app-product-list element @app-product-list-selector", () => {
    const file = helpers.readFile("src/app/app.component.html");
    const nodes = helpers.parseFile(file);
    const appProductComponent = helpers.getHtmlTag("app-product-page", nodes);
    const appProductList = helpers.getHtmlTag("app-product-list", nodes);

    assert(
      appProductComponent.length === 0,
      "The `app-product-list` tag hasn't replaced the `app-product-page` tag yet."
    );

    assert(
      appProductList.length > 0,
      "We couldn't find the `app-product-list` tag - are you sure you added the right selector to the AppComponent?"
    );
  });
});

describe("Module 5 - Project", () => {
  it("should create the product list component @product-list-component-created", () => {
    helpers.readFile(
      "src/app/product-list/product-list.component.ts",
      "The ProductListComponent doesn't exist - have you run the `ng` command to generate it yet?"
    );
  });
});

describe('Module 5 - Product Interface', () => {
  it(`should exist @product-interface-exists`, () => {
    assert(fs.existsSync(__dirname + '/../app/product.ts'), "The Product interface hasn't been created yet.");
    
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product.ts').toString();
    } catch (e) {
      assert(false, "The Product interface hasn't been created yet.")
    }

    let re = /export\s+interface\s+Product/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "There's a `product.ts` file, but it doesn't export an interface named `Product`.");
  });

  it(`should have an id property of type number @product-interface-has-three-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/product.ts').toString();
    } catch (e) {
      assert(false, "The Product interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Product\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's a `product.ts` file, but it doesn't export an interface named `Product`.");
    
    let arr = match[1].split('\n');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    }

    let properties = [];    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].trim().length > 0) {
        let obj = {};
        obj['key'] = arr[i].trim().split(':')[0].trim();
        obj['value'] = arr[i].trim().split(':')[1].trim();
        properties[i] = obj;
      }
    }
    
    let idKeyFound = false
      , idValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'id') {
        idKeyFound = true;
        if (properties[i].value.match(new RegExp(/number/))) {
          idValueFound = true;
        }
      }
    }
    assert(idKeyFound, "The Product Interface doesn't define a property named `id`.");
    assert(idValueFound, "The Product Interface's `id` property isn't typed as `number`.");
  });

  it(`should have an artistName property of type string @product-interface-has-three-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/product.ts').toString();
    } catch (e) {
      assert(false, "The Product interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Product\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's a `product.ts` file, but it doesn't export an interface named `Product`.");
    
    let arr = match[1].split('\n');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    }

    let properties = [];    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].trim().length > 0) {
        let obj = {};
        obj['key'] = arr[i].trim().split(':')[0].trim();
        obj['value'] = arr[i].trim().split(':')[1].trim();
        properties[i] = obj;
      }
    }
    
    let artistNameKeyFound = false
      , artistNameValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'artistName') {
        artistNameKeyFound = true;
        if (properties[i].value.match(new RegExp(/string/))) {
          artistNameValueFound = true;
        }
      }
    }
    assert(artistNameKeyFound, "The Product Interface doesn't define a property named `artistName`.");
    assert(artistNameValueFound, "The Product Interface's `artistName` property isn't typed as `string`.");
  });

  it(`should have an albumName property of type string @product-interface-has-three-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/product.ts').toString();
    } catch (e) {
      assert(false, "The Product interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Product\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's a `product.ts` file, but it doesn't export an interface named `Product`.");
    
    let arr = match[1].split('\n');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    }

    let properties = [];    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].trim().length > 0) {
        let obj = {};
        obj['key'] = arr[i].trim().split(':')[0].trim();
        obj['value'] = arr[i].trim().split(':')[1].trim();
        properties[i] = obj;
      }
    }
    
    let albumNameKeyFound = false
      , albumNameValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'albumName') {
        albumNameKeyFound = true;
        if (properties[i].value.match(new RegExp(/string/))) {
          albumNameValueFound = true;
        }
      }
    }
    assert(albumNameKeyFound, "The Product Interface doesn't define a property named `albumName`.");
    assert(albumNameValueFound, "The Product Interface's `albumName` property isn't typed as `string`.");
  });
});

describe('Module 5 - ProductService', () => {
  it(`should have a method named getProducts() that takes no parameters @product-service-has-getproducts-method`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /getProducts\s*\(\s*\)(\s*\:\s*Observable\<Product\[\]\>\s*)?\s*\{[\s\w\.\:\(\)\;=><\[\]]+\}/
    let match = file.match(re);
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The `getProducts()` method hasn't been added to the ProductService.");
  });

  it(`should have a private class property named _productsUrl set to the correct value @product-service-has-productsurl-property`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /private\s+\_productsUrl\s*(:\s*string\s*)?\=\s*[\'|\"](\.\.\/assets\/products.json)[\'|\"]\s*\;?/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductService doesn't have a `_productsUrl` property with the correct definition or value.")
  });

  it(`should import the Product Interface @product-interface-imported-into-product-service`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /import\s*{\s*Product\s*}\s*from\s*[\'|\"]\.\/product[\'|\"]\;?/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The Product Interface hasn't been imported into the ProductService yet.");
  });

  it("should map the result of get request to json with rxjs map function @product-service-getproducts-method-maps-response-to-json", () => {
    const fileName = "src/app/product.service.ts";

    helpers.readFile(
      fileName,
      "The ProductService hasn't been created yet. - have you run the `ng` command to generate it yet?"
    );

    //https://medium.com/@phenomnominal/easier-typescript-tooling-with-tsquery-d74f04f2b29d
    const ast = tsquery.ast(readFileSync(fileName).toString());

    const privateDeclaration = tsquery(
      ast,
      "PropertyDeclaration PrivateKeyword"
    );

    assert(
      privateDeclaration.length > 0,
      "It doesn't look like you are declaring `private _productsUrl` keyword and assigning the contents of the `products.json` file to it."
    );

    const productsUrlDeclaration = tsquery(
      ast,
      "PropertyDeclaration Identifier[name=_productsUrl]"
    );

    assert(
      productsUrlDeclaration.length > 0,
      "It doesn't look like you are declaring `private _productsUrl` keyword and assigning the contents of the `products.json` file to it."
    );

    const productsJsonFile = tsquery(
      ast,
      "PropertyDeclaration StringLiteral[value='../assets/products.json']"
    );

    assert(
      productsJsonFile.length > 0,
      "It doesn't look like you are declaring `private _productsUrl` keyword and assigning the contents of the `products.json` file to it."
    );

    const getProductsMethod = tsquery(ast, 'Identifier[name="getProducts"]');

    assert(
      getProductsMethod.length > 0,
      "The ProductService doesn't have a method named `getProducts()` yet."
    );

    const returnStatement = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getProducts] ) ReturnStatement"
    );

    assert(
      returnStatement.length > 0,
      "The `getProducts()` doesn't have a `return` statement yet."
    );

    const thisStatement = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getProducts] ) CallExpression ThisKeyword"
    );

    assert(
      thisStatement.length > 0,
      "It doesn't look like you're returning the result of calling `this._http.get()` and passing `this._productsUrl` as a parameter."
    );

    const httpGet = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getProducts] ) CallExpression PropertyAccessExpression Identifier[name=_http]"
    );

    assert(
      httpGet.length > 0,
      "It doesn't look like you're returning the result of calling `this._http.get()`."
    );

    const getMethod = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getProducts] )  PropertyAccessExpression:has(Identifier[name=get]) "
    );

    assert(
      getMethod.length > 0,
      "It looks like the `getProducts` method is not sending a `GET` request."
    );

    assert(
      thisStatement.length > 1,
      "It doesn't look like you're returning the result of calling `this._http.get()` and passing `this._productsUrl` as a parameter."
    );

    const productsUrlArg = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getProducts] ) CallExpression PropertyAccessExpression Identifier[name=_productsUrl]"
    );

    assert(
      productsUrlArg.length > 0,
      "It doesn't look like you're passing `this._productsUrl` as an argument to the `this._http.get()` method call."
    );

    const importRxjs = tsquery(
      ast,
      "ImportDeclaration StringLiteral[value=rxjs/add/operator/map]"
    );

    assert(
      importRxjs.length > 0,
      "The ProductService isn't importing `map` from `rxjs/add/operator/map`."
    );

    const mapMethod = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getProducts]) CallExpression Identifier[name=map]"
    );

    assert(
      mapMethod.length > 0,
      "It doesn't look like that you're chaining a `map` method after `this._http.get(this._productsUrl)`."
    );

    const responseParameter = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getProducts]) CallExpression:has(Identifier[name=map]) Parameter Identifier[name=response]"
    );

    assert(
      responseParameter.length > 0,
      "The `map` method should be taking `response` as an argument of its callback function."
    );

    const responseReturn = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getProducts]) CallExpression:has(Identifier[name=map]) PropertyAccessExpression Identifier[name=response]"
    );

    assert(
      responseReturn.length > 0,
      "The `map` method should be returning `response.json`. "
    );

    const jsonReturn = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getProducts]) CallExpression:has(Identifier[name=map]) PropertyAccessExpression Identifier[name=json]"
    );

    assert(
      jsonReturn.length > 0,
      "The `map` method should be returning `response.json`. "
    );
  });

  it("should return contents of _productsUrl when getProducts() method called @product-service-getproducts-method-returns-products-json", () => {
    const fileName = "src/app/product.service.ts";

    helpers.readFile(
      fileName,
      "The ProductService hasn't been created yet. - have you run the `ng` command to generate it yet?"
    );

    //https://medium.com/@phenomnominal/easier-typescript-tooling-with-tsquery-d74f04f2b29d
    const ast = tsquery.ast(readFileSync(fileName).toString());

    const privateDeclaration = tsquery(
      ast,
      "PropertyDeclaration PrivateKeyword"
    );

    assert(
      privateDeclaration.length > 0,
      "It doesn't look like you are declaring `private _productsUrl` keyword and assigning the contents of the `products.json` file to it."
    );

    const productsUrlDeclaration = tsquery(
      ast,
      "PropertyDeclaration Identifier[name=_productsUrl]"
    );

    assert(
      productsUrlDeclaration.length > 0,
      "It doesn't look like you are declaring `private _productsUrl` keyword and assigning the contents of the `products.json` file to it."
    );

    const productsJsonFile = tsquery(
      ast,
      "PropertyDeclaration StringLiteral[value='../assets/products.json']"
    );

    assert(
      productsJsonFile.length > 0,
      "It doesn't look like you are declaring `private _productsUrl` keyword and assigning the contents of the `products.json` file to it."
    );

    const getProductsMethod = tsquery(ast, 'Identifier[name="getProducts"]');

    assert(
      getProductsMethod.length > 0,
      "The ProductService doesn't have a method named `getProducts()` yet."
    );

    const returnStatement = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getProducts] ) ReturnStatement"
    );

    assert(
      returnStatement.length > 0,
      "The `getProducts()` doesn't have a `return` statement yet."
    );

    const thisStatement = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getProducts] ) CallExpression ThisKeyword"
    );

    assert(
      thisStatement.length > 0,
      "It doesn't look like you're returning the result of calling `this._http.get()` and passing `this._productsUrl` as a parameter."
    );

    const httpGet = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getProducts] ) CallExpression PropertyAccessExpression Identifier[name=_http]"
    );

    assert(
      httpGet.length > 0,
      "It doesn't look like you're returning the result of calling `this._http.get()`."
    );

    const getMethod = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getProducts] )  PropertyAccessExpression:has(Identifier[name=get]) "
    );

    assert(
      getMethod.length > 0,
      "It looks like the `getProducts` method is not sending a `GET` request."
    );

    assert(
      thisStatement.length > 1,
      "It doesn't look like you're returning the result of calling `this._http.get()` and passing `this._productsUrl` as a parameter."
    );

    const productsUrlArg = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getProducts] ) CallExpression PropertyAccessExpression Identifier[name=_productsUrl]"
    );

    assert(
      productsUrlArg.length > 0,
      "It doesn't look like you're passing `this._productsUrl` as an argument to the `this._http.get()` method call."
    );
  });
});

describe('Module 5 - ProductList', () => {
  it(`should import the Product Interface @product-interface-imported-into-product-list`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-list/product-list.component.ts').toString();
    } catch (e) {
      assert(false, "ProductListComponent doesn't exist yet.")
    }
    let re = /import\s*{\s*Product\s*}\s*from\s*[\'|\"]\.\.\/product[\'|\"]\;?/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The Product Interface hasn't been imported into the ProductListComponent yet.");
  });

  it(`should have a class property named products of type Product[] @product-list-has-products-property`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-list/product-list.component.ts').toString();
    } catch (e) {
      assert(false, "ProductListComponent doesn't exist yet.")
    }
    let re = /products/
    let match1 = file.match(re);
    assert(Array.isArray(file.match(re)), "The `products` property doesn't exist yet.");

    let re2 = /products\s*\:\s*([\w\s\[\]]+)/
    let match2 = file.match(re2);
    assert(Array.isArray(file.match(re2)), "The `products` property doesn't have the correct type declaration.");

    let productsType = match2[1].trim();
    assert(productsType.includes('Product[]'), "The `products` type isn't declared as `Product[]`.");
  });

  it("should use ngFor to enumerate through each product in an li tag @product-list-html-uses-ngfor-to-enumerate-products", () => {
    let li, $, element;
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
      element = productListNodes[0].tagName;
    } catch (e) {
      assert(
        "The ProductListComponent's HTML file doesn't contain an `ul` tag."
      );
    }

    assert(
      element !== "p",
      "It looks like you have not replaced the `<p></p>` element with an `ul` tag."
    );

    assert(
      element === "ul",
      "The ProductListComponent's HTML file doesn't contain a `ul` tag."
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
      li.attr()["*ngfor"].match(/\s*let\s*product\s*of\s*products\s*/),
      "The `ngFor` directive doesn't have `let product of products` as its value."
    );
  });

  it(`should inject a private property named productService in the constructor @product-list-injects-product-service`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-list/product-list.component.ts').toString();
    } catch (e) {
      assert(false, "ProductListComponent doesn't exist yet.")
    }
    let re = /constructor\(([\w\s\_\:]+)\)/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductList constructor has no arguments.")
    
    let arg = match[1].trim();

    let re_arg = /\s*private\s+\_productService\s*\:\s*ProductService\s*/
    let arg_match = arg.match(re_arg);
    assert(Array.isArray(arg_match), "The ProductList constructor doesn't define a private `_productService` variable.");
  });

  it(`should call the ProductService's getProducts() method from ngOnInit() @product-list-ngoninit-calls-getProducts`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-list/product-list.component.ts').toString();
    } catch (e) {
      assert(false, "ProductListComponent doesn't exist yet.")
    }
    let re = /ngOnInit\(\s*\)\s*\{\s*([\w\s\(\)\.\_\=\>]+)\;?\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductList `ngOnInit()` method body doesn't contain anything.")

    let callToGetAlbum = match[1].trim();

    if (callToGetAlbum.includes('subscribe')) {
      let re2 = /this\._productService\s*\.\s*getProducts\(\)\s*\.\s*subscribe\(([\w\s\=\.\>]+)\)/
      let match2 = match[1].match(re2)
      assert(Array.isArray(match2), "The ProductList's `ngOnInit()` method body isn't chaining the correct call to subscribe onto the end of the call to `getProducts()`.")

      let variable_used_to_capture_response = match2[1].match(/\s*(\w+)\s*\=/);

      let expression = variable_used_to_capture_response[1] + "\\s*\\=\\>\\s*this\\.products\\s*\\=\\s*" + variable_used_to_capture_response[1]
      let regex = new RegExp(expression, 'g')

      assert(Array.isArray(match2[1].match(regex)), "The call to `getProducts()` in ProductList's `ngOnInit()` method body isn't subscribing to the response and assigning it to `this.products`.")
    } else {
      let re2 = /this\._productService\s*\.\s*getProducts\(\)/
      assert(match[0].match(re2), "The ProductList `ngOnInit()` method body isn't making the correct call to the ProductService's `getProducts` method.")
    }
  });

  it(`should define a class property named products @product-list-ngoninit-calls-getProducts`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-list/product-list.component.ts').toString();
    } catch (e) {
      assert(false, "ProductListComponent doesn't exist yet.")
    }
    let re = /ProductListComponent\s*implements\s*OnInit\s*\{\s*(\w+)/
    let match = file.match(re);
    assert(match[1] == 'products', "The ProductList doesn't have a class property named `products`.")
  });

  it("should have an li element that contains the album name @product-list-ul-contains-li-with-albumnames", () => {
    let li, $, element;
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
      element = productListNodes[0].tagName;
    } catch (e) {
      assert(
        "The ProductListComponent's HTML file doesn't contain an `ul` tag."
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
      li.text().match(/\s*{{\s*product.albumName\s*}}\s*/),
      "The album names in your HTML template don't match the album names in the `products` JSON response."
    );
  });

  it(`should import the ProductService @product-service-imported-into-product-list`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-list/product-list.component.ts').toString();
    } catch (e) {
      assert(false, "ProductListComponent doesn't exist yet.")
    }
    let re = /import\s*{\s*ProductService\s*}\s*from\s*[\'|\"]\.\.\/product\.service[\'|\"]\;?/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The ProductService hasn't been imported into the ProductListComponent yet.");
  });
});

describe('Module 5 - ProductService getProducts Method', () => {
  it(`should return an Observable typed to Product[] @product-service-getproducts-method-returns-typed-observable`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /getProducts\s*\(\s*\)\s*([\w\s\<\>\:\[\]]+)\{/
    let match = file.match(re);
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The `getProducts()` method isn't currently defining any return type.");
    
    let the_type = match[1].trim();

    let re2 = /\s*\:\s*Observable\<Product\[\]\>/
    let match2 = the_type.match(re2);

    assert(Array.isArray(file.match(re2)), "The `getProducts()` method isn't defining the correct return type.");
    assert(match2[0].includes('Observable<Product[]>'), "The `getProducts()` method isn't defining the correct return type.");
  });

  it(`should map response json to Product[] @product-service-getproducts-method-returns-typed-observable`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /productsUrl\)\s*\.\s*map\([\w\s\<\>\:\[\]\.\>\<\(\)]+\s*\=\>\s*([\w\<\>\[\]]+)response/
    let match = file.match(re);
    assert(Array.isArray(file.match(re)), "The `getProducts()` response JSON isn't asserted as type `Product[]`.");
    
    let the_type = match[1].trim();
    let re2 = /\s*\<Product\[\]\>\s*/
    let match2 = the_type.match(re2);

    assert(Array.isArray(file.match(re2)), "The `getProducts()` response JSON isn't asserted as type `Product[]`.");
    assert(match2[0].includes('Product[]'), "The `getProducts()` response JSON isn't asserted as type `Product[]`.");
  });
});


