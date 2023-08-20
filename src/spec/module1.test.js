const _ = require("lodash");
const assert = require("chai").assert;
const cheerio = require("cheerio");
const cssom = require("cssom");
const fs = require("fs");
const helpers = require("./helpers");
const parse5 = require("parse5");

describe("Module 1 - ProductPageComponent", () => {
  it("should contain the app-product-description element @app-product-description-selector", () => {
    const productPageFile = helpers.readFile(
      "src/app/product-page/product-page.component.html"
    );

    // parse html to test for description div inside ProductPage Component
    const productPageNodes = helpers.parseFile(productPageFile);
    const productPageMain = helpers.getHtmlTag("main", productPageNodes);
    const productPageContent = parse5.serialize(productPageMain[0]);
    let $ = cheerio.load(productPageContent);
    let descriptionDiv = $(".description");
    let rowDiv = $(".row");

    helpers.readFile(
      "src/app/product-page/product-page.component.ts",
      "The ProductPageComponent doesn't exist for some reason."
    );

    helpers.readFile(
      "src/app/product-page/product-page.component.html",
      "The ProductPageComponent HTML file doesn't exist for some reason."
    );

    assert(
      descriptionDiv.length === 0,
      "It looks like the ProductPageComponent still contains a `div` tag with a class of `description` - have you tried moving it yet?"
    );

    assert(
      rowDiv.length > 2,
      "The ProductPageComponent should have three `<div></div>` elements with a class of `row`."
    );

    assert(
      $(".row")
        .first()
        .children("app-product-description").length > 0,
      'You haven\'t added the `app-product-description` selector below the first `<div class="row"></div>` element in the ProductPageComponent.'
    );
  });
});

describe("Module 1 - Product Page Component HTML", () => {
  it("should contain the app-product-page element @app-product-page-selector", () => {
    const file = helpers.readFile("src/app/app.component.html");
    const nodes = helpers.parseFile(file);
    const h1 = helpers.getHtmlTag("h1", nodes);
    const appProductComponent = helpers.getHtmlTag("app-product-page", nodes);

    assert(
      h1.length === 0,
      "Let's make sure to replace the `<h1></h1>` element for the `<app-product-page></app-product-page>` component."
    );

    assert(
      appProductComponent.length > 0,
      "We couldn't find the ProductPageComponent - are you sure you added the right selector to the AppComponent?"
    );
  });
});

describe("Module 1 - AppComponent", () => {
  it("should create the product description component @product-description-component-created", () => {
    helpers.readFile(
      "src/app/product-description/product-description.component.ts",
      "The ProductDescriptionComponent doesn't exist - have you run the `ng` command to generate it yet?"
    );
  });
});

describe("Module 1 - ProductDescriptionComponent", () => {
  it("should have correct CSS styles inside @product-description-component-css1", () => {
    const productDescriptionFile = helpers.readFile(
      "src/app/product-description/product-description.component.css"
    );

    const styles = cssom.parse(productDescriptionFile);

    if (styles.cssRules.length == 0) {
      assert(
        false,
        "The ProductDescriptionComponent file does not contain any CSS rules or there is a CSS syntax error."
      );
    }

    let pRule = _.find(styles.cssRules, { selectorText: "p" });

    assert(
      pRule,
      "There isn't a paragraph selector in the ProductDescriptionComponent's CSS file right now."
    );

    assert(
      pRule.style["font-size"] === "16px",
      "Your paragraph selector doesn't have a `font-size` property that's equal to `16px`."
    );

    let fontRule;
    if (pRule.style["font"] != undefined) {
      fontRule = pRule.style["font"];
    } else if (pRule.style["font-family"] != undefined) {
      fontRule = pRule.style["font-family"];
    } else {
      assert(
        false,
        "Your paragraph selector doesn't have a properly declared `font-family` property."
      );
    }

    if (fontRule != undefined) {
      let split = fontRule.split(",");
      for (let i = 0; i < split.length; i++) {
        split[i] = split[i].trim();
      }
      assert(
        split[0] === "Helvetica",
        "Your paragraph selector doesn't have a `font-family` property that's equal to `Helvetica, Arial, sans-serif`."
      );

      assert(
        split[1] === "Arial",
        "Your paragraph selector doesn't have a `font-family` property that's equal to `Helvetica, Arial, sans-serif`."
      );

      assert(
        split[2] === "sans-serif",
        "Your paragraph selector doesn't have a `font-family` property that's equal to `Helvetica, Arial, sans-serif`."
      );

      assert(
        pRule.style["font-weight"] === "normal",
        "Your paragraph selector doesn't have a `font-weight` property that's equal to `normal`."
      );
    }
  });

  it("should have CSS that contains an img selector @product-description-component-css2", () => {
    const productDescriptionFile = helpers.readFile(
      "src/app/product-description/product-description.component.css"
    );

    const styles = cssom.parse(productDescriptionFile);

    if (styles.cssRules.length == 0) {
      assert(
        false,
        "The ProductDescriptionComponent file does not contain any CSS rules or there is a CSS syntax error."
      );
    }

    let imgRule = _.find(styles.cssRules, { selectorText: "img" });

    assert(
      imgRule,
      "There isn't an image tag selector with its correct value in the ProductDescriptionComponent's CSS file right now."
    );

    assert(
      imgRule.style["width"] === "100%",
      "Your image tag selector doesn't have a `width` property that's equal to `100%`."
    );
  });
});

describe("Module 1 - ProductDescription", () => {
  it("should have moved the description div out of the product-page component @product-description-html-moved", () => {
    const productPageFile = helpers.readFile(
      "src/app/product-page/product-page.component.html"
    );
    const productDescriptionFile = helpers.readFile(
      "src/app/product-description/product-description.component.html"
    );

    // parse html to test for description div inside ProductPage Component
    const productPageNodes = helpers.parseFile(productPageFile);
    const productPageMain = helpers.getHtmlTag("main", productPageNodes);
    const productPageContent = parse5.serialize(productPageMain[0]);
    let $ = cheerio.load(productPageContent);
    let descriptionDiv = $(".description");

    // parse html to test for description div inside ProductDescription Component
    let description;
    const productDescriptionNodes = helpers.parseFile(productDescriptionFile);
    productDescriptionNodes[0].attrs.find(
      attr => (description = attr.value.match(/description/))
    );

    let element;
    try {
      element = productDescriptionNodes[0].tagName;
    } catch (e) {
      assert(
        "The ProductDescriptionComponent's HTML file doesn't contain a `div` tag with a class of `description`."
      );
    }

    helpers.readFile(
      "src/app/product-page/product-page.component.ts",
      "The ProductPageComponent doesn't exist for some reason."
    );

    helpers.readFile(
      "src/app/product-page/product-page.component.html",
      "The ProductPageComponent HTML file doesn't exist for some reason."
    );

    helpers.readFile(
      "src/app/product-description/product-description.component.html",
      "The ProductDescriptionComponent doesn't exist - have you run the `ng` command to generate it yet?"
    );

    assert(
      descriptionDiv.length === 0,
      "It looks like the ProductPageComponent still contains a `div` tag with a class of `description` - have you tried moving it yet?"
    );

    assert(
      element !== "p",
      "It looks like you have not replaced the `<p></p>` element with a `div` tag with a class of `description`."
    );

    assert(
      element === "div",
      "The ProductDescriptionComponent's HTML file doesn't contain a `div` tag."
    );

    assert(
      !!description,
      "It looks like the ProductPageComponent still contains a `div` tag with a class of `description` - have you tried moving it yet?"
    );
  });
});
