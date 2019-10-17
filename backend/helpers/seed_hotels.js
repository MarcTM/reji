// Import external dependancies
const faker = require('faker')
const boom = require('boom')
const fastify = require('fastify')({
	logger: true
})
const mongoose = require('mongoose')

// Connect to DB
mongoose
	.connect('mongodb://localhost/conduit_nodejs')
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err))

// hotels
require("../models/hotels/Hotel");

// hotels
var hotel = mongoose.model("Hotel");

// Fake data generation functions
const generateCountries = () => {
	let countries = []
	let i = 0

	while (i < 50) {
		const name = faker.fake('{{address.country}}')

		const country = {
			name
		}
		//This if check if some country are already in the array 
		if (countries.filter(value => value.name == country.name).length == 0) {
			countries.push(country)
			i++
		}
	}

	return countries
}

const generateCities = (countriesIds) => {
	let cities = []
	let i = 0

	while (i < 50) {
		const name = faker.fake('{{address.city}}')
		const latitude = faker.fake('{{address.latitude}}')
		const longitude = faker.fake('{{address.longitude}}')
		const country = faker.random.arrayElement(countriesIds)
		const image = "http://lorempixel.com/200/200/city/";
		const city = {
			name,
			latitude,
			longitude,
			country,
			image
		}
		//This if check if some city are already in the array
		if (cities.filter(value => value.name == city.name).length == 0) {
			cities.push(city)
			i++
		}
	}

	return cities
}

// HOTELS FAKE DATA
// TODO:jordi: test this
const generateHotels = (cities) => {
	let hotels = [];
	let i = 0;

	for (let i = 0; i < 2; i++) {
		const name = faker.fake("{{lorem.slug}}");
		const description = faker.fake("{{lorem.sentence}}");
		const city = faker.random.arrayElement(cities);
		// let tempDate = faker.fake("{{date.future}}");
		const stars = faker.fake("{{random.number}}");
		const reviewScore = faker.fake("{{random.number}}");
		let features = [];
		// generate features
		for (let j = 0; j < Math.round(Math.random() * 5) +1; j++) {
			features.push(faker.fake("{{lorem.word}}"));
			
		}
		const rooms = faker.fake("{{random.number}}");
		let services = [];
		// generate services
		for (let j = 0; j < Math.round(Math.random() * 5) +1; j++) {
			services.push(faker.fake("{{lorem.word}}"));
			
		}
		const image = "https://source.unsplash.com/200x200/?hotels";

		const hotel = {
			name, description, city, stars, reviewScore, features, rooms, services, image
		}
		console.log(hotel);

		if (hotels.filter(value => value.name == hotel.name).length == 0) {
			hotels.push(hotel);
		}
	}

	return hotels;
}
fastify.ready().then(
	async () => {
		try {
			const products = await Product.insertMany(generateProducts())

			const countries = await Country.insertMany(generateCountries())

			const countriesIds = countries.map(x => x._id)
            const citiesIds = cities.map(x => x._id)
            
			const cities = await City.insertMany(generateCities(countriesIds))
			// hotels
			const hotels = await hotel.insertMany(generateHotels(citiesIds))

			const restaurants = await Restaurant.insertMany(generateRestaurants(citiesIds))

			console.log(`
	  Data successfully added:
		- ${products.length} products added.	  
		- ${countries.length} countries added.
		- ${cities.length} cities added.
		- ${restaurants.length} restaurants added.
		- ${hotels.length} hotels added.
		`)
		
		} catch (err) {
			throw boom.boomify(err)
		}
		process.exit()
	},
	err => {
		console.log('An error occured: ', err)
		process.exit()
	}
)

