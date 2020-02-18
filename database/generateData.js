const fs = require('fs');

const writeExperiences = fs.createWriteStream('./media-data.csv');

const startTime = process.hrtime();

function writeTenMillionExperiences(writer, encoding, callback) {
  console.log('starting writing experiences');
  let i = 10000000;
  let id = 1;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const titleList = ['Making sushi with a Japanese sushi chef', 'Royal High Tea at Kensington Palace', 'Photography city walk', 'Lamp making with a Lighting Designer', 'Stonehenge & more with an archaeologist', 'The Square Mile Walk evening'];
      const cityList = ['Sao Paulo', 'Rio de Janeiro', 'Boston', 'Boca Raton', 'Munich', 'Manchester', 'Miami', 'Anahein', 'Naples', 'Fort Lauderdale'];
      const stateList = ['Alaska', 'New Hampshire', 'Colorado', 'Ohio', 'Utah', 'Minnesota', 'Arizona', 'Maine', 'Arkansas', 'Indiana'];
      const countryList = ['Nigeria', 'United States', 'Bulgaria', 'Brazil', 'Germany', 'Fiji', 'Albania', 'France', 'United Kingdom', 'Lebanon'];
      const categoryList = ['Food & drink', 'Photography', 'Arts & Entertainment', 'Dining & Tasting', 'Arts & Design', 'Sports Games & Fitness'];
      const activityList = ['Cooking', 'Photo Shoot', 'History Walk', 'Food Tasting', 'Social Gathering'];
      const includesList = ['drinks', 'food', 'equipment'];
      const cuisineList = ['Japanese', 'Chinese', 'Brazilian', 'American'];
      const videoUrlList = ['https://emerald.org', 'http://jerome.com', 'http://estella.com', 'http://alexa.net', 'https://mitchell.com'];
      const languagesList = ['Japanese', 'Chinese', 'Portuguese', 'English', 'German', 'French'];

      const experience = {
        experienceId: id,
        title: titleList[Math.floor(Math.random() * titleList.length)],
        city: cityList[Math.floor(Math.random() * cityList.length)],
        state: stateList[Math.floor(Math.random() * stateList.length)],
        country: countryList[Math.floor(Math.random() * countryList.length)],
        category: categoryList[Math.floor(Math.random() * categoryList.length)],
        activity: activityList[Math.floor(Math.random() * activityList.length)],
        averageRating: Math.floor(Math.random() * (5 - 1) + 1),
        numberOfReviews: Math.floor(Math.random() * (100 - 1) + 1),
        duration: Math.floor(Math.random() * (6 - 1) + 1),
        groupSize: Math.floor(Math.random() * (40 - 1) + 1),
        includes: [],
        cuisine: cuisineList[Math.floor(Math.random() * cuisineList.length)],
        hostedLanguages: [],
        costPerPerson: Math.floor(Math.random() * (300 - 10) + 10),
        imageUrls: [],
        videoUrl: videoUrlList[Math.floor(Math.random() * videoUrlList.length)],
      };

      // add to includes array
      const numIncludes = Math.floor(Math.random() * 4 + 1);
      for (let j = numIncludes; j > 0; j -= 1) {
        const randomWord = includesList[Math.floor(Math.random() * includesList.length)];
        experience.includes.push(randomWord);
      }

      // add to hostedLanguages
      const numLanguages = Math.floor(Math.random() * 4 + 1);
      for (let k = numLanguages; k > 0; k -= 1) {
        const randomWord = languagesList[Math.floor(Math.random() * languagesList.length)];
        experience.hostedLanguages.push(randomWord);
      }

      // add 5 photos
      for (let m = 5; m > 0; m -= 1) {
        const randomNum = Math.floor(Math.random() * 20 + 1);
        // need to connect to aws s3 for the url
        const url = `https://fec-media.s3.amazonaws.com/photo${randomNum}.jpg`;
        experience.imageUrls.push(url);
      }

      const includes = `"{${experience.includes}}"`;
      const hostedLanguages = `"{${experience.hostedLanguages}}"`;
      const imageUrls = `"{${experience.imageUrls}}"`;

      const data = `${experience.experienceId},${experience.title},${experience.city},${experience.state},${experience.country},${experience.category},${experience.activity},${experience.averageRating},${experience.numberOfReviews},${experience.duration},${experience.groupSize},${includes},${experience.cuisine},${hostedLanguages},${experience.costPerPerson},${imageUrls},${experience.videoUrl}\n`;

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionExperiences(writeExperiences, 'utf-8', () => {
  console.log('ending writing experiences');
  console.log(process.hrtime(startTime));
  writeExperiences.end();
});
