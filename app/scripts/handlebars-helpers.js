/*globals Handlebars, moment */

(function() {
  Handlebars.registerHelper('nl_to_br', function(str) {
    if (str) {
      str = Handlebars.Utils.escapeExpression(str);
      return new Handlebars.SafeString(str.replace(/\r?\n|\r/g, '<br>'));
    } else {
      return str;
    }
  });

  Handlebars.registerHelper('formatdatetime', function(datetime, format) {
    if (datetime) {
      return moment(datetime).format(format);
    }
    return datetime;
  });

  Handlebars.registerHelper('fromnow', function(datetime) {
    if (datetime) {
      return moment(datetime).fromNow();
    }
    return '';
  });
}());