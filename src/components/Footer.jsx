import React from 'react'

function Footer({tasks}) {
    return (
    <>  
        <footer className="absolute font-medium  rounded-2xl bottom-10 w-full bg-white text-purple-800 flex flex-row gap-8 justify-around items-center p-4">
                <div className='text-xl'>
                        <h2>Total Tasks: {tasks.length}</h2>
                        <h2>Completed Tasks: {tasks.reduce((cnt, task)=> task.done ? cnt + 1: cnt , 0)}</h2>
                </div>
                <div>
                        <p>© {new Date().getFullYear()} TrackMe </p>
                        <p className="text-lg text-shadow-card">Created By @avyaanverma</p>
                </div>
        </footer>
    </>
)
}

export default Footer