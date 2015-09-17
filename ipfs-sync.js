#!/usr/bin/env node

var app = require('commander')

app
  .version(require('./package.json').version)
  .description('sync your IPNS with other nodes')
  .usage('[options] <node ...>')
  .option('-h, --host', 'ipfs http API hostname')
  .option('-p, --port', 'ipfs http API port',parseInt)
  .option('-i, --interval', 'how often to check, in seconds',parseInt)
  .parse(process.argv)

if(app.args.length === 0) app.help()

var ipfs = require('ipfs-api')(app.host || 'localhost', app.port?app.port+'':'5001')
var interval = (app.interval || 3) * 1000
var myID, currentHash, nodes = {}

ipfs.id(function(err,res){
  console.log('My ID is',res.ID)
  myID = res.ID
  refresh()
})

function refresh(){
  ipfs.name.resolve(myID,function(err,res){
    // Calculate current state
    currentHash = cleanAddress(res.Path)
    console.log('Current Hash is',currentHash)

    // Check all other nodes
    var done = 0
    app.args.forEach(function(arg){
      var n = cleanAddress(arg) 
      ipfs.name.resolve(n,function(err,resp){
        if(err){
          console.log('Error while resolving','"'+n+'".','Code',err.Code,'Message:',err.Message)
        } else {
          var newHash = resp.Path
          if(!nodes[n]){
            nodes[n] = { hash: newHash }
          } else {
            if(newHash != node[n].hash){
              nodes[n].hash = newHash
              // Remote update
              if(newHash != currentHash) ipfs.name.publish(newHash,function(err,res){
                console.log('Updated to',newHash,'from node:',n)
              })
            }
          }
        }
        done++
        if(done >= app.args.length) setTimeout(refresh, interval)
      })
    })
  })
}

function cleanAddress(addr){
  var s = addr.trim().split('/')
  return s[s.length-1]
}
