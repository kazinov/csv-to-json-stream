#csv-to-json-stream

Simple csv to json mapper

##Usage

```javascript
var transform = require('csv-to-json-stream')
  , fs = require('fs');

fs.createReadStream('input.csv')
  .pipe(transform({
    delimiter: '\t',
    map: {
      'name': 1,
      'price': 2,
      'url': 4
    },
    skipHeader: true
  }))
  .pipe(process.stdout);
```

##Options

 - `delimeter`
 - `skipHeader` Boolean, ignore first line
 - `map` Object, mapping in the format: <output_field_name>:<csv column index, zero-based>


## Example

Input CSV:

```csv
id  name  price field3 url
1 honda 1000  stub  honda.com
2 suzuki 2000  stub  suzuki.com 
```

Options:

```
{
    delimiter: '\t',
    map: {
      'name': 1,
      'price': 2,
      'url': 4
    },
    skipHeader: true
  }
```

Output JSON:

```javascript
{ name: 'honda', price: '1000', url: 'honda.com' }
{ name: 'suzuki', price: '2000', url: 'suzuki.com'}
```

## License

MIT
