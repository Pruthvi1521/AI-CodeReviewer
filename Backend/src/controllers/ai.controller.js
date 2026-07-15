const aiService=require("../services/ai.service")


module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("code required");
    }

    const review = await aiService(code);

    res.json({
        review
    });
}