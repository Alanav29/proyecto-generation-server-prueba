const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const createUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Faltan datos");
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("Ese usuario ya existe");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error("Datos No Validos");
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Incorrect name or password");
	}
});

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "2d",
	});
};

const userInfo = asyncHandler(async (req, res) => {
	const userData = await User.aggregate([
		{ $match: { _id: req.user._id } },
		{
			$lookup: {
				//name of the collection we want to merge(busca en esta coleccion)
				from: "lostpets",
				//name of the field that is storing the reference(campo en comment que relaciona las colecciones)
				localField: "_id",
				//in the user model, which field is storing the ObjectId? _id(campo en users al que se hace referencia)
				foreignField: "user_id",
				//let's provide an alias.(en que campo se guardara)
				as: "lostPets",
			},
		},
	]);

	res.status(200).json(userData);
});

const updateUser = asyncHandler(async (req, res) => {
	if (!req.user.isAdmin) {
		res.status(401);
		throw new Error("Unauthorized. User is not admin");
	}

	const user = await User.findbyId(req.params.id);
	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}

	const userUpdated = await User.findbyIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json({ userUpdated });
});

module.exports = {
	createUser,
	loginUser,
	userInfo,
	updateUser,
};
