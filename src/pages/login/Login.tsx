import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { formFieldStyle, loginFormSchema } from './utils'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '@/utils/providers/UserContextProvider'
import { useToast } from '@/components/ui/use-toast'
// import { toast, useToast } from 'react-toastify'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { login } = useContext(UserContext)
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true)
    const response = await login(values);
    setIsLoading(false)
    if(response.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.message
      })
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem style={formFieldStyle}>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem style={formFieldStyle}>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="password" placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
          <Button  disabled={isLoading} type="submit">Submit</Button>
          <p className='text-sm text-muted-foreground'>
            You don't have an account? <Link to={'/register'} style={{ fontWeight: 600 }}>Register</Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

const Login = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <Card className="w-[400px]">
        <CardHeader style={{ display: 'flex', alignItems: 'center' }}>
          <CardTitle style={{ fontSize: '28px', fontWeight: 700 }}>Login</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default Login