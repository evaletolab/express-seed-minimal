
var path = require('path');
var PATH = function(p) {
  return path.resolve(__dirname, p);
};

module.exports = {

  admin:{
    handle:'secret',
    emails:['evaleto@gmail.com'],
    secret: 'gyRX8wm9zidagZRPeziibWJM1bJJSpzS2nOT6I289t8=',
    webhook: {release:'devel',secret:'abc'},
    padding:'0a0b0c0d'
  },


  cors:{
    allowedDomains:['http://lo.cal:3000','http://192.168.1.39:3000'],
    credentials:true,
    age:3600
  },

  express: {
    port: 4000,
    views: '/views',
    'view engine': 'jade',
    csrf:false,
    mongoSession:true
  },



  // TODO load by env
  mongo:{
    name:'mongodb://localhost/express-seed-devel',
    ensureIndex:true
  },



	// TODO auto load middleware?
  middleware: {
    responseTime: true,

    favicon: PATH('static/favicon.ico'),

    logger: 'dev',

    bodyParser: {},

    methodOverride: '_method',

    cookieParser: 'ogXMXgRbnInguKYYx9Pm',


    session: {
      /*
       *  key         cookie name defaulting to connect.sid
       *  secret      session cookie is signed with this secret
       *              to prevent tampering
       *  cookie      session cookie settings, defaulting to
       *              { path: '/', httpOnly: true, maxAge: null, domain:'your.io' }
       *  proxy       trust the reverse proxy when setting secure cookies
       *              (via "x-forwarded-proto")
      */

  		secret:'cp3a2v0elt955h8uqhgmskplhg85ljjm',
      key: 'sid',
      cookie: {
//        domain:'.evaletolab.ch',
        path: '/',
        httpOnly: false,
        maxAge: 1000 * 60 * 30 * 24 * 60 // = 60 days (in miliseconds)
      }
    },

    csrf: {}
	}
};
