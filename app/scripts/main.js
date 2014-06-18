/*globals Shareabouts, jQuery, Handlebars */

(function($) {
  'use strict';

    var sa = new Shareabouts.Map({
      el: '#shareabouts-container',
      map: {
        center: [39.952780, -75.163136],
        zoom: 12
      },
      layers: [
        {
          url: 'http://{s}.tiles.mapbox.com/v3/openplans.map-dmar86ym/{z}/{x}/{y}.png',
          attribution: '&copy; OpenStreetMap contributors, CC-BY-SA. <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }
      ],
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

      datasetUrl: 'http://data.shareabouts.org/api/v2/demo-user/datasets/demo-data/places',

      // These are template functions that expect geojson.
      templates: {
        'add-button': Handlebars.compile($('#add-button').html()),
        'place-detail': Handlebars.compile($('#place-detail').html()),
        'place-support': function(data) {
          var userToken = Shareabouts.auth.getUserToken(),
              isUserLoaded = !!userToken,
              userSupport = _.find(data.items, function(support) { return support['user_token'] === userToken; }),
              isSupporting = !!userSupport;

          return '<form action="#" method="post" class="btn btn-block btn-small user-support">' +
            '<input type="hidden" name="user_token" value="' + Shareabouts.auth.getUserToken() + '">' +
            '<input type="hidden" name="visible" value="true">' +
            '<input type="checkbox" id="support"' +
              (isSupporting ? ' checked="checked"' : '') +
              (isUserLoaded ? '' : ' disabled="disabled"') +
              '>' +
            '<label for="support"><span class="support-count">' + data.items.length + '</span> Support</label>' +
          '</form>';
        },
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