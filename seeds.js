//Required models
var Campground = require('./models/campground')
// Comment = require('./models/comment')

// Sample data for campgrounds
// var data = [
// 	{
// 	name: 'Willow Woods',
// 	image: 'https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg',
// 	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada, ipsum in viverra fringilla, nulla augue imperdiet ligula, ut convallis urna leo in orci. Aliquam libero diam, iaculis in dolor nec, pharetra ullamcorper urna. Vestibulum vitae velit a odio tincidunt placerat. Fusce pharetra mi nulla. Aliquam augue dui, tempus id eros eget, tempus faucibus ligula. Quisque sit amet augue at nisi ultricies dignissim. Nullam vestibulum gravida sapien, molestie dapibus nulla posuere sit amet. Vestibulum egestas dolor id sapien condimentum ultricies. Vestibulum lacinia, nibh a varius cursus, mauris nunc condimentum ante, ac ullamcorper felis urna at dui. Aliquam quis enim libero. Maecenas in varius urna.'
// 	},
// 	{
// 	name: 'Bronze Beach',
// 	image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg',
// 	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada, ipsum in viverra fringilla, nulla augue imperdiet ligula, ut convallis urna leo in orci. Aliquam libero diam, iaculis in dolor nec, pharetra ullamcorper urna. Vestibulum vitae velit a odio tincidunt placerat. Fusce pharetra mi nulla. Aliquam augue dui, tempus id eros eget, tempus faucibus ligula. Quisque sit amet augue at nisi ultricies dignissim. Nullam vestibulum gravida sapien, molestie dapibus nulla posuere sit amet. Vestibulum egestas dolor id sapien condimentum ultricies. Vestibulum lacinia, nibh a varius cursus, mauris nunc condimentum ante, ac ullamcorper felis urna at dui. Aliquam quis enim libero. Maecenas in varius urna.'
// 	},
// 	{
// 	name: 'Endor',
// 	image: 'https://farm9.staticflickr.com/8457/7930235502_df747573ca.jpg',
// 	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada, ipsum in viverra fringilla, nulla augue imperdiet ligula, ut convallis urna leo in orci. Aliquam libero diam, iaculis in dolor nec, pharetra ullamcorper urna. Vestibulum vitae velit a odio tincidunt placerat. Fusce pharetra mi nulla. Aliquam augue dui, tempus id eros eget, tempus faucibus ligula. Quisque sit amet augue at nisi ultricies dignissim. Nullam vestibulum gravida sapien, molestie dapibus nulla posuere sit amet. Vestibulum egestas dolor id sapien condimentum ultricies. Vestibulum lacinia, nibh a varius cursus, mauris nunc condimentum ante, ac ullamcorper felis urna at dui. Aliquam quis enim libero. Maecenas in varius urna.'
// 	}
// ]
//Function to populate the database
function seedDB(){
	// Remove all campgrounds
	console.log('Running Seeds')
	Campground.remove({}, function (error) {
		if(error){
			console.log(error)
		}
		// Adding some campgrounds
		// data.forEach( function(seed) {
		// 	Campground.create(seed, function (error, campground) {
		// 		if(error){
		// 			console.log(error)
		// 		}
		// 		else{
		// 			// Creating a comment
		// 			Comment.create({
		// 				text: 'Cool place, really chill.',
		// 				author: 'Carlton Banks'
		// 			},
		// 			function (error, comment) {
		// 				if(error){
		// 					console.log(error)
		// 				}
		// 				else{
		// 					campground.comments.push(comment)
		// 					campground.save()
		// 				}
		// 			})
		// 		}
		// 	})
		// })
	})
}
module.exports = seedDB