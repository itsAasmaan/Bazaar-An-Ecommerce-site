const bcrypt = require("bcryptjs");

const mongodb = require("mongodb");

const db = require("../data/database");

class User {
  constructor(email, password, fullname, street, pincode, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      pincode: pincode,
      city: city,
    };
  }

  static findById(userId) {
    const id = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection("users")
      .findOne({ _id: id }, { projection: { password: 0 } });
  }

  userExist() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async existsInDatabase() {
    const exists = await this.userExist();
    if (exists) {
      return true;
    }
    return false;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  comparingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;