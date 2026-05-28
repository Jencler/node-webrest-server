//* DTO -> Data Tranfer Object: retorno error o instancia segun validaciones
//* Usare Zod para validar
import * as z from "zod";

const todoSchema = z.object({
    id: z.string(),
    text: z.string({ error: 'No es un texto' })
        .min(2, { error: 'Minimo 2 caracteres' })
        .trim()
        .optional(),
    completed: z.boolean({ error: 'Tipo dato incorrecto (true/false)' })
        .optional()
})

export class TodoUpdateDto {

    private constructor(
        public readonly id: string,
        public readonly text?: string,
        public readonly completed?: boolean
    ) { }
    static create(props: { [key: string]: any }): [string[] | undefined, TodoUpdateDto | undefined] {
        const result = todoSchema.safeParse(props)

        if (result.error) {
            const errorsMessage = result.error.issues.map(error => error.message);
            const uniqueErrors = [...new Set(errorsMessage)]
            return [uniqueErrors, undefined]
        }

        const { id, text, completed } = result.data
        return [undefined, new TodoUpdateDto(id, text, completed)]
    }
}