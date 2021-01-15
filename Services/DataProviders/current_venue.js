const DataAccess = require('../../Data/DataAccess');

async function current_venue(username){
    const UsersCollection = DataAccess.database.collection('Users');
    try {
        const UserSelected = UsersCollection.doc(username);
        let getting_user_information = await UserSelected.get();
        let user_data = getting_user_information.data();
        let current_venue = user_data.current_venue;
        return current_venue; 
    } catch (error) {
        return 'ERROR'
    }
}

exports.current_venue = current_venue;