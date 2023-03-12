// get all posts
// get a single post
// update a post
// delete a post

import { Postit, User } from "../models";
import { IPostit } from "../interfaces/post.interface";
import { IErrorObj } from "../interfaces/error.interface";
import { IUserQueryProps } from "../interfaces/user.interface";

class USER_LOOKUP_SERVICE {

    // get all postits of a user
    async getAllUserPostit(userCredential: IUserQueryProps) {
        try {
            let userPostits;
            if (userCredential.queryType == "id") {
                userPostits = await Postit.find({ creator: userCredential.queryValue, deleted: false })
                    .select("-deleted")
                    .populate({ path: "creator", select: "username profilePicture" })
                    .lean()
                    .sort({ createdAt: -1 })
            } else if (userCredential.queryType == "username") {
                userPostits = await User.findOne({ username: userCredential.queryValue, deleted: false })
                    .select("posts")
                    .populate({
                        path: "posts",
                        // populate: { path: "creator" },
                        // select: "-deleted"
                    })
                    .lean()
                    .sort({ createdAt: -1 })
            }
            return userPostits
        } catch (err) {
            throw err;
        }
    }
}

export default new USER_LOOKUP_SERVICE();
