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
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log("?????")
    console.log(values)
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
                <Input type="email" placeholder="Enter email" {...field} />
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
                <Input type="password" placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
          <Button type="submit">Submit</Button>
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