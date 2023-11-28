import {Translate} from '@google-cloud/translate';
import 'dotenv/config';

const CREDS = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const translate = new Translate({
    credentials: CREDS,
    projectId: CREDS.project_id, 
});

export default translate;



