import Example from '../models/example.model'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  Example.sync({ alter: isDev })
}
export default dbInit 