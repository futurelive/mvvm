/**
 * Created by Miro on 19/7/31.
 */

let lang = require('./lang');

let extend = lang.extend;

extend(exports, lang);
extend(exports, require('./dom'));
extend(exports, require('./debug'));