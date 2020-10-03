class BaseController {
    static error(res, validator) {
        const errors = validator.showErrors();

        global.logger.error(errors);

        return res.status(400).send({ message: errors }).end();
    }

    static success(res, execution) {
        const executed = execution;

        return res
            .status(executed.res === false ? 400 : 201)
            .send(executed.message)
            .end();
    }
}

export default BaseController;
