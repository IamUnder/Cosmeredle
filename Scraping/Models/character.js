import mongoose from "mongoose"

const CharacterSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Img: {
        type: String,
        required: false
    },
    ImgAutor: {
        type: String,
        required: false
    },
    Gender: {
        type: String,
        required: false
    },
    Nationality: {
        type: String,
        required: false
    },
    World: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    Abilities: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    State: {
        type: String,
        required: true
    },
    FeauredIn: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },

});

const characterModel = mongoose.model("Character", CharacterSchema);

export default characterModel

// │  ◻ Name          ·  Vin
// │  ◻ Img           ·  https://coppermind.net/w/images/thumb/The_Ascendant_Warrior.jpg/200px-The_Ascendant_Warrior.jpg
// │  ◻ ImgAutor      ·  Miranda Meeks
// │  ◻ Gender        ·  undefined
// │  ◻ Nationality   ·  Skaa
// │  ◻ World         ·  Scadrial
// │  ◻ Abilities     ·  Mistborn,Hemalurgist,Sliver,Shard,Preservation
// │  ◻ State         ·  Died
// │  ◻ FeaturedIn    ·  Mistborn Era 1