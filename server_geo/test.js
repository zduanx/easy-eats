var ss = require('string-similarity');
var similarity = ss.compareTwoStrings('chinese', 'american hunan szechuan something');
console.log(similarity);

a = "{\"location\":[\"32.826791\",\"-117.155692\"],\"_id\":\"5a88f6622a7f550f8fbc5fcf\",\"hashcode\":\"0d2ebf8792ab04741240f68a79d3782e\",\"reviews\":[\"“There's a lot of spicy dishes on the menu that can be prepared mild if you ask.” in 2 reviews\",\"“We had a pork/tofu/squid dish, string beans and eggplant, shredded potatoes,and fried rice.” in 2 reviews\"],\"created_at\":\"2018-02-18T03:43:20Z\",\"count\":\"19 reviews\",\"hours\":[\"11:00 am - 3:00 pm5:00 pm - 9:30 pm\",\"Closed\",\"11:00 am - 3:00 pm5:00 pm - 9:30 pm\",\"11:00 am - 3:00 pm5:00 pm - 9:30 pm\",\"11:00 am - 9:30 pm\",\"11:00 am - 9:30 pm\",\"11:00 am - 9:00 pm\"],\"name\":\"土家湘菜  Hunan Kitche\",\"image\":\"https://s3-media3.fl.yelpcdn.com/bphoto/Ue5CQCHFhA-4I63fsoVfPw/ls.jpg\",\"phone\":\"(858) 987-0219\",\"identifier\":\"/biz/%E5%9C%9F%E5%AE%B6%E6%B9%98%E8%8F%9C-hunan-kitchen-san-diego\",\"rating\":\"3.5 star rating\",\"keywords\":[\"Chinese\",\"Japanese\"],\"url\":\"https://www.yelp.com/biz/%E5%9C%9F%E5%AE%B6%E6%B9%98%E8%8F%9C-hunan-kitchen-san-diego?rh_count=8\",\"address\":[\"4690 Convoy St\",\"San Diego, CA 92111\"]}"

a = JSON.parse(a);
b = a.name
c = a.keywords.join(" ")

d = b + ' ' + c
console.log(d);

console.log(ss.compareTwoStrings('japanese chinese', d))