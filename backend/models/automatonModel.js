const mongoose = require('mongoose');

const AutomatonSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    regex: { 
        type: String, 
        required: true 
    },
    nfa: { 
        type: Object, 
        required: true 
    },
    dfa: { 
        type: Object, 
        required: true 
    },
});

const Automaton = mongoose.model('Automaton', AutomatonSchema);
module.exports = Automaton;