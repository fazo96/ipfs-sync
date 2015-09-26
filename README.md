# IPFS-Sync

Directory synchronization daemon built on top of IPFS and IPNS.
You run the daemon and specify who can update the content,
when one of them updates its ipns value, you do too!

### Installing

__Warning:__ the program doesn't have conflict resolution yet and it doesn't
automatically cache the data it's supposed to serve (ouch!) but it does work
to mirror ipns publications and the mentioned missing features are planned.

make sure you have `node` and `npm` installed and an [ipfs daemon](http://github.com/ipfs/go-ipfs) running, then just run `npm install -g ipfs-sync` to install the ipfs-sync daemon and start it by running `ipfs-sync` in your command line.

### Hack

Clone the repo, then `cd` into it and run `npm install`.
When it's done you can run the executable `./ipfs-sync.js` and try it out :)

### License

The MIT License (MIT)

Copyright (c) 2015 Enrico Fasoli (fazo96)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
