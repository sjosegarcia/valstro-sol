# valstro-sol
Solution to the coding challenge


This coding challenge was solved by using node.js.

I recommend installing it locally and then running

`node index.js`

Dependencies:

`npm i socket.io-client`

One thought that I had over the weekend while I was at work, would my code break if this was a multi threaded application? 
I was thinking that there would be a race conditions with the `let` variables at the top because they were mutated in
the stream.

Would sorrounding the code in a async-closure, and awaiting it would solve this hypothetical issue?