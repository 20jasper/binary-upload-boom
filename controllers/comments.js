const Comment = require("../models/Comment");
//add post model
const Post = require("../models/Post");

module.exports = {
	createComment: async (req, res) => {
		try {
			//create a new comment
			const comment = await Comment.create({
				title: req.body.title,
				body: req.body.body,
			});

			//add the id of the comment to the array in the post document
			Post.findById(req.params.id, (err, post) => {
				post.comments.push(comment.id)
				post.save()
			})

			console.log("Comment has been added!");
			res.redirect("/profile");
		} catch (err) {
			console.log(err);
			res.redirect("/profile");
		}
	},
};
