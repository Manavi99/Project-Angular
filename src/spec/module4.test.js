const _ = require("lodash");
const assert = require("chai").assert;
const cheerio = require("cheerio");
const cssom = require("cssom");
const expect = require('chai').expect;
const fs = require('fs');
const helpers = require("./helpers");
const parse5 = require("parse5");

describe("Module 4 - Project", () => {
  it("should create the product tracklisting component @product-tracklisting-component-created", () => {
    helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.ts",
      "The ProductTracklistingComponent doesn't exist - have you run the `ng` command to generate it yet?"
    );
  });
});

describe("Module 4 - ProductPage", () => {
  it("should have moved the tracklisting div out of the product-page component @product-tracklisting-html-moved", () => {
    const productPageFile = helpers.readFile(
      "src/app/product-page/product-page.component.html"
    );

    // parse html to test for description div inside ProductPage Component
    const productPageNodes = helpers.parseFile(productPageFile);
    const productPageMain = helpers.getHtmlTag("main", productPageNodes);
    const productPageContent = parse5.serialize(productPageMain[0]);
    let $ = cheerio.load(productPageContent);
    let tracklistingDiv = $(".tracklisting");

    helpers.readFile(
      "src/app/product-page/product-page.component.ts",
      "The ProductPageComponent doesn't exist for some reason."
    );

    helpers.readFile(
      "src/app/product-page/product-page.component.html",
      "The ProductPageComponent HTML file doesn't exist for some reason."
    );

    helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.html",
      "The ProductTracklistingComponent doesn't exist - have you run the `ng` command to generate it yet?"
    );

    assert(
      tracklistingDiv.length === 0,
      "It looks like the ProductPageComponent still contains a `div` tag with a class of `tracklisting` - have you tried moving it yet?"
    );

    assert(
      $(".row").length > 1,
      "The ProductPageComponent should have two `<div></div>` elements with a class of `row`."
    );

    assert(
      $(".row")
        .first()
        .next()
        .children(".col-sm-8").length > 0,
      "The ProductPageComponent second `<div></div>` with a class of `row` should have a `<div></div>` with a class of `col-sm-8`."
    );

    assert(
      $(".row")
        .first()
        .next()
        .children(".col-sm-8")
        .children("app-product-tracklisting").length > 0,
      'You haven\'t added the `app-product-tracklisting` selector below the second `<div class="col-sm-8"></div>` element in the ProductPageComponent.'
    );
  });
});

describe('Module 4 - ProductTracklisting', () => {
  it(`should import the Album Interface @album-interface-imported-into-product-tracklisting`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-tracklisting/product-tracklisting.component.ts').toString();
    } catch (e) {
      assert(false, "ProductTracklistingComponent doesn't exist yet.")
    }
    let re = /import\s*{\s*Album\s*}\s*from\s*[\'|\"]\.\.\/album[\'|\"]\;?/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The Album Interface hasn't been imported into the ProductTracklistingComponent yet.");
  });

  it(`should import the ProductService @product-service-imported-into-product-tracklisting`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/product-tracklisting/product-tracklisting.component.ts').toString();
    } catch (e) {
      assert(false, "The ProductTracklistingComponent hasn't been created yet.")
    }
    let re = /import\s*{\s*ProductService\s*}\s*from\s*[\'|\"]\.\.\/product\.service[\'|\"]\;?/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The ProductService hasn't been imported into the ProductTracklisting yet.");
  });

  it(`should have a class property named albumInfo of type Album @product-tracklisting-has-albuminfo-property`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-tracklisting/product-tracklisting.component.ts').toString();
    } catch (e) {
      assert(false, "ProductTracklistingComponent doesn't exist yet.")
    }
    let re = /albumInfo/
    let match1 = file.match(re);
    assert(Array.isArray(file.match(re)), "The `albumInfo` property doesn't exist yet.");

    let re2 = /albumInfo\s*\:\s*(\w+)/
    let match2 = file.match(re2);
    assert(Array.isArray(file.match(re2)), "The `albumInfo` property doesn't have the correct type declaration.");

    let albumInfoType = match2[1].trim();
    assert(albumInfoType.includes('Album'), "The `albumInfo` type isn't declared as `Album`.");
  });

  it("should contain the app-product-tracklisting element @product-tracklisting-html-moved", () => {
    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.html"
    );

    // parse html to test for tracklisting div inside Producttracklisting Component
    let tracklisting;
    const productTracklistingNodes = helpers.parseFile(productTracklistingFile);
    productTracklistingNodes[0].attrs.find(
      attr => (tracklisting = attr.value.match(/tracklisting/))
    );

    let element;
    try {
      element = productTracklistingNodes[0].tagName;
    } catch (e) {
      assert(
        "The ProductTracklistingComponent's HTML file doesn't contain a `div` tag with a class of `tracklisting`."
      );
    }
    assert(
      element !== "p",
      "It looks like you have not replaced the `<p></p>` element with a `div` tag with a class of `tracklisting`."
    );

    assert(
      element === "div",
      "The ProductTracklistingComponent's HTML file doesn't contain a `div` tag."
    );

    assert(
      !!tracklisting,
      "It looks like the ProductTracklistingComponent does not contain the `tracklisting` `<div></div>` from the ProductPageComponent."
    );
  });

  it("should use ngFor to enumerate through each track in an li tag @product-tracklisting-html-uses-ngfor-to-enumerate-tracks", () => {
    let tracklisting;
    let element;
    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.html"
    );
    const productTracklistingNodes = helpers.parseFile(productTracklistingFile);
    productTracklistingNodes[0].attrs.find(
      attr => (tracklisting = attr.value.match(/tracklisting/))
    );
    const productListing = parse5.serialize(productTracklistingNodes[0]);
    let $ = cheerio.load(productListing);
    const li = $("li");

    helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.html",
      "The ProductTracklistingComponent doesn't exist - have you run the `ng` command to generate it yet?"
    );

    try {
      element = productTracklistingNodes[0].tagName;
    } catch (e) {
      assert(
        "The ProductTracklistingComponent's HTML file doesn't contain a `div` tag with a class of `tracklisting`."
      );
    }

    assert(
      element !== "p",
      "It looks like you have not replaced the `<p></p>` element with a `div` tag with a class of `tracklisting`."
    );

    assert(
      element === "div",
      "The ProductTracklistingComponent's HTML file doesn't contain a `div` tag."
    );

    assert(
      !!tracklisting,
      "It looks like the ProductTracklistingComponent does not contain the `tracklisting` `<div></div>` from the ProductPageComponent."
    );

    assert(
      li.length > 0,
      "It doesn't look like that there is a `<li></li>` element."
    );

    assert(
      li.length < 2,
      "We shouldn't need more than one `<li></li>` element. We should be using the `ngFor` directive to generate the other list items."
    );

    assert(
      !!li.attr()["*ngfor"],
      "It doesn't look like that the ProductTracklistingComponent is using the `ngFor` directive."
    );

    assert(
      li
        .attr()
        ["*ngfor"].match(/\s*let\s*track\s*of\s*albumInfo\?.album.tracks/),
      "The `ngFor` directive doesn't have `let track of albumInfo?.album.tracks` as its value."
    );
  });

  it("should use data from the albumInfo.tracks property in the HTML template @product-tracklisting-html-uses-track-object-data", () => {
    let tracklisting;
    let element;
    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.html"
    );
    const productTracklistingNodes = helpers.parseFile(productTracklistingFile);
    productTracklistingNodes[0].attrs.find(
      attr => (tracklisting = attr.value.match(/tracklisting/))
    );
    const productListing = parse5.serialize(productTracklistingNodes[0]);
    let $ = cheerio.load(productListing);
    const li = $("li");
    const trackNumber = $(".track-number");
    const trackName = $(".track-name");
    const trackTime = $(".track-time");
    const trackPrice = $(".price-and-buy");

    helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.html",
      "The ProductTracklistingComponent doesn't exist - have you run the `ng` command to generate it yet?"
    );

    try {
      element = productTracklistingNodes[0].tagName;
    } catch (e) {
      assert(
        "The ProductTracklistingComponent's HTML file doesn't contain a `div` tag with a class of `tracklisting`."
      );
    }

    assert(
      element !== "p",
      "It looks like you have not replaced the `<p></p>` element with a `div` tag with a class of `tracklisting`."
    );

    assert(
      element === "div",
      "The ProductTracklistingComponent's HTML file doesn't contain a `div` tag."
    );

    assert(
      !!tracklisting,
      "It looks like the ProductTracklistingComponent does not contain the `tracklisting` `<div></div>` from the ProductPageComponent."
    );

    assert(
      li.length > 0,
      "It doesn't look like that there is a `<li></li>` element."
    );

    assert(
      li.length < 2,
      "We shouldn't need more than one `<li></li>` element. We should be using the `ngFor` directive to generate the other list items."
    );

    assert(
      !!li.attr()["*ngfor"],
      "It doesn't look like that the ProductTracklistingComponent is using the `ngFor` directive."
    );

    assert(
      li
        .attr()
        ["*ngfor"].match(/\s*let\s*track\s*of\s*albumInfo\?.album.tracks/),
      "The `ngFor` directive doesn't have `let track of albumInfo?.album.tracks` as its value."
    );

    assert(
      trackNumber.hasClass("track-number"),
      "The ProductTrackinglistComponent should have a `span` with a class of `track-number`."
    );

    assert(
      trackNumber.text().match(/\s*{{\s*track.trackNumber\s*}}\s*/),
      "The ProductTrackinglistComponent should have a `span` with a class of `track-number` with a text of `{{track.trackNumber}}`."
    );

    assert(
      trackName.hasClass("track-name"),
      "The ProductTrackinglistComponent should have a `span` with a class of `track-name`."
    );

    assert(
      trackName.text().match(/\s*{{\s*track.trackName\s*}}\s*/),
      "The ProductTrackinglistComponent should have a `span` with a class of `track-name` with a text of `{{track.trackName}}`."
    );

    assert(
      trackTime.hasClass("track-time"),
      "The ProductTrackinglistComponent should have a `span` with a class of `track-time`."
    );

    assert(
      trackTime.text().match(/\s*{{\s*track.trackLength\s*}}\s*/),
      "The ProductTrackinglistComponent should have a `span` with a class of `track-time` with a text of `{{track.trackLength}}`."
    );

    assert(
      trackPrice.hasClass("price-and-buy"),
      "The ProductTrackinglistComponent should have a `span` with a class of `price-and-buy`."
    );

    assert(
      trackPrice.text().match(/\s*{{\s*track.trackPrice\s*}}\s*/),
      "The ProductTrackinglistComponent should have a `span` with a class of `price-and-buy` with a text of `{{track.trackPrice}}`."
    );
  });

  it(`should inject a private property named productService in the constructor @product-tracklisting-injects-product-service`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-tracklisting/product-tracklisting.component.ts').toString();
    } catch (e) {
      assert(false, "ProductTracklistingComponent doesn't exist yet.")
    }
    let re = /constructor\(([\w\s\_\:]+)\)/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductTracklisting constructor has no arguments.")

    let arg = match[1].trim();

    let re_arg = /\s*private\s+\_productService\s*\:\s*ProductService\s*/
    let arg_match = arg.match(re_arg);
    assert(Array.isArray(arg_match), "The ProductTracklisting constructor doesn't define a private `_productService` variable.");
  });

  it(`should call the ProductService's getAlbum() method from ngOnInit() @product-tracklisting-ngoninit-calls-getalbum`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-tracklisting/product-tracklisting.component.ts').toString();
    } catch (e) {
      assert(false, "ProductTracklistingComponent doesn't exist yet.")
    }
    let re = /ngOnInit\(\s*\)\s*\{\s*([\w\s\(\)\.\_\=\>]+)\;?\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductTracklisting `ngOnInit()` method body doesn't contain anything.")

    let callToGetAlbum = match[1].trim();

    if (callToGetAlbum.includes('subscribe')) {
      let re2 = /this\._productService\s*\.\s*getAlbum\(1\)\s*\.\s*subscribe\(([\w\s\=\.\>]+)\)/
      let match2 = match[1].match(re2)
      assert(Array.isArray(match2), "The ProductTracklisting's `ngOnInit()` method body isn't chaining the correct call to subscribe onto the end of the call to `getAlbum()`.")

      let variable_used_to_capture_response = match2[1].match(/\s*(\w+)\s*\=/);

      let expression = variable_used_to_capture_response[1] + "\\s*\\=\\>\\s*this\\.albumInfo\\s*\\=\\s*" + variable_used_to_capture_response[1]
      let regex = new RegExp(expression, 'g')

      assert(Array.isArray(match2[1].match(regex)), "The call to `getAlbum()` in ProductTracklisting's `ngOnInit()` method body isn't subscribing to the response and assigning it to `this.albumInfo`.")
    } else {
      assert(false, "The ProductTracklisting `ngOnInit()` method body isn't making the correct call to the ProductService's `getAlbum` method.");
    }
  });

  it(`should define a class property named albumInfo @product-tracklisting-ngoninit-calls-getalbum`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-tracklisting/product-tracklisting.component.ts').toString();
    } catch (e) {
      assert(false, "ProductTracklistingComponent doesn't exist yet.")
    }
    let re = /ProductTracklistingComponent\s*implements\s*OnInit\s*\{\s*(\w+)/
    let match = file.match(re);
    assert(match[1] == 'albumInfo', "The ProductTracklisting doesn't have a class property named `albumInfo`.")
  });
});

describe("Module 4 - ProductTracklistingComponent", () => {
  it("should have CSS that contains a .tracklisting selector @product-tracklisting-component-css1", () => {
    helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css",
      "The ProductTracklistingComponent CSS file doesn't exist - have you run the `ng` command to generate it yet?"
    );

    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css"
    );

    const styles = cssom.parse(productTracklistingFile);

    if (styles.cssRules.length == 0) {
      assert(
        false,
        "The ProductTracklistingComponent file does not contain any CSS rules or there is a CSS syntax error."
      );
    }
  });

  it(`should have CSS with a rule setting the font-size to 16px and the padding-top to 10px on the .tracklisting selector @product-tracklisting-component-css1`, () => {
    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css"
    );
    const styles = cssom.parse(productTracklistingFile);

    let tracklistingRule = _.find(styles.cssRules, {
      selectorText: ".tracklisting"
    });

    assert(
      tracklistingRule,
      "There isn't a `.tracklisting` selector with its correct value in the ProductTracklistingComponent's CSS file right now."
    );

    assert(
      tracklistingRule.style["font-size"] === "16px",
      "Your `.tracklisting` tag selector doesn't have a `font-size` property that's equal to `16px`."
    );

    assert(
      tracklistingRule.style["padding-top"] === "10px",
      "Your `.tracklisting` tag selector doesn't have a `padding-top` property that's equal to `10px`."
    );
  });

  it("should have CSS that contains a ul selector @product-tracklisting-component-css2", () => {
    helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css",
      "The ProductTracklistingComponent CSS file doesn't exist - have you run the `ng` command to generate it yet?"
    );

    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css"
    );

    const styles = cssom.parse(productTracklistingFile);

    if (styles.cssRules.length == 0) {
      assert(
        false,
        "The ProductTracklistingComponent file does not contain any CSS rules or there is a CSS syntax error."
      );
    }

    let ulRule = _.find(styles.cssRules, {
      selectorText: "ul"
    });

    assert(
      ulRule,
      "There isn't an `ul` selector with its correct value in the ProductTracklistingComponent's CSS file right now."
    );
  });

  it(`should have CSS with a rule setting the list-style-type to none on the ul selector @product-tracklisting-component-css2`, () => {
    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css"
    );
    const styles = cssom.parse(productTracklistingFile);

    let ulRule = _.find(styles.cssRules, {
      selectorText: "ul"
    });

    assert(
      ulRule,
      "There isn't an `ul` selector with its correct value in the ProductTracklistingComponent's CSS file right now."
    );

    assert(
      ulRule.style["list-style-type"] === "none",
      "Your `ul` tag selector doesn't have a `list-style-type` property that's equal to `none`."
    );
  });

  it("should have CSS that contains an li selector @product-tracklisting-component-css3", () => {
    helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css",
      "The ProductTracklistingComponent CSS file doesn't exist - have you run the `ng` command to generate it yet?"
    );

    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css"
    );

    const styles = cssom.parse(productTracklistingFile);

    if (styles.cssRules.length == 0) {
      assert(
        false,
        "The ProductTracklistingComponent file does not contain any CSS rules or there is a CSS syntax error."
      );
    }

    let liRule = _.find(styles.cssRules, {
      selectorText: "li"
    });

    assert(
      liRule,
      "There isn't a `li` selector with its correct value in the ProductTracklistingComponent's CSS file right now."
    );
  });

  it(`should have CSS with a rule setting the display to block and the line-height to 30px on the li selector @product-tracklisting-component-css3`, () => {
    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css"
    );
    const styles = cssom.parse(productTracklistingFile);

    let liRule = _.find(styles.cssRules, {
      selectorText: "li"
    });

    assert(
      liRule,
      "There isn't a `li` selector with its correct value in the ProductTracklistingComponent's CSS file right now."
    );

    assert(
      liRule.style["display"] === "block",
      "Your `li` tag selector doesn't have a `display` property that's equal to `block`."
    );

    assert(
      liRule.style["line-height"] === "30px",
      "Your `li` tag selector doesn't have a `line-height` property that's equal to `30px`."
    );
  });

  it("should have CSS that contains a button selector @product-tracklisting-component-css4", () => {
    helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css",
      "The ProductTracklistingComponent CSS file doesn't exist - have you run the `ng` command to generate it yet?"
    );

    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css"
    );

    const styles = cssom.parse(productTracklistingFile);

    if (styles.cssRules.length == 0) {
      assert(
        false,
        "The ProductTracklistingComponent file does not contain any CSS rules or there is a CSS syntax error."
      );
    }

    let buttonRule = _.find(styles.cssRules, {
      selectorText: "button"
    });

    assert(
      buttonRule,
      "There isn't a `button` selector with its correct value in the ProductTracklistingComponent's CSS file right now."
    );
  });

  it(`should have CSS with a rule setting the line-height to 1 on the button selector @product-tracklisting-component-css4`, () => {
    const productTracklistingFile = helpers.readFile(
      "src/app/product-tracklisting/product-tracklisting.component.css"
    );
    const styles = cssom.parse(productTracklistingFile);

    let buttonRule = _.find(styles.cssRules, {
      selectorText: "button"
    });

    assert(
      buttonRule,
      "There isn't a `button` selector with its correct value in the ProductTracklistingComponent's CSS file right now."
    );

    assert(
      buttonRule.style["line-height"] === "1",
      "Your `button` tag selector doesn't have a `line-height` property that's equal to `1`."
    );
  });
});