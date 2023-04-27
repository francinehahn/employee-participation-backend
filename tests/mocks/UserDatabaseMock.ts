import { employeeStatus } from "../../src/model/Employee"
import { User, outputGetUserByEmailDTO, outputUserInfoDTO } from "../../src/model/User"
import { UserRepository } from "../../src/model/repositories/UserRepository"


export class UserDatabaseMock implements UserRepository {
    public signup = async (newUser: User): Promise<void> => {}

    public getUserByEmail = async (email: string): Promise<outputGetUserByEmailDTO | null> => {
        const result = {
            _id: "6431b333f7dc32460cb09429",
            user_name: "Francine Hahn",
            email: "fran_hahn@hotmail.com",
            password: "12345678"
        }

        if (email === result.email) {
            return result
        } else {
            return null
        }
    }

    public getUserById = async (id: string): Promise<outputUserInfoDTO | null> => {
        const result = {
            _id: "6431b333f7dc32460cb09429",
            user_name: "Francine Hahn",
            email: "fran_hahn@hotmail.com",
            employees: [
                {
                    employee_name: "Tábata Santos",
                    status: employeeStatus.inactive
                },
                {
                    employee_name: "João Pedro Saraiva",
                    status: employeeStatus.active
                }
            ],
            projects: [
                {
                    project_name: "Labefood",
                    start_date: "10/12/2022",
                    end_date: "03/04/2023",
                    collaborators: [
                        {
                            employee_name: "Tábata Santos",
                            participation: 20
                        }
                    ]
                }
            ]
        }

        return result
    }

    public deleteAccount = async (id: string): Promise<void> => {}
}