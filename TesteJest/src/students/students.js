module.exports = {
    sum: notes => {
        if (Math.min(...notes)==0) {
            return 0
        }
        const result = notes.reduce((acc, note) => {
            acc += note>9 ? note*2 : note
            return acc
        },0)
        return notes.length>5 ? result*2 : result
    }
}