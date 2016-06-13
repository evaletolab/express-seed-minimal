
/*
 * API introspection
 */
var _ = require('underscore'),
    bus=require('../app/bus'),
    db = require('mongoose'),
    http = require('http'),
    debug = require('debug')('api'),
    validate= require('./api.validate'),
    errorHelper = require('mongoose-error-helper').errorHelper,
    origins=[];

//
// authorized origins
config.cors.allowedDomains.forEach(function(origin){
  origins.push(origin.btoa())
})

//
// expose routes API
exports.index = function(app){
  return function(req, res) {
    var model={ 
      api: app.routes, 
      user: req.user, 
      filter:function(api){
        return _.filter(api, function(route){return route.path.indexOf("/v1")>-1;});
      } 
    };
    res.render('home',  model);
  }
};


//
// read persistent config
exports.config = function(req, res) {
  res.json(config.shared);
};


//
// save persistent config
exports.saveConfig = function(req, res) {
  try{
    validate.config(req.body);
  }catch(err){
    return res.status(400).send(err.message);
  }

  db.model('Config').saveMain(req.body,function(err,conf) {
    res.json(config.shared);
  })
};



//
// mail UI client exception
exports.trace = function(req, res) {
    if(origins.indexOf(req.params.key)==-1){
      return res.status(401).send("invalid token")
    }
    bus.emit('trace.error',req.params.key,req.body);

    if(req.body.stacktrace&&req.body.stacktrace.frames.length){
      var len=req.body.stacktrace.frames.length
      console.log("ERROR[UI]",
        req.body.message,
        req.body.request.headers, 
        req.body.request.url, 
        req.body.site, 
        req.body.stacktrace.frames[len-1].pre_context)
    }
    res.json({});
};


//
// simple robots generator
exports.robots=function(req,res){
  res.type('text/plain');
  var rb='User-agent: *\n';
  // rb+="Disallow: /\n";
  rb+="Allow: /sitemap.xml\n";
  rb+="Allow: /seo\n";
  rb+="Allow: /v1/config\n";
  rb+="Allow: /v1/cdn\n";
  res.status(200).send(rb);
}


//
// simple continuous integration with github and 'forever' 
// spawn node-continuous.sh script to run git push && npm install
exports.github=function(req,res){
  var spawn = require('child_process').spawn;

  //
  // github sig
  function verify(key, body) {
    var str=JSON.stringify(body);
    return 'sha1=' + require('crypto').createHmac('sha1', key).update(str).digest('hex')
  }


  //
  // checks webhook config 
  if(!config.admin.webhook||!config.admin.webhook.secret){
    return res.status(400).send('CI error (1)')
  }

  //
  // checks push release
  if(req.body.ref.indexOf(config.admin.webhook.release)===-1){
    return res.status(400).send('CI error (2)')    
  }

  //
  // checks github posting params
  var  sig   = req.headers['x-hub-signature']
      ,event = req.headers['x-github-event']
      ,id    = req.headers['x-github-delivery']  
      ,verify= verify(config.admin.webhook.secret,req.body)


  if(!sig||!event||!id){
    return res.status(400).send('CI error (3)')
  }

  if(sig!==verify){
    console.log('gihub sig verification error',sig,verify)
    return res.status(400).send('CI verification error')
  }

  if (req.body.ref.indexOf(config.admin.webhook.release)===-1) {
    return res.sendStatus(200)
  }

  console.log('============')
  console.log('= github CI',config.admin.webhook.release,config.express.port)
  console.log('============')
  var child=spawn('node-continuous.sh',[config.admin.webhook.release,config.express.port],{detached:true})
  child.stdout.on('data', function (stdout) {
    console.log("github",event,stdout.toString('utf8'))    
  })

  child.stderr.on('data', function (error) {
    console.log("end of CI",error.toString('utf8'))
  });

  // CI done
  return res.sendStatus(200)
}
