import React from "react"
import Image_1 from "../assets/Images/Image_1.png"
import { LuTrendingDown } from "react-icons/lu"

const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">

      {/* Left Section */}
      <div className="w-full md:w-[60vw] px-12 py-8 flex flex-col justify-start">
        <h2 className="text-lg font-semibold text-black mb-6">
          Money Tracker
        </h2>
        {children}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-[40vw] h-screen bg-violet-50 bg-cover bg-no-repeat bg-center overflow-hidden relative items-center justify-center">

        {/* Decorative Shapes */}
        <div className="w-56 h-56 rounded-[40px] bg-purple-600 absolute -top-10 -left-10 opacity-90"></div>
        <div className="w-56 h-56 rounded-[40px] border-18 border-fuchsia-600 absolute top-[30%] right-8 opacity-80"></div>
        <div className="w-56 h-56 rounded-[40px] bg-violet-500 absolute -bottom-10 -left-10 opacity-90"></div>

        {/* Stats Card */}
        <div className="absolute top-16 left-10 z-20">
          <StatsInfoCard
            icon={<LuTrendingDown />}
            label="Track your money"
            value="430,000"
            color="bg-purple-600"
          />
        </div>

        {/* Image */}
        <img
          src={Image_1}
          alt="Auth Illustration"
          className="w-[80%] max-w-md absolute bottom-10 drop-shadow-xl shadow-blue-400/15"
        />
      </div>

    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md shadow-purple-400/10 border border-gray-200/50">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1 tracking-wide">{label}</p>
        <h6 className="text-lg font-semibold text-gray-900">{value}</h6>
      </div>
    </div>
  )
}
