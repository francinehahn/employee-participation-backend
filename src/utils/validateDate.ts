import { CustomError } from "../error/CustomError"

export function validateDate (date: string): boolean {
    try {
        const dateArray = date.split("/")
        if (dateArray.length < 3) {
            return false
        }
        
        const day = Number(dateArray[0])
        const month = Number(dateArray[1])
        const year = Number(dateArray[2])
        
        if (year > Number(new Date().getFullYear())) {
            return false
        } else if (year/1000 < 1) {
            return false
        } else if (year === Number(new Date().getFullYear())) {
            if (month > Number(new Date().getMonth() + 1)) {
                return false
            } else if (month === Number(new Date().getMonth() + 1)) {
                if (day > Number(new Date().getDate())) {
                    return false
                }
            }
        }

        let isValid
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                day > 31? isValid = false : isValid = true
                break
            case 4: case 6: case 9: case 11:
                day > 30? isValid = false : isValid = true
                break
            case 2:
                if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
                    day <= 29? isValid = true : isValid = false
                    break
                } else {
                    day <= 28? isValid = true : isValid = false
                    break
                }
        }

        return isValid? true : false

    } catch (error: any) {
        throw new CustomError(error.statusCode, error.message)
    }    
}