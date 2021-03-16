require('sqlite3');
const knex = require('knex');

const WINDOW_TABLE = 'WindowTable';

const database = exports.database = knex({
    client: 'sqlite',
    useNullAsDefault: true,
    connection: {
        filename: './data/WindowDB.sqlite'
    }
});

/**
 * Immediately delete the table entry when retrieved
 */
exports.DB_clearWindowProperties = function clearData() {
    database.del()
        .from(WINDOW_TABLE)
        .catch(() => console.log('Error occurred while deleting rows'));
}

// Create the schema for the table to persist window properties on start-up
database.schema.hasTable(WINDOW_TABLE)
    .then(exists => {
        if (!exists) {
            return database.schema.createTable(WINDOW_TABLE, tableBuilder => {
                tableBuilder.increments();
                tableBuilder.float('xCord').notNullable();
                tableBuilder.float('yCord').notNullable();
                tableBuilder.float('width').notNullable();
                tableBuilder.float('height').notNullable();
                tableBuilder.boolean('isMaximized').notNullable();
            })
        }
    }).catch(() => {
        console.log("Error occurred")
    })

/**
 * Persist the `windowProperties` in database
 * @param {*} windowProperties The properties to be persisted in SQLite database
 */
exports.DB_addWindowProperties = function DB_addWindowProperties(windowProperties) {
    let [xCord, yCord, width, height, isMaximized] = windowProperties;
    return database.insert(
        {
            xCord,
            yCord,
            width,
            height,
            isMaximized
        }
    ).into(WINDOW_TABLE);
}

/**
 * Gets the persisted window property from database
 */
exports.DB_getWindowProperties = function DB_getWindowProperties() {
    return database.select('xCord', 'yCord', 'width', 'height', 'isMaximized')
        .from(WINDOW_TABLE)
}