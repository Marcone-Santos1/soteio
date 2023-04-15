import {Router} from 'express';
import User from '../../Models/UserModel.js';

const router = Router();

router.get("/", async (req, res) => {
    const allUsers = await User.find({}, ['name', 'email']);
    // const allUsers = await User.find();
    return res.send({"Users": allUsers});
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    if (!await User.exists({_id: id})) {
        return res.status(404).json({'Error': {'message': 'Usuário não existe'}});
    }

    const user = await User.findById({_id: id})

    const amigoSecreto = await User.findById({_id: user.amigo_secreto})

    return res.send({
        "user": {
            "name": user.name,
            "email": user.email,
            "amigo_secreto": {
                "name": amigoSecreto.name,
                "email": amigoSecreto.email
            }
        }
    });
});

router.post("/create", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    if (await User.exists({email: email})) {
        return res.status(400).send({'Error': {'message': 'Usuário já existe'}});
    }

    const newUser = new User({"name": name, email: email});
    const insertedUser = await newUser.save();
    return res.status(201).json({"user criado": insertedUser});
});

router.patch("/update/:id", async (req, res) => {

    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;

    const userVerification = await User.findById({_id: id});

    if (userVerification == null) {
        return res.status(404).json({'Error': {'message': 'Usuário não existe'}});
    }
    const user = await User.exists({email: email});

    if (userVerification.name === name && userVerification.email === email) {
        return res.status(400).json({'Error': {'message': 'Não houve alterações para ocorrer o update'}});
    }

    if (user !== null) {
        return res.status(400).send({'Error': {'message': 'Usuário já existe'}});
    }

    await User.updateOne({_id: id}, {name: name, email: email}, {returnOriginal: false});

    return res.status(201).json({
        "message": "user atualizado", "user": {
            name, email
        }
    });

});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if (!await User.exists({_id: id})) {
        return res.status(404).send({'Error': {'message': 'Usuário não existe'}});
    }

    const user = await User.findByIdAndDelete({_id: id});
    return res.send({"message": {"user deletado": user}});
});

export default router;