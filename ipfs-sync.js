#!/usr/bin/env node

var app = require('commander')

app
  .version(require('./package.json').version)
  .description("mirror another node's ipns publication")
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
  console.log('Starting ipfs-sync. Local node is',res.ID)
  myID = res.ID
  refresh()
})

var done = 0

function next(){
  done++
  if(done >= app.args.length) setTimeout(refresh, interval)
}

function refresh(){
  done = 0
  ipfs.name.resolve(myID,function(err,res){
    // Calculate current state
    currentHash = cleanAddress(res?res.Path:undefined)
    // Check all other nodes
    app.args.forEach(function(arg){
      var n = cleanAddress(arg) 
      ipfs.name.resolve(n,function(err,resp){
        if(err){
          console.log('Error while resolving','"'+n+'":',err.Message)
          if(err.Message == "expired record"){
            console.log('The record published by',n,'is expired. Try publishing something on',n)
          } else if(/^multihash length inconsistent/.test(err.Message)){
            process.exit(-1)
          }
          next()
        } else {
          var newHash = cleanAddress(resp.Path)
          if(!nodes[n]) nodes[n] = { hash: newHash }
          if(newHash != nodes[n].hash){
            nodes[n].hash = newHash
            // Remote update
            if(newHash != currentHash){
              ipfs.name.publish('/ipfs/'+newHash,function(err,res){
                console.log('Updated from',currentHash,'to',newHash,'from node:',n)
                next()
              })
            } else {
              console.log(n,'is updated to the current version')
              next()
            }
          } else next()
        }
      })
    })
  })
}

function cleanAddress(addr){
  var s = addr.trim().split('/')
  return s[s.length-1]
}
