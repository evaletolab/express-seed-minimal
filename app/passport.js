var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
// , TwitterStrategy = require('passport-twitter').Strategy
// , PersonaStrategy = require('passport-persona').Strategy
// , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
//  , GitHubStrategy = require('passport-github').Strategy
//  , FacebookStrategy = require('passport-facebook').Strategy
//  , LinkedinStrategy = require('passport-linkedin').Strategy
  , Users = {}


module.exports = function (app, config, passport) {





  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user._id)
  })


  // deserialize user on logout
  passport.deserializeUser(function(id, done) {
    // Users.findById(id).exec(function (err, user) {
    //   if(!user){
    //     return done(null,false);        
    //   }

    //   user.context={};

    //   done(err, user);
    // });
  });

  //  
  //
  // implement strategy


  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      // Users.authenticate(email, password, function(err, user) {
      //   if (err) { return done(err) }
      //   return done(null, user)
      // })
    }
  ))

  // if(config.auth.twit){
  //   // use twitter strategy
  //   passport.use(new TwitterStrategy({
  //       consumerKey: config.auth.twit.consumerKey,
  //       consumerSecret: config.auth.twit.consumerSecret,
  //       callbackURL: config.auth.twit.cb
  //     },
  //     function(token, secret, profile, done) {        
  //         Users.findOrCreate({ id: profile.id, provider:profile.provider }, function (err, user) {
  //             user.token=token;
  //             return done(err, user);
  //         });
  //     }
  //   ));

  //   // define route
  //   app.get('/auth/twitter', passport.authenticate('twitter'));
  //   app.get('/auth/twitter/callback', 
  //     passport.authenticate('twitter', { successRedirect: '/welcome', failureRedirect: '/login' })
  //   );

  // }


  // if(config.auth.persona){
  //   // use google strategy
  //   passport.use(new PersonaStrategy({
  //       audience: config.auth.persona.audience
  //     },
  //     function(email, done) {
  //       Users.findOrCreate({provider:'persona', "email.address": email }, function (err, user) {
  //         return done(err, user);
  //       });
  //     }
  //   ));    

  //   // define route
  //   app.post('/auth/browserid', 
  //     passport.authenticate('persona', { failureRedirect:'/login' }),
  //     function(req,res){
  //       return res.json(req.user)
  //     }
  //   );

  // }
/***

  // use github strategy
  passport.use(new GitHubStrategy({
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'github.id': profile.id }, function (err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'github',
            github: profile._json
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        } else {
          return done(err, user)
        }
      })
    }
  ))

  // use facebook strategy
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        }
        else {
          return done(err, user)
        }
      })
    }
  ))  



  // use linkedin strategy
  passport.use(new LinkedinStrategy({
    consumerKey: config.linkedin.clientID,
    consumerSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL,
    profileFields: ['id', 'first-name', 'last-name', 'email-address']
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'linkedin.id': profile.id }, function (err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName
          , email: profile.emails[0].value
          , username: profile.emails[0].value
          , provider: 'linkedin'
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        } else {
          return done(err, user)
        }
      })
    }
    ));
**/
// end of passport
// 

}