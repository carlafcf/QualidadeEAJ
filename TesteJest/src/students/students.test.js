const student = require('./students')

describe('Testes com alunos', () => {
    it ('Deve somar todas as notas (2,3,5) retornando 10', () => {
        const notes=[2,3,5]
        expect(student.sum(notes)).toEqual(10)
    })

    it ('Deve retornar 0 se uma das notas for 0 (5,0,10,8,9,10)', () => {
        const notes=[5,0,10,8,9,10]
        expect(student.sum(notes)).toEqual(0)
    })

    it ('Deve dobrar o valor final se tiverem mais do que 5 notas (1,3,2,5,6,7)', () => {
        const notes=[1,3,2,5,6,7]
        expect(student.sum(notes)).toEqual(48)
    })

    it ('Deve dobrar o valor da nota que for maior do que 9 (1,3,10,5,6,7)', () => {
        const notes=[1,3,10]
        expect(student.sum(notes)).toEqual(24)
    })

    it ('Deve dobrar o valor da nota que for maior do que 9 (1,3,10,5,6,7)', () => {
        const notes=[1,3,10,5,6,7]
        expect(student.sum(notes)).toEqual(84)
    })
})