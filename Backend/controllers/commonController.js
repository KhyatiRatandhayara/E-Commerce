const invalidUrl = (req, res) => {
    return res.send({message : "Invalid URL"});
}
export default invalidUrl;