const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const City = mongoose.model('City');

const resolvers = {
    Query: {
        hotel: (root, {slug}) => {
            return Hotel.findOne({slug: slug});
        },
        hotels: () => {
            return Hotel.find();
        },
    },
    Hotel: {
      city: (parent) => {
        return City.findOne({_id: parent.city});
      }
    }
};

export default resolvers;