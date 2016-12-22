/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["public/app/constants/constants.js","63f17e0cfa2376ca7d79f2a4e10fd8d7"],["public/app/controller/main.js","d163ff3d72cb2daa7719dfcc61afe6da"],["public/app/core/app.core.js","473cfef500c825f82949c1e5196c85e2"],["public/app/core/app.js","0a2973f37ed08b0ec9efd8e158b2872a"],["public/app/core/app.thirdparty.js","9e6fe9c4cc536a2664f36e6449caa16f"],["public/app/core/config.js","4309be94b1653a4f15e8839f95c420c9"],["public/app/directives/directives.js","74bbbb1d698cf4e01b026747ab4bcf70"],["public/app/directives/menu.js","ba19d941074ae62f23ce5fa2eda2749a"],["public/app/directives/phonepad.js","e70fe3a68744f412c09545f6a1ded424"],["public/app/directives/title.js","4691605c649924028f5f696a37b0d9e1"],["public/app/directives/waypoint.js","a679960e674355fd2b066101b892c163"],["public/app/factory/factory.js","6ceb441a5b03093cf19e7eb8aff6cb1b"],["public/app/libs/angular-animate.min.js","1373e4df6fd8e511aea75baa9aae9635"],["public/app/libs/angular-animate.min.js.map","f9d658d9009f603cdeeebbbe6fe99e57"],["public/app/libs/angular-local-storage.js","19097a8e1d3459b3b5fc8f2c29e3f850"],["public/app/libs/angular-route.min.js","5a6752efc060e35e3c3e134c5fadebc3"],["public/app/libs/angular-ui-router.min.js","eec3199c704ed5b5a971be7475c88494"],["public/app/libs/loading-bar.js","a915378b98cb7267468165464c2ca5a7"],["public/app/libs/ng-file-upload-shim.min.js","f435288aba70d01e490ddc8c5dc5cf17"],["public/app/libs/ng-file-upload.min.js","f34401fcad7bb9bf3906233456d591cf"],["public/app/libs/src/library.min.js","2bfd49ccf0677d7250e5b40e2135acd7"],["public/app/libs/toaster.min.js","10b5d70f8ba630fb2c61854cb606ad67"],["public/app/libs/ui-bootstrap-tpls-0.6.0.js","ff0ce68ec03ffca842ee144554f110a0"],["public/app/libs/ui-bootstrap.min.js","ff0ce68ec03ffca842ee144554f110a0"],["public/app/modules/dashboard/dashboard.html","7a177d1a031cc53a5476f59af5a1d30a"],["public/app/modules/dashboard/dashboard.init.js","ae2738ac49ad112557653ea59f945583"],["public/app/modules/dashboard/dashboardController.js","142dae31956a345ebe01009c38991014"],["public/app/modules/dashboard/dashboardService.js","a7c9283a8f872831a3e20dcc79e46824"],["public/app/modules/employee/emp.init.js","e323b8a15aa0550725fccf96f55319a7"],["public/app/modules/employee/empinitService.js","d67cb2d6627e9da5bca7ec942b9aa063"],["public/app/modules/employee/welcome.html","9c501843ffb5c7fa12e8396aa956bfa0"],["public/app/modules/employee/welcomeController.js","f4f9f994922d02245b9f557cb57bb870"],["public/app/modules/login/login.html","f2998eef403fb9bee97de2d133ceaaed"],["public/app/modules/login/login.init.js","83edcfb4b8e975fb9d7b6780c1e0f757"],["public/app/modules/login/loginController.js","9ebd55dd8964ac513009267b485c36bc"],["public/app/modules/login/loginService.js","bc9d49f83d4184070643d033d41d1dbc"],["public/app/routes/common.routes.js","bb7d1909037518735f4e5feb3f7ad81f"],["public/app/translations/locale-en.json","add5a16ebdd25a704a1d347c2b9b8f56"],["public/app/translations/locale-sp.json","4be169fa329f55d6f9bb8e1779f6482c"],["public/assets/css/animation.css","48cfc45ab70900430a95c09c033a3cb6"],["public/assets/css/authenty.css","d0c329e61dd8ead9a5e0e6c89496f79d"],["public/assets/css/bootstrap.css","2183d05f5a0a9a3b2e8cb0509ca363e3"],["public/assets/css/checkbox/orange.css","45039c01b62828b84b312d336453a616"],["public/assets/css/checkbox/orange.png","e7333f83e2802e2f7d1820e6f571b8cb"],["public/assets/css/checkbox/orange@2x.png","4a997518c98c5562c92bb199f8b059ca"],["public/assets/css/custom.css","12f16c94114ab82bceb53764504b257a"],["public/assets/css/menu.css","9134fccba15259a217dacf917ced24eb"],["public/assets/css/preview.css","f6fbb6a18266a7fee049c300e38df331"],["public/assets/js/authenty.js","3bfc808c6ee73a3c365968661050d0cc"],["public/assets/js/bootstrap.min.js","8c237312864d2e4c4f03544cd4f9b195"],["public/assets/js/jquery.icheck.min.js","b31463e701bddd0f07280bf85e3e0d37"],["public/assets/js/preview/init.js","c1956ac7f45ee1555d02e2d6c5734dce"],["public/assets/js/preview/jquery.address-1.6.min.js","6aeefd1949a3eb2d6c77ccd11aa024a8"],["public/assets/js/preview/jquery.malihu.PageScroll2id.js","78ba6d97e934c01db969773a38fb8d72"],["public/assets/js/preview/scrollTo.min.js","b034a5e6f8a105cfd463d31d81128184"],["public/assets/js/waypoints.min.js","dfe0eedf8da578f4a4c43b05448c51d9"],["public/assets/less/authenty.less","45472e4ef234612f6fe994cc6305fcd9"],["public/assets/less/bootstrap/alerts.less","d6b62e1b2aeb1a17888f53e9af6ae4e9"],["public/assets/less/bootstrap/badges.less","0227516600bc31aed05953285836cd81"],["public/assets/less/bootstrap/bootstrap.less","795f03e9246302d89820ab9f944d249a"],["public/assets/less/bootstrap/breadcrumbs.less","7dce9541e6a59de6301403a7d25036fa"],["public/assets/less/bootstrap/button-groups.less","f8cd9f808673b2f335d31b17082f6fda"],["public/assets/less/bootstrap/buttons.less","f07962750d22b319543cd1a2aba994a6"],["public/assets/less/bootstrap/carousel.less","9267465184dd8c95bdbf56d6c7aabedf"],["public/assets/less/bootstrap/close.less","d1106a9df41e0ef26a376551b5bbfd15"],["public/assets/less/bootstrap/code.less","3c1f555d2382fdced70cfe1662631f71"],["public/assets/less/bootstrap/component-animations.less","f7605695861c6f68a422d5fa9a936845"],["public/assets/less/bootstrap/dropdowns.less","3efbe3f33f960d2db3b20baae206093c"],["public/assets/less/bootstrap/forms.less","addeb078aeae838192b3fd100ae75f14"],["public/assets/less/bootstrap/glyphicons.less","6e96c0d23189ee16ffc6d1dda78e3ce8"],["public/assets/less/bootstrap/grid.less","c27679fdc7a793f3ef833ad1136a957f"],["public/assets/less/bootstrap/input-groups.less","d8539e0b587c344d4ca75e1539698f8a"],["public/assets/less/bootstrap/jumbotron.less","aebf1fa069a68b88a049e66edb7ccb27"],["public/assets/less/bootstrap/labels.less","18e545cfb7385e21c753ba236824210a"],["public/assets/less/bootstrap/list-group.less","83ca85f279c544c4057daca7f97ba8fb"],["public/assets/less/bootstrap/media.less","bfbb8fa5c70a4115c41b406dd7160f06"],["public/assets/less/bootstrap/mixins.less","394c9a1adcfd0dbd151dd5a466097985"],["public/assets/less/bootstrap/mixins/alerts.less","78aa25760d223bf51d8d4edf59c2d384"],["public/assets/less/bootstrap/mixins/background-variant.less","34c5b4585baca57889dc1d390f563ae5"],["public/assets/less/bootstrap/mixins/border-radius.less","30d64faff1cc98361fb1ec89b4e29418"],["public/assets/less/bootstrap/mixins/buttons.less","cdce53083c010e33f6056372111bd40a"],["public/assets/less/bootstrap/mixins/center-block.less","e2328a0e18978ca3f20412c36b014865"],["public/assets/less/bootstrap/mixins/clearfix.less","8e9c9440f515f1586205aa595ae713ba"],["public/assets/less/bootstrap/mixins/forms.less","92448ff5635fdcbe1322dd36929be43f"],["public/assets/less/bootstrap/mixins/gradients.less","7f6754b3b31e2ad1272360e5a7d72124"],["public/assets/less/bootstrap/mixins/grid-framework.less","a7b575d472ca0bc957036bdfe54bb437"],["public/assets/less/bootstrap/mixins/grid.less","20c6cbe3e09aad4d6f7d382059a90ba3"],["public/assets/less/bootstrap/mixins/hide-text.less","e588fdb4311e69e3a5fcee7ebe9c6c99"],["public/assets/less/bootstrap/mixins/image.less","0af48a82a48f4a2e0ae68afdc5295e5f"],["public/assets/less/bootstrap/mixins/labels.less","d3c6a97bacf167db12bb187f1ebc4a15"],["public/assets/less/bootstrap/mixins/list-group.less","66e3e724e2fc3c9089ac1cd006084e0c"],["public/assets/less/bootstrap/mixins/nav-divider.less","846f793e8d601915b31d2d7699bc35ab"],["public/assets/less/bootstrap/mixins/nav-vertical-align.less","a9e830f1c39bd7e89679fe6ea200763c"],["public/assets/less/bootstrap/mixins/opacity.less","1be3f12daf02e4f36a4b7896b377c773"],["public/assets/less/bootstrap/mixins/pagination.less","d1670390120629299270f67d56466b5b"],["public/assets/less/bootstrap/mixins/panels.less","2d317d8386b126f6bd80a946e6c0ebf4"],["public/assets/less/bootstrap/mixins/progress-bar.less","7039dc30596272eaf95604ce46532263"],["public/assets/less/bootstrap/mixins/reset-filter.less","ff42fe79f10deeaea892af691711fa33"],["public/assets/less/bootstrap/mixins/resize.less","b6ef275960e5f97b064c1aff7d6b3951"],["public/assets/less/bootstrap/mixins/responsive-visibility.less","74fcac885ba966f828a373f405b755b4"],["public/assets/less/bootstrap/mixins/size.less","cb591f72667a90bbc04e539332278019"],["public/assets/less/bootstrap/mixins/tab-focus.less","888e1e5f8e41a88aaa1afa58214b072e"],["public/assets/less/bootstrap/mixins/table-row.less","3b3855aeeb76f7dd6868d68303d18a2e"],["public/assets/less/bootstrap/mixins/text-emphasis.less","a94099d8756dec84aeb54e7f022ab6e2"],["public/assets/less/bootstrap/mixins/text-overflow.less","97f3e435fd0a2d7734213f94483a685e"],["public/assets/less/bootstrap/mixins/vendor-prefixes.less","56a8bac1b9ddd3de170512d7e9269c1b"],["public/assets/less/bootstrap/modals.less","0523408a961e40e76f3808cad4658fe8"],["public/assets/less/bootstrap/navbar.less","829c59127f7339c17e803cae87017261"],["public/assets/less/bootstrap/navs.less","8a6cb19b0b4bd8e16c6b2aa5b834c184"],["public/assets/less/bootstrap/normalize.less","5dd1cd423d73e1c62d4b8d733774a979"],["public/assets/less/bootstrap/pager.less","e4ba7eaa37b76f58f65cef48cbdcea52"],["public/assets/less/bootstrap/pagination.less","4087b47633fab26fbfe4e8067d3381a8"],["public/assets/less/bootstrap/panels.less","b8f81db5b9ac79653064696b0d18267f"],["public/assets/less/bootstrap/popovers.less","4d2dbf45189b6224e61ded012373ae12"],["public/assets/less/bootstrap/print.less","65e635aafa1f04d3eaa3201ebdf45432"],["public/assets/less/bootstrap/progress-bars.less","620d57934cdd4e984919a7d0e2bd7173"],["public/assets/less/bootstrap/responsive-embed.less","2c7057d9a90998866bf84c1112caf631"],["public/assets/less/bootstrap/responsive-utilities.less","8a64c69dcfc081a7858285f1ab2992f5"],["public/assets/less/bootstrap/scaffolding.less","89b390aaf81e78554df748f8a5585f60"],["public/assets/less/bootstrap/tables.less","6480c1133eeb09ad0154eb33edff35d8"],["public/assets/less/bootstrap/theme.less","80f55b129fa5c0f5712ca68dabb632e2"],["public/assets/less/bootstrap/thumbnails.less","2f0e86101267acacdd1466ea36044f3e"],["public/assets/less/bootstrap/tooltip.less","395dc36adf84368291ae47f29fdc54d4"],["public/assets/less/bootstrap/type.less","2965c8e86a8840df16b03bf35245a153"],["public/assets/less/bootstrap/utilities.less","f8baac5bf438a29cc1b58328974049a9"],["public/assets/less/bootstrap/variables.less","f001e8f16cd37f9adf36aecc81e91fcb"],["public/assets/less/bootstrap/wells.less","496407c34cd52fab0c1ca1d17f0353a1"],["public/assets/less/preview.less","8fde45509d0fd0f371681c11a02e7c97"],["public/assets/less/variables.less","fa3e289230e544d6914875d274b89046"],["public/assets/sass/_bootstrap.scss","28cc2543b2aa1fef8af2d2156a32cf04"],["public/assets/sass/authenty.scss","917879ee9cb0e3665ff595ee6f9ecab3"],["public/assets/sass/bootstrap/_alerts.scss","c0e5396555dd4c70b9eeb314e4c4613d"],["public/assets/sass/bootstrap/_badges.scss","b2befa54538f0087f260df2731ba4f76"],["public/assets/sass/bootstrap/_breadcrumbs.scss","24c93808be39b840a66e95bf3fe89ed2"],["public/assets/sass/bootstrap/_button-groups.scss","860d1d65cae86912475be72009270e70"],["public/assets/sass/bootstrap/_buttons.scss","014d5cf36516af452a224d984c2d60e5"],["public/assets/sass/bootstrap/_carousel.scss","b0b0700316fefc460795343e16e7f14f"],["public/assets/sass/bootstrap/_close.scss","247ef4c02f54f5bf898da8e4f6c88bd0"],["public/assets/sass/bootstrap/_code.scss","280e44d4762299678f52c56c6df4ffc2"],["public/assets/sass/bootstrap/_component-animations.scss","8c17107ac86a36d4b05a20c47d08dee9"],["public/assets/sass/bootstrap/_dropdowns.scss","0b6e92707914c7d7d03b73c53b52f758"],["public/assets/sass/bootstrap/_forms.scss","9d5bfcaa33eb577086b273e1e76b5920"],["public/assets/sass/bootstrap/_glyphicons.scss","2196a2fd82182e082b569d6c97a45c67"],["public/assets/sass/bootstrap/_grid.scss","ba7b4a2579c7f061a982830877a1c60d"],["public/assets/sass/bootstrap/_input-groups.scss","ee33bc31f1bb75497f6ae3848c03886a"],["public/assets/sass/bootstrap/_jumbotron.scss","aa5c36d3fb7f14574038697e153389d6"],["public/assets/sass/bootstrap/_labels.scss","d103671ba8c96f743916990bdf40d3b4"],["public/assets/sass/bootstrap/_list-group.scss","eeaf88b083614cafb2d772d899308d05"],["public/assets/sass/bootstrap/_media.scss","bfbb8fa5c70a4115c41b406dd7160f06"],["public/assets/sass/bootstrap/_mixins.scss","1486667c9ae4d2c01024b547f8040c28"],["public/assets/sass/bootstrap/_modals.scss","7a24ee151c07b51ba75fcf1c33b1118e"],["public/assets/sass/bootstrap/_navbar.scss","58acd058e729f304d7f69eed3448186c"],["public/assets/sass/bootstrap/_navs.scss","89b073405d01e045f89dba5cb3e49946"],["public/assets/sass/bootstrap/_normalize.scss","5dd1cd423d73e1c62d4b8d733774a979"],["public/assets/sass/bootstrap/_pager.scss","fb95dee91745bec12cdd44c4542530f5"],["public/assets/sass/bootstrap/_pagination.scss","b313c27cbf1aa411f724a021455850a1"],["public/assets/sass/bootstrap/_panels.scss","908bfa9f56baa993cf25f707f3c9232c"],["public/assets/sass/bootstrap/_popovers.scss","17a5606c3b16aa2bd7bcceb4cef9f2a5"],["public/assets/sass/bootstrap/_print.scss","65e635aafa1f04d3eaa3201ebdf45432"],["public/assets/sass/bootstrap/_progress-bars.scss","53de2fdfeb4c0fd4d6b4f323a507bc23"],["public/assets/sass/bootstrap/_responsive-embed.scss","2c7057d9a90998866bf84c1112caf631"],["public/assets/sass/bootstrap/_responsive-utilities.scss","22145e012318c4c5ef2f859fcb0c5cab"],["public/assets/sass/bootstrap/_scaffolding.scss","78903f10082b835816995a2dc5d43e8e"],["public/assets/sass/bootstrap/_tables.scss","c91111e9d3f5d22ede57db4758f10b57"],["public/assets/sass/bootstrap/_theme.scss","99831f3f2c6742145da4a53d559dca93"],["public/assets/sass/bootstrap/_thumbnails.scss","dd5e0a8f79dc6a539c38e05f14121c88"],["public/assets/sass/bootstrap/_tooltip.scss","dac5080d0e1d78538ae34044dd72d71d"],["public/assets/sass/bootstrap/_type.scss","1a80f6a3899de7cfb3d554cfdce18753"],["public/assets/sass/bootstrap/_utilities.scss","7e020f996c50afd24453a871098cbda1"],["public/assets/sass/bootstrap/_variables.scss","a51526b48bef057dc972ffd880d92406"],["public/assets/sass/bootstrap/_wells.scss","3577874a42c6fe920129f07eabca106a"],["public/assets/sass/bootstrap/mixins/_alerts.scss","058b36cec876e55731f05b7cf0e43a3e"],["public/assets/sass/bootstrap/mixins/_background-variant.scss","275c4e307297ba9778d6ba2d89f5a3a7"],["public/assets/sass/bootstrap/mixins/_border-radius.scss","88e9a7b563aa11357d7bfc114708b139"],["public/assets/sass/bootstrap/mixins/_buttons.scss","9ccfd30a513b2b57853c54449d8fd3ce"],["public/assets/sass/bootstrap/mixins/_center-block.scss","f284d54e569eba55aba017e4807b0820"],["public/assets/sass/bootstrap/mixins/_clearfix.scss","6fc90025fc80e49fd10100ee8c689c1d"],["public/assets/sass/bootstrap/mixins/_forms.scss","8e74e8e7145cb98df17a275f800ea089"],["public/assets/sass/bootstrap/mixins/_gradients.scss","c256e096c556db2471dd3c6c1516074c"],["public/assets/sass/bootstrap/mixins/_grid-framework.scss","a2e328ab58b2f33d0f5e7808c6766b86"],["public/assets/sass/bootstrap/mixins/_grid.scss","dc90b61491326abf47fe92d7bf3846e2"],["public/assets/sass/bootstrap/mixins/_hide-text.scss","be6084f5baaf75657586da3dac505824"],["public/assets/sass/bootstrap/mixins/_image.scss","1c7ab3b18895dad2de80f0dd11d13577"],["public/assets/sass/bootstrap/mixins/_labels.scss","80f2187ccdda40c712cd2dbfb8d7a405"],["public/assets/sass/bootstrap/mixins/_list-group.scss","ba904f1e34996e18e5a7a13f2e985e20"],["public/assets/sass/bootstrap/mixins/_nav-divider.scss","d9d1e810eff80b30acc3a03bf346820f"]];
var cacheName = 'sw-precache-v2-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||d.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||d.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||d.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||d.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);l=l?l.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),d.preCacheItems=d.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var l,d=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: cache first ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e).then(function(t){return t?t:o.fetchAndCache(e,n)})})}var o=e("../helpers");t.exports=r},{"../helpers":1}],8:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: cache only ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e)})}var o=e("../helpers");t.exports=r},{"../helpers":1}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var o,s,a=[];if(c){var u=new Promise(function(n){o=setTimeout(function(){t.match(e).then(function(e){e&&n(e)})},1e3*c)});a.push(u)}var f=i.fetchAndCache(e,n).then(function(e){if(o&&clearTimeout(o),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),s=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(s)return s;throw r})});return a.push(f),Promise.race(a)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e){for(var t,n=[],r=0,o=0,i="";null!=(t=x.exec(e));){var c=t[0],s=t[1],a=t.index;if(i+=e.slice(o,a),o=a+c.length,s)i+=s[1];else{var f=e[o],h=t[2],p=t[3],l=t[4],d=t[5],g=t[6],m=t[7];i&&(n.push(i),i="");var v=null!=h&&null!=f&&f!==h,w="+"===g||"*"===g,y="?"===g||"*"===g,b=t[2]||"/",E=l||d||(m?".*":"[^"+b+"]+?");n.push({name:p||r++,prefix:h||"",delimiter:b,optional:y,repeat:w,partial:v,asterisk:!!m,pattern:u(E)})}}return o<e.length&&(i+=e.substr(o)),i&&n.push(i),n}function o(e){return s(r(e))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(m(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){for(var o=r(e),i=g(o,n),c=0;c<o.length;c++)"string"!=typeof o[c]&&t.push(o[c]);return f(i,t)}function g(e,t){t=t||{};for(var n=t.strict,r=t.end!==!1,o="",i=e[e.length-1],c="string"==typeof i&&/\/$/.test(i),s=0;s<e.length;s++){var u=e[s];if("string"==typeof u)o+=a(u);else{var f=a(u.prefix),p="(?:"+u.pattern+")";u.repeat&&(p+="(?:"+f+p+")*"),p=u.optional?u.partial?f+"("+p+")?":"(?:"+f+"("+p+"))?":f+"("+p+")",o+=p}}return n||(o=(c?o.slice(0,-2):o)+"(?:\\/(?=$))?"),o+=r?"$":n&&c?"":"(?=\\/|$)",new RegExp("^"+o,h(t))}function m(e,t,n){return t=t||[],v(t)?n||(n={}):(n=t,t=[]),e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=m,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=g;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("http://localhost:30013/", toolbox.cacheFirst, {"cache":{"maxEntries":1,"name":"runtime-cache"}});




