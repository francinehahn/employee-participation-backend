import { EmployeeBusiness } from "../../src/business/EmployeeBusiness";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";
import { EmployeeDatabaseMock } from "../mocks/EmployeeDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";


const employeeBusiness = new EmployeeBusiness(new EmployeeDatabaseMock(), new UserDatabaseMock(), new AuthenticatorMock())

/*describe("Testing the registerEmployee endpoint", () => {})


describe("Testing the editEmployeeStatus endpoint", () => {})


describe("Testing the getAllEmployees endpoint", () => {})


describe("Testing the getEmployeeInfo endpoint", () => {})


describe("Testing the deleteEmployee endpoint", () => {})
*/