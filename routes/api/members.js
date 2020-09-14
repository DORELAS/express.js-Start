const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../public/members');

console.log(members);
// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// GETS ALL MEMBERS
router.get('/', (req, res) => {
    res.json(members);
});

// GET A SINGLE MEMBER
router.get('/:id', (req, res) => {

    const found = members.some((member) => { member.id === parseInt(req.params.id)});
    console.log(found);
    if (found) {

        res.json(members.filter((member) => { member.id === parseInt(req.params.id)}));
    } else {

        res.status(400).json({ msg: `No member found with ${req.params.id} id.`});
    }
});

// POST A SINGLE MEMBER
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.params.name,
        email: req.params.email,
        status: 'active'
    };

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: `Please include a name and email!`});
    }

    members.push(newMember);
    res.json(members);
});

// UPDATE A SINGLE MEMBER
router.put('/:id', (req, res) => {

    const found = members.some((member) => { member.id === parseInt(req.params.id)});
    console.log(found);
    if (found) {
        const upMember = req.body;
        members.forEach((member) => {
            if(member.id === parseInt(req.params.id)) {
                member.name = upMember.name ? upMember.name : member.name;
                member.email = upMember.email ? upMember.email : upMember.email;

                res.json({ msg: `Member updated`, member});
            }
        });
    } else {

        res.status(400).json({ msg: `No member found with ${req.params.id} id.`});
    }
});

// DELETE A SINGLE MEMBER
router.delete('/:id', (req, res) => {

    const found = members.some((member) => { member.id === parseInt(req.params.id)});
    console.log(found);
    if (found) {

        res.json({
            msg: 'Member deleted!',
            members: members.filter((member) => { member.id === parseInt(req.params.id)}) 
        });
    } else {

        res.status(400).json({ msg: `No member found with ${req.params.id} id.`});
    }
});

module.exports = router;