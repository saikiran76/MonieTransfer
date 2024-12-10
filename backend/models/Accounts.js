const mongoose = require("mongoose");

/**
     * In the real world, you shouldn’t store `floats` for balances in the database.
    - You usually store an integer which represents the INR value with 
    - decimal places (for eg, if someone has 33.33 rs in their account, 
      you store 3333 in the database).


    There is a certain precision that you need to support (which for india is
    2/4 decimal places) and this allows you to get rid of precision
    errors by storing integers in your DB
*/

/**
 * reference the users table in the schema (Hint - https://medium.com/@mendes.develop/joining-tables-in-mongodb-with-mongoose-489d72c84b60)
 */

const AccountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: number,
        required: true
    }
})

const Account = mongoose.model("Account", AccountSchema)

module.exports = [
    Account
]