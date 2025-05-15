import React from 'react'

const AboutScreen = () => {
  return (
    <div className='min-h-180 flex items-center justify-center px-4 md:px-32 py-4'>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16" >
        <div className="flex flex-col items-center justify-start h-full w-full lg:w-1/2 gap-2">
          <h1 className="text-2xl font-semibold w-full">About this site</h1>
          <p className="w-full">This site was created as an excercise to practice and demonstrate my fullstack skills using the MERN stack</p>
          <p className='w-full'>The structure of each page is built in HTML and styled using CSS via TailwindCSS</p>
          <p className='w-full'>Each page of the site is made of React components using JavaScript to handle the logic and interactivity</p>
          <p className="w-full">The backend consists of a custom API with user and post data contained in a MongoDB database</p>
          <p className="w-full">The data is interacted with using Mongoose and the routes are handled by Express and Node</p>
          <p className="w-full">The API calls to fetch data from the backend are done through a Redux Toolkit slice with Redux itself maintaining the global state of the current user's data</p>
          <p className="w-full">Git was used as a version control system during development</p>
        </div>
        <div className="flex flex-col h-full gap-2 w-full lg:w-1/2">
          <p className="font-semibold text-2xl w-full">Technologies used in the creation of this site:</p>
          <div className="flex flex-col w-full pl-4 gap-2">
            <p className="font-normal">- JavaScript</p>
            <p className="font-normal">- HTML/CSS</p>
            <p className="font-normal">- TailwindCSS</p>
            <p className="font-normal">- React</p>
            <p className="font-normal">- Express.js</p>
            <p className="font-normal">- Node.js/npm</p>
            <p className="font-normal">- Mongoose/MongoDB</p>
            <p className="font-normal">- Redux/Redux Toolkit</p>
            <p className="font-normal">- Git</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default AboutScreen
