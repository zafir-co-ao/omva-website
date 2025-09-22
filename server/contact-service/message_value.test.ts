import { describe, expect, it } from "vitest";
import { MessageValue } from "./message_value";
import { InvalidMessageError } from "./invalid_message_error";

describe("MessageValue", () => {
    it("Deve criar uma mensagem válida", () => {
        const result = MessageValue.from("Como renovo a minha cédula?");
        expect(result.isRight()).toBeTruthy();
        expect(result.value.message);
    });

    it("Deve retornar erro se a mensagem estiver vazia", () => {
        const result = MessageValue.from("");
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(InvalidMessageError);
    });

    it("Deve retornar erro se a mensagem tiver mais de 250 caracteres", () => {
        const message =
            `Lorem of A Ordem dos Médicos Veterinários de Angola (OMVA) 
            é a instituição pública que representa e regula a profissão veterinária em Angola. 
            Criada ao abrigo do Decreto n.º 95/03, de 21 de outubro de 2003, é constituída como pessoa coletiva de direito público, plenamente independente dos órgãos do Estado, com autonomia administrativa, financeira e patrimonial. A sua missão primordial é defender o exercício ético da medicina veterinária, promover o progresso técnico e científico, 
            salvaguardar os interesses profissionais dos seus membros e contribuir ativamente para a saúde pública, a sanidade animal e a higiene alimentar sustentável.
        `;
        const result = MessageValue.from(message);
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(InvalidMessageError);
    });
});
