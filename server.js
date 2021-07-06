const server = require('./app');

server.listen(8080, ()=>{
    console.log('Server is running at port :*'+ 8080);
})