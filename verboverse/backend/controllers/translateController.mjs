import translate from '../models/translate.js';

export async function translateText (req, res, next) {
    try {
        let text = req.body.text; 
        let target = req.body.target;
        console.log(text);
        console.log(target);
        let translations = await translate.translate(text, target);
        console.log(translations); 
        res.status(200).send(translations[0]);
    } catch (error) {
        console.log(error);
    }

}