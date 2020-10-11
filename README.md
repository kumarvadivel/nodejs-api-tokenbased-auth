<h1>nodejs-api-tokenbased-auth(JWT)</h1>


<ul>
  <li>This is a simple express api built in nodejs for performing operations like authentication.</li>
  <li>data is stored using <strong>mongoDB</strong> as  database.
  <li>The state of the auth is maintained in json-web-token for seamless fast authorization comparing sessions.</li>
  <li>state is stored in <strong>redis</strong> for faster accessing of authorization state.</li>
  <li>Token refreshing logic is available to ensure more security to api.</li>
  <li>authorisation api's are protected with ratelimiter for preventing <strong>DDoS</strong> attacks</li>
  <li>all api's endpoints are protected with <strong>XSS and CSRF</strong> attacks.</li>
  <li>The api are written with well error handled and formated responses</li>
  <li>app well structured for easy scaling of api</li>
  <li>all secrets are configured in environment variable</li>
</ul>

<h1>prerequisites</h1>

<ul>
  <li>nodejs</li>
  <li>redis</li>
  <li>mongodb</li>
</ul>

<a><h1>steps to use this api</h1></a>

<ol>
  <li>clone this repository to your machine</li>
  <li>open that folder from your command-prompt (or) terminal</li>
  <li>run <strong>npm install</strong> command</li>
  <li>then create a file called <strong>.env</strong> in the root of the folder</li>
    <li>configure the <strong>.env</strong> like the picture shown below</li>
    <a href="https://imgbb.com/"><img src="https://i.ibb.co/yWprtS1/rsz-2screenshot-from-2020-10-11-10-41-18.png" alt="rsz-2screenshot-from-2020-10-11-10-41-18" border="0"></a>
    <li>then run  <strong>npm start </strong> for starting the app</li>
</ol>
