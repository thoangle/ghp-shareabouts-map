/*globals Handlebars, moment, _ */

var Shareabouts = Shareabouts || {};

(function(NS) {
  'use strict';

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

  Handlebars.registerHelper('user_token', function(typeName) {
    return NS.auth.getUserToken();
  });

  Handlebars.registerHelper('has_user_submitted', function(collection, options) {
    var userToken = NS.auth.getUserToken(),
        userSubmission = _.find(collection, function(model) { return model.user_token === userToken; });

    return (!!userSubmission ? options.fn(this) : options.inverse(this));
  });

}(Shareabouts));