const asyncHandler = require('express-async-handler');
const axios = require('axios');
const fs = require('fs').promises;

const getCatBreedText = asyncHandler(async (req, res) => {
    try {
        // task 1 take the data from the url and store it in a file
        const initialResponse = await axios.get('https://catfact.ninja/breeds');
        const totalPages = initialResponse.data.last_page;

        const allData = [initialResponse.data]; 
        var initialTextData = JSON.stringify(initialResponse.data, null, 2);
        await fs.writeFile('catbreeds.txt', initialTextData);
        // task 2 Console the number of pages of data that are available on this URL
        console.log("The number of pages of data that are available on this URL is", totalPages);

        // task 3 Get the all data from the pages
        let nextPageUrl = initialResponse.data.next_page_url;

        while (nextPageUrl) {
            const nextPageResponse = await axios.get(nextPageUrl);
            allData.push(nextPageResponse.data);
            nextPageUrl = nextPageResponse.data.next_page_url;
        }

        const combinedData = [].concat(...allData);

        // task 4 Group the breeds of cat by Countries
        countryWiseBreeds = {}
        combinedData.forEach((item) => {
            item.data.forEach((breed) => {
                if (countryWiseBreeds[breed.country]) {
                    countryWiseBreeds[breed.country].push(breed);
                } else {
                    countryWiseBreeds[breed.country] = [breed];
                }
            });
        });
    
        res.status(200).send({
            message: "Data is stored in a file named catbreeds.txt successfully",
            totalPages: totalPages,
            countryWiseBreeds: countryWiseBreeds
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            error: err.message || "Unknown error",
            message: "Issue in storing or retrieving data"
        });
    }
});

const check8Words = asyncHandler(async (req, res) => {
    const { str } = req.body;

    try {
        // task 1 Check if the string contains 8 words
        const words = str.split(' ');
        const contains8Words = words.length >= 8;
        if (contains8Words) {
        // return OK if valid
        res.status(200).send({
            message: "OK",
            
        });}
        // return Not Acceptable if invalid
        else {
            res.status(406).send({
                message: "Not Acceptable",
            
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            error: err.message,
        });
    }
    
});
module.exports = { getCatBreedText, check8Words };
