const fs = require('fs');
const ascii = require('ascii-table');

module.exports = () => {
    let eventsTable = new ascii().setHeading('Events', 'Load Status'); // create ascii table
    let events = fs.readdirSync('./events'); // events folder
    for (let file of events) { // for loop, loop through files inside the events folder
        require(`../events/${file}`); // require event file
        eventsTable.addRow(file.split('.js')[0], '✅ Ready'); // add a row to show event name & load status
    }

    console.log(eventsTable.toString().brightCyan);
}