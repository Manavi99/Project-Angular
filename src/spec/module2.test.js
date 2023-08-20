const assert = require("chai").assert;
const cheerio = require("cheerio");
const expect = require('chai').expect;
const fs = require('fs');
const helpers = require("./helpers");
const parse5 = require("parse5");
const { readFileSync } = require("fs");
const { tsquery } = require("@phenomnomnominal/tsquery");

describe("Module 2 - ProductDescription", () => {
  it("should use artist name data from the albumInfo property in the HTML template @product-description-html-uses-dynamic-albuminfo-band", () => {
    const productPageFile = helpers.readFile(
      "src/app/product-description/product-description.component.html"
    );

    const productPageNodes = helpers.parseFile(productPageFile);
    const productPageMain = helpers.getHtmlTag("div", productPageNodes);
    const productPageContent = parse5.serialize(productPageMain[0]);
    let $ = cheerio.load(productPageContent);
    let albumBandDiv = $(".band-name");

    helpers.readFile(
      "src/app/product-description/product-description.component.html",
      "The ProductDescriptionComponent HTML file doesn't exist for some reason."
    );

    assert(
      albumBandDiv.length > 0,
      "Something happened and it looks like the ProductDescription HTML file does not contain a paragraph with a class of `band-name`."
    );

    assert(
      albumBandDiv.text().match(/{{\s*albumInfo\?\.artist\s*}}/),
      "We'd like you to query the `albumInfo` property directly for the artist name, and we're not seeing that you're doing that."
    );
  });

  it("should use image url data from the albumInfo property in the HTML template @product-description-html-uses-dynamic-albuminfo-imageurl", () => {
    const productPageFile = helpers.readFile(
      "src/app/product-description/product-description.component.html"
    );

    const productPageNodes = helpers.parseFile(productPageFile);
    const productPageMain = helpers.getHtmlTag("div", productPageNodes);
    const productPageContent = parse5.serialize(productPageMain[0]);
    let $ = cheerio.load(productPageContent);
    let img = $("img");

    helpers.readFile(
      "src/app/product-description/product-description.component.html",
      "The ProductDescriptionComponent HTML file doesn't exist for some reason."
    );

    assert(
      img.length > 0,
      "Something happened and it looks like the ProductDescription HTML file is missing the `<img>` tag."
    );

    assert(
      img.attr("src") !== undefined,
      "The ProductDescription HTML file `<img>` tag is missing the `src` attribute."
    );

    assert(
      img.attr("src").match(/{{\s*albumInfo\?\.album\.coverImage\s*}}/),
      "We'd like you to query the albumInfo property directly for the cover image, and we're not seeing that you're doing that."
    );
  });

  it("should use album name data from the albumInfo property in the HTML template @product-description-html-uses-dynamic-albuminfo-name", () => {
    const productPageFile = helpers.readFile(
      "src/app/product-description/product-description.component.html"
    );

    const productPageNodes = helpers.parseFile(productPageFile);
    const productPageMain = helpers.getHtmlTag("div", productPageNodes);
    const productPageContent = parse5.serialize(productPageMain[0]);
    let $ = cheerio.load(productPageContent);
    let albumNameDiv = $(".album-name");

    helpers.readFile(
      "src/app/product-description/product-description.component.html",
      "The ProductDescriptionComponent HTML file doesn't exist for some reason."
    );

    assert(
      albumNameDiv.length > 0,
      "Something happened and it looks like the ProductDescription HTML file does not contain a paragraph with a class of `album-name`."
    );

    assert(
      albumNameDiv.text().match(/{{\s*albumInfo\?\.album\.name\s*}}/),
      "We'd like you to query the `albumInfo` property directly for the album name, and we're not seeing that you're doing that."
    );
  });

  it("should use release date data from the albumInfo property in the HTML template @product-description-html-uses-dynamic-albuminfo-releasedate", () => {
    const productPageFile = helpers.readFile(
      "src/app/product-description/product-description.component.html"
    );

    const productPageNodes = helpers.parseFile(productPageFile);
    const productPageMain = helpers.getHtmlTag("div", productPageNodes);
    const productPageContent = parse5.serialize(productPageMain[0]);
    let $ = cheerio.load(productPageContent);
    let albumReleaseDate = $(".album-release-date");

    helpers.readFile(
      "src/app/product-description/product-description.component.html",
      "The ProductDescriptionComponent HTML file doesn't exist for some reason."
    );

    assert(
      albumReleaseDate.length > 0,
      "Something happened and it looks like the ProductDescription HTML file does not contain a paragraph with a class of `album-release-date`."
    );

    assert(
      albumReleaseDate
        .text()
        .match(/{{\s*albumInfo\?\.album\.releaseDate\s*}}/),
      "We'd like you to query the albumInfo property directly for the release date, and we're not seeing that you're doing that."
    );
  });

  it(`should inject a private property named productService in the constructor @product-description-injects-product-service`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-description/product-description.component.ts').toString();
    } catch (e) {
      assert(false, "ProductDescriptionComponent doesn't exist yet.")
    }
    let re = /constructor\(([\w\s\_\:]+)\)/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductDescription constructor has no arguments.")

    let arg = match[1].trim();

    let re_arg = /\s*private\s+\_productService\s*\:\s*ProductService\s*/
    let arg_match = arg.match(re_arg);
    assert(Array.isArray(arg_match), "The ProductDescription constructor doesn't define a private `_productService` variable.");
  });

  it(`should call the ProductService's getAlbum() method from ngOnInit() @product-description-ngoninit-calls-getalbum`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-description/product-description.component.ts').toString();
    } catch (e) {
      assert(false, "ProductDescriptionComponent doesn't exist yet.")
    }
    let re = /ngOnInit\(\s*\)\s*\{\s*([\w\s\(\)\.\_\=\>]+)\;?\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductDescription `ngOnInit()` method body doesn't contain anything.")

    let callToGetAlbum = match[1].trim();

    if (callToGetAlbum.includes('subscribe')) {
      let re2 = /this\._productService\s*\.\s*getAlbum\(1\)\s*\.\s*subscribe\(([\w\s\=\.\>]+)\)/
      let match2 = match[1].match(re2)
      assert(Array.isArray(match2), "The ProductDescription's `ngOnInit()` method body isn't chaining the correct call to subscribe onto the end of the call to `getAlbum()`.")

      let variable_used_to_capture_response = match2[1].match(/\s*(\w+)\s*\=/);

      let expression = variable_used_to_capture_response[1] + "\\s*\\=\\>\\s*this\\.albumInfo\\s*\\=\\s*" + variable_used_to_capture_response[1]
      let regex = new RegExp(expression, 'g')

      assert(Array.isArray(match2[1].match(regex)), "The call to `getAlbum()` in ProductDescription's `ngOnInit()` method body isn't subscribing to the response and assigning it to `this.albumInfo`.")
    } else {
      let re2 = /this\._productService\s*\.\s*getAlbum\(1\)/
      assert(match[0].match(re2), "The ProductDescription `ngOnInit()` method body isn't making the correct call to the ProductService's `getAlbum` method.")
    }
  });

  it(`should define a class property named albumInfo @product-description-ngoninit-calls-getalbum`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-description/product-description.component.ts').toString();
    } catch (e) {
      assert(false, "ProductDescriptionComponent doesn't exist yet.")
    }
    let re = /ProductDescriptionComponent\s*implements\s*OnInit\s*\{\s*(\w+)/
    let match = file.match(re);
    assert(match[1] == 'albumInfo', "The ProductDescription doesn't have a class property named `albumInfo`.")
  });
});

describe('Module 2 - AppModule', () => {
  it(`should add the ProductService to the providers array @product-service-added-to-providers-array`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/app.module.ts').toString();
    } catch (e) {
      assert(false, "ProductService doesn't exist yet.");
    }
    let re = /providers\s*:\s*\[\s*ProductService\s*\]\s*\,/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The ProductService hasn't been added to the AppModule's `providers` array yet.");
  });

  it(`should import the ProductService @product-service-imported-into-app-module`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/app.module.ts').toString();
    } catch (e) {
      assert(false, "There is no `app.module.ts` file for some strange reason.")
    }
    let re = /import\s*{\s*ProductService\s*}\s*from\s*[\'|\"]\.\/product\.service[\'|\"]\;?/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The ProductService hasn't been imported into the AppModule yet.")
  });
});

describe('Module 2 - ProductService', () => {
  it(`should exist @product-service-exists`, () => {
    assert(fs.existsSync(__dirname + '/../app/product.service.ts'), "The ProductService hasn't been created yet.");
  });

  it("should map the result of get request to json with rxjs map function @product-service-getalbum-method-maps-response-to-json", () => {
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
      "It doesn't look like you are declaring `private _albumUrl` keyword and assigning the contents of the `album.json` file to it."
    );

    const albumUrlDeclaration = tsquery(
      ast,
      "PropertyDeclaration Identifier[name=_albumUrl]"
    );

    assert(
      albumUrlDeclaration.length > 0,
      "It doesn't look like you are declaring `private _albumUrl` keyword and assigning the contents of the `album.json` file to it."
    );

    const albumJsonFile = tsquery(
      ast,
      "PropertyDeclaration StringLiteral[value='../assets/album.json']"
    );

    assert(
      albumJsonFile.length > 0,
      "It doesn't look like you are declaring `private _albumUrl` keyword and assigning the contents of the `album.json` file to it."
    );

    const getAlbumMethod = tsquery(ast, 'Identifier[name="getAlbum"]');

    assert(
      getAlbumMethod.length > 0,
      "The ProductService doesn't have a method named `getAlbum()` yet."
    );

    const returnStatement = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getAlbum]) ReturnStatement"
    );

    assert(
      returnStatement.length > 0,
      "The `getAlbum()` doesn't have a `return` statement yet."
    );

    const thisStatement = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getAlbum]) CallExpression ThisKeyword"
    );

    assert(
      thisStatement.length > 0,
      "It doesn't look like you're returning the result of calling `this._http.get()` and passing `this._albumUrl` as a parameter."
    );

    const httpGet = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getAlbum]) CallExpression PropertyAccessExpression Identifier[name=_http]"
    );

    assert(
      httpGet.length > 0,
      "It doesn't look like you're returning the result of calling `this._http.get()`."
    );

    const getMethod = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getAlbum])  PropertyAccessExpression:has(Identifier[name=get])"
    );

    assert(
      getMethod.length > 0,
      "It looks like the `getAlbum` method is not sending a `GET` request."
    );

    assert(
      thisStatement.length > 1,
      "It doesn't look like you're returning the result of calling `this._http.get()` and passing `this._albumUrl` as a parameter."
    );

    const albumUrlArg = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getAlbum]) CallExpression PropertyAccessExpression Identifier[name=_albumUrl]"
    );

    assert(
      albumUrlArg.length > 0,
      "It doesn't look like you're passing `this._albumUrl` as an argument to the `this._http.get()` method call."
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
      "MethodDeclaration:has(Identifier[name=getAlbum]) CallExpression Identifier[name=map]"
    );

    assert(
      mapMethod.length > 0,
      "It doesn't look like that you're chaining a `map` method after `this._http.get(this._albumUrl)`."
    );

    const responseParameter = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getAlbum]) CallExpression:has(Identifier[name=map]) Parameter Identifier[name=response]"
    );

    assert(
      responseParameter.length > 0,
      "The `map` method should be taking `response` as an argument of its callback function."
    );

    const responseReturn = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getAlbum]) CallExpression:has(Identifier[name=map]) PropertyAccessExpression Identifier[name=response]"
    );

    assert(
      responseReturn.length > 0,
      "The `map` method should be returning `response.json`. "
    );

    const jsonReturn = tsquery(
      ast,
      "MethodDeclaration:has(Identifier[name=getAlbum]) CallExpression:has(Identifier[name=map]) PropertyAccessExpression Identifier[name=json]"
    );

    assert(
      jsonReturn.length > 0,
      "The `map` method should be returning `response.json`. "
    );
  });

  it("should return contents of _albumUrl when getAlbum method called @product-service-getalbum-method-returns-album-json", () => {
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
      "It doesn't look like you are declaring `private _albumUrl` keyword and assigning the contents of the `album.json` file to it."
    );

    const albumUrlDeclaration = tsquery(
      ast,
      "PropertyDeclaration Identifier[name=_albumUrl]"
    );

    assert(
      albumUrlDeclaration.length > 0,
      "It doesn't look like you are declaring `private _albumUrl` keyword and assigning the contents of the `album.json` file to it."
    );

    const albumJsonFile = tsquery(
      ast,
      "PropertyDeclaration StringLiteral[value='../assets/album.json']"
    );

    assert(
      albumJsonFile.length > 0,
      "It doesn't look like you are declaring `private _albumUrl` keyword and assigning the contents of the `album.json` file to it."
    );

    const getAlbumMethod = tsquery(ast, 'Identifier[name="getAlbum"]');

    assert(
      getAlbumMethod.length > 0,
      "The ProductService doesn't have a method named `getAlbum()` yet."
    );

    const returnStatement = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getAlbum] ) ReturnStatement"
    );

    assert(
      returnStatement.length > 0,
      "The `getAlbum()` doesn't have a `return` statement yet."
    );

    const thisStatement = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getAlbum] ) CallExpression ThisKeyword"
    );

    assert(
      thisStatement.length > 0,
      "It doesn't look like you're returning the result of calling `this._http.get()` and passing `this._albumUrl` as a parameter."
    );

    const httpGet = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getAlbum] ) CallExpression PropertyAccessExpression Identifier[name=_http]"
    );

    assert(
      httpGet.length > 0,
      "It doesn't look like you're returning the result of calling `this._http.get()`."
    );

    const getMethod = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getAlbum] )  PropertyAccessExpression:has(Identifier[name=get]) "
    );

    assert(
      getMethod.length > 0,
      "It looks like the `getAlbum` method is not sending a `GET` request."
    );

    assert(
      thisStatement.length > 1,
      "It doesn't look like you're returning the result of calling `this._http.get()` and passing `this._albumUrl` as a parameter."
    );

    const albumUrlArg = tsquery(
      ast,
      "MethodDeclaration:has( Identifier[name=getAlbum] ) CallExpression PropertyAccessExpression Identifier[name=_albumUrl]"
    );

    assert(
      albumUrlArg.length > 0,
      "It doesn't look like you're passing `this._albumUrl` as an argument to the `this._http.get()` method call."
    );
  });

  it(`should have a private class property named _albumUrl set to the correct value @product-service-has-albumurl-property`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /private\s+\_albumUrl\s*(:\s*string\s*)?\=\s*[\'|\"](\.\.\/assets\/album.json)[\'|\"]\s*\;?/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductService doesn't have an `_albumUrl` property with the correct definition or value.")
  });

  it(`should have a method named getAlbum() that takes one parameter @product-service-has-getalbum-method`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.");
    }
    let re = /getAlbum\s*\(\s*id\s*:\s*number\s*\)(\s*\:\s*Observable\<Album\>\s*)?\s*\{[\s\w\.\:\(\)\;=><]+\}/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductService hasn't defined a `getAlbum` method yet with the correct arguments.")
  });

  it(`should import the Http and Response classes @product-service-imports-http-and-response`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService doesn't exist yet.")
    }
    let re = /import\s*{([\w,\s]+)}\s*from\s*[\'|\"]@angular\/http[\'|\"]\;?/
    let match = file.match(re);
    assert(Array.isArray(match), "It doesn't look like anything has been imported from the `@angular/http` module yet.");

    let arr = match[1].split(',');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    }
    assert(Array.isArray(arr) && arr.includes('Http'), "`Http` is not one of the classes that's been imported from `@angular/http`.")
    assert(Array.isArray(arr) && arr.includes('Response'), "`Response` is not one of the classes that's been imported from `@angular/http`.")
  });

  it(`should inject a private property named http in the constructor @product-service-injects-http`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /constructor\(([\w\s\_\:]+)\)/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductService constructor has no arguments.")
    
    let arg = match[1].trim();

    let re_arg = /\s*private\s+\_http\s*\:\s*Http\s*/
    let arg_match = arg.match(re_arg);
    assert(Array.isArray(arg_match), "The ProductService constructor doesn't define a private `_http` variable.")
  });
});