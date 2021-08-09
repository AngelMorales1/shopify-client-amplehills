import SendGrid from '@sendgrid/mail';
import * as functions from 'firebase-functions';

SendGrid.setApiKey(functions.config().sendgrid.api_key);

export default SendGrid;
