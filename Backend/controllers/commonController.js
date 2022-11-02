const invalidUrl = (req, res) => {
    console.log(req.session);
    return res.send({message : "Invalid URL"});
}
export default invalidUrl;