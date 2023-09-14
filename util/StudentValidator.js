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
            "maxLength": 3,
            "minLength": 2
        }
    },
    "required": ["name", "dept"],
    "maxProperties": 2,
    "minProperties": 2,
};

module.exports = ajv.compile(schema);