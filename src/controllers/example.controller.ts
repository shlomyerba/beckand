
import { Request, Response, Router } from 'express';
import Logger from '../helpers/logger';
import { ExampleService } from '../services/exampleService';

export class ExampleController {
    public path: string;
    public router: Router;
    private exampleService : ExampleService;


    constructor() {
        this.path = 'examples';
        this.router = Router();
        this.exampleService = new ExampleService();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/', async (req: Request, res: Response): Promise<void> => {
            try {
                const examples = await this.exampleService.getAll()
                res.status(200).json({
                    message: 'Get examples successfully!',
                    data: { examples },
                    success: true
                });
            } catch (error) {
                Logger.http(error);
                res.status(400).json({
                    message: error,
                    success: false
                });
            }
        });

        this.router.get('/:id', async (req: Request, res: Response): Promise<void> => {
            try {
                const id = req.params.id;
                if (!id && (typeof id !== 'number')) {
                    res.status(422).json({
                        message: 'Invalid params',
                        success: false
                    });
                }
                const example = await this.exampleService.getById(parseInt(id))
                res.status(200).json({
                    status: 'Get example successfully!',
                    data: { example },
                    success: true
                });
            } catch (error) {
                Logger.http(error);
                res.status(400).json({
                    message: error,
                    success: false
                });
            }
        });

        this.router.post('/', async (req: Request, res: Response) => {
            try {
                if ((typeof req.body.name === 'string') && (typeof req.body.description === 'string')) {
                    await this.exampleService.create(req.body)
                    res.status(200).json({
                        message: 'Created example successfully!',
                        success: true
                    });
                } else {
                    res.status(422).json({
                        message: 'Invalid params',
                        success: false
                    });
                }
            } catch (error) {
                Logger.http(error);
                res.status(400).json({
                    message: error,
                    success: false
                });
            }
        });
    }
}