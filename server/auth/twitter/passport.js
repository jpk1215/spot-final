exports.setup = function (User, config) {
  var passport = require('passport');
  var SpotifyStrategy = require('passport-spotify').Strategy;

  passport.use(new SpotifyStrategy({
    clientID: config.spotify.clientID,
    clientSecret: config.spotify.clientSecret,
    callbackURL: config.spotify.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({
      'spotify.id': profile.id
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        user = new User({
          name: profile.displayName,
          username: profile.username,
          role: 'user',
          provider: 'spotify',
          spotify: profile._json
        });
        user.save(function(err) {
          if (err) return done(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
    }
  ));
};

// passport.use(new SpotifyStrategy({
//     clientID: client_id,
//     clientSecret: client_secret,
//     callbackURL: "http://localhost:8888/auth/spotify/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));




// exports.setup = function (User, config) {
//   var passport = require('passport');
//   var TwitterStrategy = require('passport-twitter').Strategy;

//   passport.use(new TwitterStrategy({
//     consumerKey: config.twitter.clientID,
//     consumerSecret: config.twitter.clientSecret,
//     callbackURL: config.twitter.callbackURL
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOne({
//       'twitter.id_str': profile.id
//     }, function(err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         user = new User({
//           name: profile.displayName,
//           username: profile.username,
//           role: 'user',
//           provider: 'twitter',
//           twitter: profile._json
//         });
//         user.save(function(err) {
//           if (err) return done(err);
//           return done(err, user);
//         });
//       } else {
//         return done(err, user);
//       }
//     });
//     }
//   ));
// };