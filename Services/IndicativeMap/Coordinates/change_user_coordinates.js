const DataAccess = require('../../../Data/DataAccess');

async function change_user_coordinates(username, new_latitude, new_longitude){

    const UserCollection = DataAccess.database.collection('Users');
    try {
        let User = UserCollection.doc(username);
        let changer = await User.update({
            home_latitude: new_latitude,
            home_longitude: new_longitude
        });
        return 'COORDINATES_CHANGED';
    } catch (error) {
        console.log(error);
        return 'ERROR';
    }
}

exports.change_user_coordinates = change_user_coordinates;