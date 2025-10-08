import { InvalidEmailFormatError } from "../contact-service/invalid_email_format_error";
import { InvalidMessageError } from "../contact-service/invalid_message_error";
import { InvalidNameError } from "../contact-service/invalid_name_error";
import { useContactService } from "~/composables/useContactService";
import { HttpStatus } from "../http_status";

const service = useContactService();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const voidOrErr = await service.send(body.name, body.email, body.message);

    if (voidOrErr.value instanceof InvalidEmailFormatError) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "O email informado e invalido",
        });
    }

    if (voidOrErr.value instanceof InvalidNameError) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage:
                "O nome e obrigatorio e deve ter pelo menos 8 caracteres",
        });
    }

    if (voidOrErr.value instanceof InvalidMessageError) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage:
                "A mensagem e obrigatoria e deve ter no maximo 250 caracteres",
        });
    }

    if (voidOrErr.value instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage:
                "Nao foi possivel enviar os seus dados. Tente mais tarde",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage:
                "Nao foi possivel enviar os seus dados. Tente mais tarde",
        });
    }

    setResponseStatus(event, HttpStatus.Ok);

    return { message: "Informacões enviadas com sucesso!" };
});
