# express-seed-minimal
This is a simple express 4.0 backend project:
* continuous integration,
* sendmail with template, 
* multilingue, 
* mongodb for storage,
* ready for test



[![Build Status](https://travis-ci.org/evaletolab/express-seed-minimal.svg?branch=master)](https://travis-ci.org/evaletolab/express-seed-minimal)

## Getting started
This is a backend part of your futur application.

    $ git clone https://github.com/evaletolab/express-seed-minimal.git
    $ cd express-seed-minimal
    $ npm install
    $ optional edit config-devel|test.js
    $ mongod
    
Testing

    $ sudo npm -g install mocha
    $ NODE_ENV=test mocha

Running    

    $ node app

### Continuous integration - Forever & gihub
Each time you do a push your application will restart and update all npm dependencies, Cool!

Install
    $ sudo npm install -g forever

Run
    $ forever start --minUptime 2000 --spinSleepTime 2000 --watchIgnore "*newrelic*" --uid yourapp -faw  app    
    $ forever list
    info:    Forever processes running
    data:        uid     command         script forever pid   id logfile                            uptime       
    data:    [1] cms     /usr/bin/nodejs app    30454   30460    /home/container/.forever/cms.log     0:0:0:5.429 

Configure gihub webhooks 'On push event'
    1) https://your.api.domain.com/v1/github/webhook    
    2) in your configuration authorize reference (config.admin.webhook.release == branch name)
    3) setup a secret (config.admin.webhook.secret)

## API
Current API version is v1. You need to prepend `v1/` to app requests except auth.



## Copyright 
* Copyright (c) 2015 Karibou (http://karibou.ch/)
* Copyright (c) 2012 Olivier Evalet (http://evaletolab.ch/)


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

**The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.**


THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

* more reading http://www.gnu.org/licenses/gpl-violation.fr.html http://www.gnu.org/licenses/why-affero-gpl.fr.html
