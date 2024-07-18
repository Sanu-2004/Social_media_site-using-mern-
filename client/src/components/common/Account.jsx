import React from 'react'

const Account = () => {
  return (
    <div className='snap-center lg:py-0 py-1'>
      <div className="flex items-center bg-base-300 justify-between my-2 p-3 rounded-full">
                <div className="flex items-center w-full">
                  <img
                    src="https://picsum.photos/200/300"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                  <span className="pl-2">John Doe</span>
                  <span className="pl-2 text-two text-sm">@jhondoe</span>
                  </div>
                </div>
                <button className="btn rounded-full">Link</button>
              </div>
    </div>
  )
}

export default Account
