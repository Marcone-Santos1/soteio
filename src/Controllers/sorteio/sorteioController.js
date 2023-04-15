import {Router} from 'express';
import User from '../../Models/UserModel.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const participants = await User.find({});

        const count = User.find({}).countDocuments().exec();
        count.then((count) => {
            if (count <= 1) {
                return res.send({"error": {"message": "Minimo de 2 users"}})
            }
        })
        const shuffledParticipants = shuffleArray(participants);

        shuffledParticipants.forEach((participant, index) => {
            const amigo_secreto = index === shuffledParticipants.length - 1 ? shuffledParticipants[0]._id : shuffledParticipants[index + 1]._id;

            participant.amigo_secreto = amigo_secreto;
            participant.save();
        });

        res.send(shuffledParticipants);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default router;