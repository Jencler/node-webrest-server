//* DTO -> Data Tranfer Object: retorno error o instancia segun validaciones
//* Usare Zod para validar
import * as z from "zod";

const todoSchema = z.object({
    text: z.string({ error: 'No es un texto' })
        .min(2, { error: 'Minimo 2 caracteres' })
        .trim()
})

export class TodoCreateDto {

    private constructor(public readonly text: string) { }
    static create(props: { [key: string]: any }): [string[] | undefined, TodoCreateDto | undefined] {
        const result = todoSchema.safeParse(props)

        if (result.error) {
            const errorsMessage = result.error.issues.map(error => error.message);
            const uniqueErrors = [...new Set(errorsMessage)]
            return [uniqueErrors, undefined]
        }
        return [undefined, new TodoCreateDto(result.data.text)]
    }
}