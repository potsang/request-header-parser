var express = require('express');
var parser = require('accept-language-parser');
var app = express();

app.set('port', (process.env.PORT || 8080));

function getResult(ip, language, software) {
    var result = {
        "ipaddress": ip,
        "language": language,
        "software": software
    }   
    
    return result;
}

function getOS(userAgent) {
    var result = userAgent.split(/[\(\)]/)[1];
    return result.trim(); 
}

app.get('/api/whoami', function (req, res) {
    var ip = req.headers['x-forwarded-for'];
    var languages = parser.parse(req.headers["accept-language"]);
    var language = "";
    if (languages.length > 0) {
        language = languages[0].code + "-" + languages[0].region; 
    }
    
    var os = getOS(req.headers['user-agent']);
    res.send(getResult(ip, language, os));
});

app.listen(app.get('port'), function () {
  console.log('Request Header Parser Microservice is listening on port ' + app.get('port'));
});