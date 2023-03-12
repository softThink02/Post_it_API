import { User } from "../models";
import { IUser, IUserQueryProps } from "../interfaces/user.interface";
import { IErrorObj } from "../interfaces/error.interface";

class POST_MANAGER {
  // get all users
  async getAllUsers() {
    try {
      return await User.find({ deleted: false })
        .select("-password -deleted")
        .lean()
        .sort({ createdAt: -1 })
    } catch (err) {
      throw err;
    }
  }

  // find one user
  async findOneUser(userCredential: IUserQueryProps) {
    try {
      return await User.findOne({
        $and: [
          userCredential.queryType == "id" ?
            { _id: userCredential.queryValue } : { username: userCredential.queryValue },
          { deleted: false }
        ]
      })
        .select("-password -deleted")
        .lean();
    } catch (err) {
      throw err;
    }
  }

  // Update a user
  async updateUser(userId: string, newData: Partial<IUser>) {
    try {
      let user = await User.findOne({ _id: userId });
      // check if the current user is the requested user to be deleted
      if (!user) {
        let error: IErrorObj = new Error("Can't update another user")
        error.statusCode = 400
        throw error
      }
      if (user.deleted) {
        let error: IErrorObj = new Error("User not found")
        error.statusCode = 400
        throw error
      }

      return await User.findOneAndUpdate(
        { $and: [{ _id: userId }, { deleted: false }] }, newData, { new: true }
      ).select("-password -deleted")
    } catch (err) {
      throw err;
    }
  }

  // Method for deleting a user
  async deleteUser(userId: string) {
    try {
      let user = await User.findOne({ _id: userId });
      // check if the current user is the owner of the postit
      if (!user) {
        let error: IErrorObj = new Error("Can't delete another user")
        error.statusCode = 400
        throw error
      }
      if (user.deleted) {
        let error: IErrorObj = new Error("User not found")
        error.statusCode = 400
        throw error
      }
      // Apply soft delete on this user
      return await user.updateOne({ deleted: true }, { new: true })
        .select("-password -deleted")
    } catch (err) {
      throw err;
    }
  }
}

export default new POST_MANAGER();
