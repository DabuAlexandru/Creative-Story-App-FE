import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { formFieldStyle, registerFormSchema } from './utils'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: ""
    },
  })

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log("?????")
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem style={formFieldStyle}>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="What is your pen name?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormDescription style={{ display: 'flex', flexFlow: 'column' }}>
                <span>Your password must contain:</span>
                <span>- At least one lowercase letter</span>
                <span>- At least one uppercase letter</span>
                <span>- At least one special character (@, $, !, %, *, ?, &)</span>
                <span>- Minimum length of 8 characters</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem style={formFieldStyle}>
              <FormLabel>Confirm Password</FormLabel>
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
            Already have an account? <Link to={'/login'} style={{ fontWeight: 600 }}>Login</Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

const Register = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <Card className="w-[400px]">
        <CardHeader style={{ display: 'flex', alignItems: 'center' }}>
          <CardTitle style={{ fontSize: '28px', fontWeight: 700 }}>Register</CardTitle>
          <CardDescription>Create a new account.</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default Register