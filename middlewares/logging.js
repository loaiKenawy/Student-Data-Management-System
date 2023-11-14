module.exports=(req,res,nxt) =>{
    console.log("--Message from custom middleware");
    console.log(`--body = ${req.body}`);
    nxt();
}