const express = require("express");
const app = express();


const { BASE_URL } = process.env;
console.log(BASE_URL)

app.set("port", process.env.PORT || 3000);

// at runtime

app.set('views', __dirname + "/build");
app.engine('html', require('ejs').renderFile);

app.use('/static',express.static(__dirname + "/build/static"))
app.use('/assets',express.static(__dirname + "/build/assets"))
app.use('/be',express.static(__dirname + "/be"))
app.use((req, res) => {
    res.render('index.html',{ BASE_URL});
});

app.listen(app.get('port'), () => {
    console.log(`server started on port ${app.get('port')}`);
});