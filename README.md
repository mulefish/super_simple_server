# set it up
npm install

# run it
node server.js  
OR 
node server.js 4747

# experience it
localhost:3030 
OR
http://localhost:3030/pdf

# What is this: CROSS-SITE
CROSS-SITE experiment
step1: node server.js ( localhost:3030 ) /and pretend it is some remote server.   
step2: node other_server.js ( localhost:2222/ ) and use its page to hit/call for resources from 'server.js' 

# What is this: API examine
step1: node server.js ( localhost:3030 ) and look and see how it handles various requeests. 

# Notebook?!
Python's notebook rules. I liked this project but found the bounces between IDE and browser to break conversations and be a bore. The next version of this will take lessons from python notebook to make a interactive logic-in-browser-without-needing-a-IDE ( for simple things ). Core tools will be 'eval' and 'localstorage' and simple javascript. 