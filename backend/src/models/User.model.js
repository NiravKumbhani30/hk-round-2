const { models, model, Schema } = require("mongoose");

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		createdAt: {
			type: Number,
		},
		updatedAt: {
			type: Number,
		}
	},
	{ timestamps: true, versionKey: false },
);

module.exports = models.User || model("User", UserSchema);
