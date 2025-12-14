import mongoose from "mongoose";
import type { IList } from "../types/index.js";

const listSchema = new mongoose.Schema<IList>({
    title: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Return id instead of _id
listSchema.virtual("id").get(function() {
    return this._id.toHexString();
});

listSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id.toHexString(),
        delete (ret as any)._id
    }
})

const List = mongoose.model("List", listSchema);
export default List;