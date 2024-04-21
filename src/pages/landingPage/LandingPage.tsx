import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  
  return (
    <div>
      <div>
        <h1 className='text-6xl font-bold bg-cover bg-[50%] bg-no-repeat'>
          Create your own story!
        </h1>
      </div>
      <div className='text-3xl font-semibold mt-12 leading-loose opacity-80'>
        <p>If you have a kick for writing, don't hide it! Share with the world!</p>
        <p>Hop on our app and try our features that will help you write your next masterpiece!</p></div>
      <div className='text-3xl font-semibold mt-16 flex gap-6'>
        <Button className='text-xl font-bold w-40 p-5' onClick={() => navigate("/login")}>Login</Button>
        <Button className='text-xl font-bold w-40 p-5' onClick={() => navigate("/register")}>Register</Button>
        </div>
      <div className="absolute right-0 bottom-0 size-2/3 overflow-hidden z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))] to-50% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))] to-50% to-transparent pointer-events-none" />
        <img className="object-cover w-full h-full" src="src\assets\images\man-writing-image.jpg" alt="man-writing" />
      </div>
    </div>
  )
}

export default LandingPage