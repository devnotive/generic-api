import express, { Express, Request, Response } from 'express';
import { ROUTES, Router } from '../routes/routes';
import cors from 'cors';
import path from 'path';

import { ApiError } from '../shared/utils/api.error';
import fileUpload from 'express-fileupload';

export default function App(): Express {
    const app = express();

    const corsOptions = {
        origin: '*',
        credentials: true,
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        fileUpload({
            limits: { fileSize: 52428800 },
        }),
    );

    const wellKnownPath = path.join(process.cwd(), '.well-known');
    console.log(wellKnownPath);
    app.use('/.well-known', express.static(wellKnownPath));

    app.disable('x-powered-by');
    app.use(ROUTES.V1_PATH, Router);
    app.get('/', (_: Request, res: Response) => {
        res.send('Purple Vest Express + TypeScript Server');
    });

    app.use(ApiError.appError);

    app.use(ApiError.genericError);

    return app;
}
