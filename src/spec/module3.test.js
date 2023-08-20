const assert = require('chai').assert;
const expect = require('chai').expect;
const fs = require('fs');

describe('Module 3 - Album Interface', () => {
  it(`should exist @album-interface-exists`, () => {
    assert(fs.existsSync(__dirname + '/../app/album.ts'), "The Album interface hasn't been created yet.");

    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/album.ts').toString();
    } catch (e) {
      assert(false, "The Album interface hasn't been created yet.")
    }
    
    let re = /export\s+interface\s+Album/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "There's an `album.ts` file, but it doesn't export an interface named `Album`.");
  });

  it(`should have name property of type string @album-interface-has-four-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/album.ts').toString();
    } catch (e) {
      assert(false, "The Album interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Album\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's an `album.ts` file, but it doesn't export an interface named `Album`.");
    
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
    
    let nameKeyFound = false
      , nameValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'name') {
        nameKeyFound = true;
        if (properties[i].value.match(new RegExp(/string/))) {
          nameValueFound = true;
        }
      }
    }
    assert(nameKeyFound, "The Album Interface doesn't define a property named `name`.");
    assert(nameValueFound, "The Album Interface's `name` property isn't typed as `string`.");
  });

  it(`should have releaseDate property of type string @album-interface-has-four-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/album.ts').toString();
    } catch (e) {
      assert(false, "The Album interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Album\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's an `album.ts` file, but it doesn't export an interface named `Album`.");

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
    
    let releaseDateKeyFound = false
      , releaseDateValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'releaseDate') {
        releaseDateKeyFound = true;
        if (properties[i].value.match(new RegExp(/string/))) {
          releaseDateValueFound = true;
        }
      }
    }
    assert(releaseDateKeyFound, "The Album Interface doesn't define a property named `releaseDate`.");
    assert(releaseDateValueFound, "The Album Interface's `releaseDate` property isn't typed as `string`.");
  });

  it(`should have coverImage property of type string @album-interface-has-four-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/album.ts').toString();
    } catch (e) {
      assert(false, "The Album interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Album\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's an `album.ts` file, but it doesn't export an interface named `Album`.");

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
    
    let coverImageKeyFound = false
      , coverImageValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'coverImage') {
        coverImageKeyFound = true;
        if (properties[i].value.match(new RegExp(/string/))) {
          coverImageValueFound = true;
        }
      }
    }
    assert(coverImageKeyFound, "The Album Interface doesn't define a property named `coverImage`.");
    assert(coverImageValueFound, "The Album Interface's `coverImage` property isn't typed as `string`.");
  });

  it(`should have tracks property of type Track[] @album-interface-has-four-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/album.ts').toString();
    } catch (e) {
      assert(false, "The Album interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Album\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's an `album.ts` file, but it doesn't export an interface named `Album`.");

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
    
    let tracksKeyFound = false
      , tracksValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'tracks') {
        tracksKeyFound = true;
        if (properties[i].value.match(new RegExp(/Track\[\]/))) {
          tracksValueFound = true;
        }
      }
    }
    assert(tracksKeyFound, "The Album Interface doesn't define a property named `tracks`.");
    assert(tracksValueFound, "The Album Interface's `tracks` property isn't typed as `Track[]`.");
  });

  it(`should import the Track Interface @track-interface-imported-into-album-interface`, function () {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/album.ts').toString();
    } catch (e) {
      assert(false, "The Album interface doesn't exist yet.");
    }
    let re = /import\s*{([\w,\s]+)}\s*from\s*[\'|\"]\.\/track[\'|\"]\;?/
    let match = file.match(re);
    assert(Array.isArray(match), "The Track interface isn't being imported in the Album interface.");

    let arr = match[1].split(',');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    }

    assert(Array.isArray(arr) && arr.includes('Track'), "The Track interface isn't being imported in the Album interface.");
  });
});

describe('Module 3 - ProductService', () => {
  it(`should import the Album Interface @album-interface-imported-into-product-service`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /import\s*{\s*Album\s*}\s*from\s*[\'|\"]\.\/album[\'|\"]\;?/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The Album Interface hasn't been imported into the ProductService yet.");
  });
});

describe('Module 3 - ProductDescription', () => {
  it(`should import the Album Interface @album-interface-imported-into-product-description`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-description/product-description.component.ts').toString();
    } catch (e) {
      assert(false, "ProductDescriptionComponent doesn't exist yet.")
    }
    let re = /import\s*{\s*Album\s*}\s*from\s*[\'|\"]\.\.\/album[\'|\"]\;?/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The Album Interface hasn't been imported into the ProductDescriptionComponent yet.");
  });

  it(`should have an albumInfo property typed to Album @product-description-albuminfo-property-typed-to-album`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product-description/product-description.component.ts').toString();
    } catch (e) {
      assert(false, "ProductDescriptionComponent doesn't exist yet.")
    }
    let re = /albumInfo\s*\:\s*(\w+)/
    let match = file.match(re);
    assert(Array.isArray(file.match(re)), "The `albumInfo` property doesn't have any type information declared yet.");

    let albumInfoType = match[1].trim();
    assert(albumInfoType.includes('Album'), "The `albumInfo` type isn't declared as `Album`.");
  });
});

describe('Module 3 - ProductService getAlbum Method', () => {
  it(`should import Observable from rxjs  @product-service-getalbum-method-returns-typed-observable`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /import\s*\{\s*Observable\s*\}\s*from\s*(\"|\')rxjs\/Observable(\"|\')\s*\;?/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "The Observable type hasn't been imported from rxjs yet.");
  });

  it(`should return an Observable typed to Album @product-service-getalbum-method-returns-typed-observable`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /getAlbum\s*\(\s*id\s*:\s*number\s*\)\s*([\w\s\<\>\:]+)\{/
    let match = file.match(re);
    assert(Array.isArray(match), "The ProductService hasn't defined a `getAlbum` method yet with the correct arguments.")
    
    let the_type = match[1].trim();

    let re2 = /\s*\:\s*Observable\<Album\>/
    let match2 = the_type.match(re2);

    assert(Array.isArray(match2), "The `getAlbum` method doesn't have the correct return type.")
    assert(match2[0].includes('Observable<Album>'), "The `getAlbum` method doesn't have the correct return type.")
  });

  it(`should type response.json() to Album @product-service-types-getalbum-responsejson-to-album`, () => {
    let file;
    try {
      file = fs.readFileSync(__dirname + '/../app/product.service.ts').toString();
    } catch (e) {
      assert(false, "The ProductService hasn't been created yet.")
    }
    let re = /return\s+this\.\_http\s*\.\s*get\(\s*this\.\_albumUrl\s*\)\s*\.\s*map\(([\w\s\(\)\=\>\.\<]+)\)/
    let match = file.match(re);
    assert(Array.isArray(file.match(re)), "The `getAlbum` method isn't returning the correct response.");
    
    let responseJsonPart = match[1];
    assert(responseJsonPart.includes('<Album>'), "You're not asserting that the type of `response.json()` is `Album`.");
  });
});

describe('Module 3 - Track Interface', () => {
  it(`should exist @track-interface-exists`, () => {
    assert(fs.existsSync(__dirname + '/../app/track.ts'), "The Track interface hasn't been created yet.");

    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/track.ts').toString();
    } catch (e) {
      assert(false, "The Track interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Track/
    assert(Array.isArray(file.match(re)) && file.match(re) != null, "There's a `track.ts` file, but it doesn't export an interface named `Track`.");
  });

  it(`should have trackNumber property of type number @track-interface-has-four-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/track.ts').toString();
    } catch (e) {
      assert(false, "The Track interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Track\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's a `track.ts` file, but it doesn't export an interface named `Track`.");
    
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
    
    let trackNumberKeyFound = false
      , trackNumberValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'trackNumber') {
        trackNumberKeyFound = true;
        if (properties[i].value.match(new RegExp(/number/))) {
          trackNumberValueFound = true;
        }
      }
    }
    assert(trackNumberKeyFound, "The Track Interface doesn't define a property named `trackNumber`.");
    assert(trackNumberValueFound, "The Track Interface's `trackNumber` property isn't typed as `number`.");
  });

  it(`should have trackName property of type string @track-interface-has-four-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/track.ts').toString();
    } catch (e) {
      assert(false, "The Track interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Track\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's a `track.ts` file, but it doesn't export an interface named `Track`.");
    
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
    
    let trackNameKeyFound = false
      , trackNameValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'trackName') {
        trackNameKeyFound = true;
        if (properties[i].value.match(new RegExp(/string/))) {
          trackNameValueFound = true;
        }
      }
    }
    assert(trackNameKeyFound, "The Track Interface doesn't define a property named `trackName`.");
    assert(trackNameValueFound, "The Track Interface's `trackName` property isn't typed as `string`.");
  });

  it(`should have trackLength property of type string @track-interface-has-four-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/track.ts').toString();
    } catch (e) {
      assert(false, "The Track interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Track\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's a `track.ts` file, but it doesn't export an interface named `Track`.");
    
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
    
    let trackLengthKeyFound = false
      , trackLengthValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'trackLength') {
        trackLengthKeyFound = true;
        if (properties[i].value.match(new RegExp(/string/))) {
          trackLengthValueFound = true;
        }
      }
    }
    assert(trackLengthKeyFound, "The Track Interface doesn't define a property named `trackLength`.");
    assert(trackLengthValueFound, "The Track Interface's `trackLength` property isn't typed as `string`.");
  });

  it(`should have trackPrice property of type number @track-interface-has-four-properties`, () => {
    let file
    try {
      file = fs.readFileSync(__dirname + '/../app/track.ts').toString();
    } catch (e) {
      assert(false, "The Track interface doesn't exist yet.")
    }
    let re = /export\s+interface\s+Track\s*\{\s*([\w\s\:\;\[\]]+)\s*\}/
    let match = file.match(re);
    assert(Array.isArray(match) && match != null, "There's a `track.ts` file, but it doesn't export an interface named `Track`.");
    
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
    
    let trackPriceKeyFound = false
      , trackPriceValueFound = false
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].key == 'trackPrice') {
        trackPriceKeyFound = true;
        if (properties[i].value.match(new RegExp(/number/))) {
          trackPriceValueFound = true;
        }
      }
    }
    assert(trackPriceKeyFound, "The Track Interface doesn't define a property named `trackPrice`.");
    assert(trackPriceValueFound, "The Track Interface's `trackPrice` property isn't typed as `number`.");
  });
});