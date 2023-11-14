const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "pattern": "^[A-Z][a-z]*$"
        },
        "dept": {
            "type": "string",
            "pattern": "^[A-Z][A-Z]*$",
            "maxLength": 3,
            "minLength": 2
        }
    },
    "required": ["name", "dept" , "id"],
    "maxProperties": 3,
    "minProperties": 3,
};

module.exports = ajv.compile(schema);