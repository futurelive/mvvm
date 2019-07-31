/**
 * Created by Miro on 19/7/31.
 */

exports._updateBindingAt = function() {
    // arguments[1] 访问的属性值
    let path = arguments[1];
    this._directives.forEach((directive) => {
        if (directive.expression !== path) return;
        directive.update();
    });
};