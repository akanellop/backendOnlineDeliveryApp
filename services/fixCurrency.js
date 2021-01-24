// Fixer API aCCESS kEY db8ebcaa67356ae12330869c19394acc
//fixer api base url  http://data.fixer.io/api/

//ex. http://data.fixer.io/api/latest?access_key=db8ebcaa67356ae12330869c19394acc

//http://data.fixer.io/api/latest?access_key=db8ebcaa67356ae12330869c19394acc& base = EUR & symbols = USD,AUD,CAD,PLN,MXN


const http = require('http');

exports.convertFromEUR = (NEW_CUR,PRICE) => {

    return new Promise ((resolve, reject) => {
        const path = '/api/latest?access_key=db8ebcaa67356ae12330869c19394acc&base=EUR&symbols='+NEW_CUR; 
        var options = {
            host:'data.fixer.io',
            path: path
        };

        http.get(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                const body = JSON.parse(chunk);
                const rate = body.rates[NEW_CUR];
                resolve(rate*PRICE)
            });
        })
        .end();
      })
}
