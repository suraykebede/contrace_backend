const DataAccess = require('../../../Data/DataAccess');

async function get_all_traces(){
    let traces = [];
    const TracesCollection = DataAccess.database.collection('ContactTraces');
    try {
        let trace_information = await TracesCollection.get();
        trace_information.forEach((value) => {
            let data = value.data();
            let username = value.id;
            let infected = data.infected;
            let met_users = data.users;
            let venues = data.venues;
            let indirect = data.other_contacts
            let obj = {
                username: username,
                infected: infected,
                met_users: met_users,
                venues: venues,
                indirect: indirect
            }
            console.log(JSON.stringify(obj));
            console.log(obj.infected);
            traces.push(obj);
        })
        return traces;
    } catch (error) {
        console.log(error);
        return 'ERROR'
    }
}

exports.get_all_traces = get_all_traces;