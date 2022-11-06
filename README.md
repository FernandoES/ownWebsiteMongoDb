 # Fernando´s Thoughts
 https://fernandosthoughts.vercel.app/
 ### Blog website
 This repository contains the code of a self made blog website, that allows to post blog entries written in **Markdown** and add code in them, since the thematic of the blog ist coding. The frontend is written in **Angular** and the Backend is developed using the **[MongoDB](https://www.mongodb.com/) serverless realm**, since the database of the blog is stored there.
 ### Story behind
 As a software developer I had since long the self challenge of developing my own website from scratch to end and I decided to materialize that project as the seed of another project, which is a blog in which I show ideas I have about the coding world and small nuggets of knowledge that I consider that could help someone avoiding the same errors I did.
 I started developing the website locally using **Angular** since it is the **Frontend Framework** I am most familiar with, **Node.js** for the **Backend** since the lerning curve is pretty affordable when already knowing **Javascript**, but still challenging and interesting, a local installation of **Mongodb** was choosen for the **Database**, since it allows enought flexibility via **NOSQL** and allows to store it for production in their own website.
 ### This is a local version
 This website is developed for a local implementation, not a published one. This is so, since while choosing a **hosting service** I decided myself to set the website database in **MongoDB Atlas**, the easiest way to handle it is to substitute your own backend with the one you create in **Realm** service, also there and to adapt frontend to use it. The change is so masive that I consider a better option to store it in another repository, [ownWebsiteMongoDb](https://github.com/FernandoES/ownWebsiteMongoDb), feel free to check the **production** version in there.

 ### Installation
 #### Frontend
 * Install the newest stabile version of **Node.js**.
 * Install your favourite IDE, I would suggest **Visual Studio Code**.
 * Download the code of this repository
 * Run `npm i` in the `frontend` folder
 * Run `npm run serve` to get a version that would update the explorer every time a file is updated
 #### Backend
 * Install the newest stabile version of **Node.js**. (If not already done in Frontend)
 * Install your favourite IDE, I would suggest **Visual Studio Code**. (If not already done in Frontend)
 * Install **mongodb**
 * Run `mongod` the set up the database
 * Run `ng serve` to run backend
