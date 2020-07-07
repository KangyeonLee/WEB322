

const product = {
    fakeDB : [],
    packageDB : [],

    initDB: function() {

        this.fakeDB.push({
            title: "Product 1",
            description: "meal products 1",
            price: "1200",
            featured: true,
            imgPath: "./images/productImg/candy01.jpg"

        })

        this.fakeDB.push({
            title: "Product 2",
            description: "meal products 2",
            price: "950",
            featured: false,
            imgPath: "./images/productImg/candy02.jpg"
        })

        this.fakeDB.push({
            title: "Product 3",
            description: "meal products 3",
            price: "2500",
            featured: true,
            imgPath: "./images/productImg/candy03.jpg"
        })

        this.fakeDB.push({
            title: "Product 4",
            description: "meal products 4",
            price: "1000",
            featured: false,
            imgPath: "./images/productImg/candy04.jpg"
        })

        this.fakeDB.push({
            title: "Product 5",
            description: "meal products 5",
            price: "1200",
            featured: true,
            imgPath: "./images/productImg/candy05.jpg"

        })

        this.fakeDB.push({
            title: "Product 6",
            description: "meal products 6",
            price: "950",
            featured: false,
            imgPath: "./images/productImg/candy06.jpg"
        })

        this.fakeDB.push({
            title: "Product 7",
            description: "meal products 7",
            price: "2500",
            featured: true,
            imgPath: "./images/productImg/candy07.jpg"
        })

        this.fakeDB.push({
            title: "Product 8",
            description: "meal products 8",
            price: "1000",
            featured: false,
            imgPath: "./images/productImg/candy08.jpg"
        })

        /* package */

        this.packageDB.push({
            title: "Package 1",
            numberOfMeal: 2,
            description: "High protein, low-calorie meals with a nutrient profile tuned for weight loss",
            price: "1000",
            featured: false,
            imgPath: "./images/productImg/candy09.jpg"
        })

        this.packageDB.push({
            title: "Package 2",
            numberOfMeal: 4,
            description: "Higher protein and calorie portions to support your muscle gain momentum",
            price: "1000",
            featured: false,
            imgPath: "./images/productImg/candy10.jpg"
        })

        this.packageDB.push({
            title: "Package 3",
            numberOfMeal: 6,
            description: "High fat, low carb meals with moderate protein to achieve and sustain ketosis",
            price: "1000",
            featured: false,
            imgPath: "./images/productImg/candy11.jpg"
        })

        this.packageDB.push({
            title: "Package 4",
            numberOfMeal: 4,
            description: "A fully plant-based package featuring vegan meat and no animal products",
            price: "1000",
            featured: false,
            imgPath: "./images/productImg/candy12.jpg"
        })

        this.packageDB.push({
            title: "Package 5",
            numberOfMeal: 4,
            description: "A delicious Keto version of our bestselling Prebiotic Soup Cleanse",
            price: "1200",
            featured: true,
            imgPath: "./images/productImg/candy01.jpg"

        })

        this.packageDB.push({
            title: "Package 6",
            numberOfMeal: 6,
            description: "Our nutrient-packed cleanser with meals & organic juice for up to 14 days",
            price: "950",
            featured: false,
            imgPath: "./images/productImg/candy02.jpg"
        })

        this.packageDB.push({
            title: "Package 7",
            numberOfMeal: 2,
            description: "A gluten-free package with the same balanced profile as our other packages",
            price: "2500",
            featured: true,
            imgPath: "./images/productImg/candy03.jpg"
        })

        this.packageDB.push({
            title: "Package 8",
            numberOfMeal: 3,
            description: "A protein-packed meal and two superb prebiotic soups per day for up to 14 days",
            price: "1000",
            featured: false,
            imgPath: "./images/productImg/candy04.jpg"
        })

    },


    getAllProducts:function() {
        return this.fakeDB
    },

    getAllPackages:function() {
        return this.packageDB
    },
}

product.initDB();
module.exports = product;