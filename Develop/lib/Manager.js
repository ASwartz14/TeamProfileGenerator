// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// extend `Employee`. 
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // In addition to `Employee`'s properties and methods, `Manager` will also have:
        //   * officeNumber
        super(name, id, email, );
        this.officeNumber = officeNumber;
    }
    //   * getRole() // Overridden to return 'Manager'
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}
module.exports = Manager;