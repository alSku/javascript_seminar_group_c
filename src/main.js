import 'dotenv/config';

import Compression from 'compression';
import Cors from 'cors';
import Express from 'express';
import Helmet from 'helmet';
import Morgan from 'morgan';

import { Server } from '~/app';
import { shouldCompress } from '~/utils';

const app = Express();
const compression = Compression({ level: 6, filter: shouldCompress });
const cors = Cors();

const fqdn = process.env.BBB_URL;

const helmet = Helmet(
    {
      contentSecurityPolicy : {
        directives: {
          defaultSrc: ["'self'", fqdn],
          baseUri: ["'self'"],
          fontSrc: ["'self'", "https:", "data"],
          frameAncestors: ["'self'", fqdn],
          imgSrc: ["'self'", "data:"],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'", fqdn],
          scriptSrcAttr: ["'none'"],
          styleSrc: ["'self'", "https:", "'unsafe-inline'"],
          upgradeInsecureRequests: [],
      }},
    });

const morgan = Morgan('dev');

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

app.use(compression);
app.use(cors);

// set security HTTP headers
app.use(helmet);
app.use(morgan);

Server(app);


