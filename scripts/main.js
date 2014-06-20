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
/*globals Shareabouts, jQuery, Handlebars */

(function($) {
  'use strict';

    var sa = new Shareabouts.Map({
      el: '#shareabouts-container',
      // TODO: Set the initial location of your map
      map: {
        center: [39.959877, -75.201244],
        zoom: 16
      },
      // TODO: Update your map tiles. Kindly use your own since OpenPlans
      // has to pay for these. =)
      layers: [
        {
          url: 'http://{s}.tiles.mapbox.com/v3/openplans.map-dmar86ym/{z}/{x}/{y}.png',
          attribution: '&copy; OpenStreetMap contributors, CC-BY-SA. <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }
      ],
      // TODO: Setup the conditions for how to display your markers. See
      // below configuration details.
      // https://github.com/openplans/argo/wiki/Configuration-Guide#style-rules
      placeStyles: [
        {
          condition: 'true',
          icon: {
            iconUrl: 'images/dot-blue.png',
            iconSize: [18, 18],
            iconAnchor: [9, 9]
          },
          focusIcon: {
            iconUrl: 'images/marker-blue.png',
            shadowUrl: 'images/marker-shadow.png',
            iconSize: [25, 41],
            shadowSize: [41, 41],
            iconAnchor: [12, 41]
          }
        },
      ],

      // TODO: Update this url to your dataset. THIS IS VERY IMPORTANT.
      // Now you're done!
      datasetUrl: 'http://data.shareabouts.org/api/v2/ecocamp/datasets/midnight-blue/places',

      // These are template functions that expect geojson.
      templates: {
        'add-button': Handlebars.compile($('#add-button').html()),
        'place-detail': Handlebars.compile($('#place-detail').html()),
        'place-support': Handlebars.compile($('#place-support').html()),
        'place-survey': Handlebars.compile($('#place-survey').html()),
        'place-survey-item': Handlebars.compile($('#place-survey-item').html()),
        'place-form': Handlebars.compile($('#place-form').html())
      }
    });

    var authTemplate = Handlebars.compile($('#auth-actions').html());

    Shareabouts.auth = new Shareabouts.Auth({
      apiRoot: 'http://data.shareabouts.org/api/v2/',
      successPage: 'success.html',
      errorPage: 'error.html'
    });

    $(Shareabouts.auth).on('authsuccess', function(evt, data) {
      $('.top-bar-section').html(authTemplate(data));
      sa.setUser(data);
    });

    Shareabouts.auth.initUser();

}(jQuery));
