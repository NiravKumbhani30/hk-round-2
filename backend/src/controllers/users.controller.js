const { getAllUsers, createUser, updateUser, deleteUser, getUserByUsername, getUserById, getAllUsersCount } = require("../services/users.services");
const { verifyToken } = require("../utils/Helper");

module.exports.getAll = async (req, res) => {
	try {
		let { page } = req.query;
		page = page - 1;
		const decodedToken = verifyToken(req);
		const pageLimit = Number.parseInt(process.env.LISTING_PAGE_LIMIT);
		if (page >= 0) {
			if (decodedToken.role === 'admin') {
				const allUsers = await getAllUsers({ page, limit: pageLimit });
				const totalUsersCount = await getAllUsersCount();
				return res.status(200).json({ success: true, data: { allUsers, totalUsersCount } });
			}
			const user = await getUserById(decodedToken.id);
			return res.status(200).json({ success: true, data: { allUsers: user } });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: "Internal server error" });
	}
};
