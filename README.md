 # Fernando´s Thoughts
 https://fernandosthoughts.vercel.app/
 ### Blog website
 This repository contains the code of a self made blog website, that allows to post blog entries written in **Markdown** and add code in them, since the thematic of the blog ist coding. The frontend is written in **Angular** and the Backend is developed using the **[MongoDB](https://www.mongodb.com/) serverless realm**, since the database of the blog is stored there.
 ### Story behind
 As a software developer I had since long the self challenge of developing my own website from scratch to end and I decided to materialize that project as the seed of another project, which is a blog in which I show ideas I have about the coding world and small nuggets of knowledge that I consider that could help someone avoiding the same errors I did.
 I started developing the website locally using **Angular** since it is the **Frontend Framework** I am most familiar with, **Node.js** for the **Backend** since the lerning curve is pretty affordable when already knowing **Javascript**, but still challenging and interesting, a local installation of **Mongodb** was choosen for the **Database**, since it allows enought flexibility via **NOSQL** and allows to store it for production in their own website.
 ### This is a production version
 This webiste is developed to store the Backend and the database in **MongoDB Atlas** and the Backend in **MongoDB Realm**. Originally the website was adapted to a local version of **MongoDB**, when adapting the Backend to handle with **MongoDB Atlas** the change was so big that I decided to store the previous version in another repository, [ownWebsite](https://github.com/FernandoES/ownWebsite), feel free to check the **local** version in there.

 ### Installation
 #### Frontend
 * Install the newest stabile version of **Node.js**.
 * Install your favourite IDE, I would suggest **Visual Studio Code**.
 * Download the code of this repository
 * Run `npm i` in the `frontend` folder
 * Run `npm run serve` to get a version that would update the explorer every time a file is updated

 ### Backend
 * Get a free account of **MongoDB Atlas** in here (mongodb)[https://www.mongodb.com/]
 * Set the Database there according to the **schema** in there
 * Add the functions shown in the Backend code
