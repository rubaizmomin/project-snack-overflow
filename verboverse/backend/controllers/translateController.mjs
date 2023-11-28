import translate from '../models/translate.mjs';

export async function translateText (req, res, next) {
    try {
        const {text} = req.body.text; 
        const {target} = req.body.target;
        const [translations] = await translate.translate(text, target);
        translations = Array.isArray(translations) ? translations : [translations];
        console.log('Translations:');
        translations.forEach((translation, i) => {
            console.log(`${text[i]} => (${target}) ${translation}`);
        })

        translateText(); 

    } catch (error) {
        next(error);
    }

}