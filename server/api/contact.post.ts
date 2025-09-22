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
            message: "O email informado é inválido",
        });
    }

    if (voidOrErr.value instanceof InvalidNameError) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "O nome é obrigatório e deve ter pelo menos 8 caracteres",
        });
    }

    if (voidOrErr.value instanceof InvalidMessageError) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message:
                "A mensagem é obrigatória e deve ter no máximo 250 caracteres",
        });
    }

    if (voidOrErr.value instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Não foi possível enviar os seus dados. Tente mais tarde",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Não foi possível enviar os seus dados. Tente mais tarde",
        });
    }

    setResponseStatus(event, HttpStatus.Ok);

    return { message: "Dados enviados com sucesso!" };
});
