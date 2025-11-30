import logo from './White logo.png'
import arrow_icon from './arrow_icon.svg'
import group_profile from './group_profile.png'
import bgImage1 from './bgImage1.png'
import bgImage2 from './bgImage2.png'
import hero_img from './hero_img.png'
import microsoft_logo from './microsoft_logo.png'
import zoom_logo from './zoom_logo.png'
import rakuten_logo from './rakuten_logo.png'
import coinbase_logo from './coinbase_logo.png'
import ads_icon from './ads_icon.svg'
import content_icon from './content_icon.svg'
import marketing_icon from './marketing_icon.svg'
import social_icon from './social_icon.svg'
import menu_icon from './menu_icon.svg'
import close_icon from './close_icon.svg'
import work_mobile_app from './work_mobile_app.jpg'
import work_fitness_app from './work_fitness_app.png'
import work_fiberflow from './fiberflow logo.png'
import work_fork_knife from './f&k logo.jpg'
import work_ride_infinity from './ride infinity.jpeg'
import work_agrozy from './agrozyfoods logo.png'
import email_icon from './email_icon.svg'
import person_icon from './person_icon.svg'
import facebook_icon from './facebook_icon.svg'
import twitter_icon from './twitter_icon.svg'
import instagram_icon from './instagram_icon.svg'
import linkedin_icon from './linkedin_icon.svg'
import logo_dark from './Dark logo.png'
import airbnb_logo from './airbnb_logo.svg'
import google_logo from './google_logo.svg'
import menu_icon_dark from './menu_icon_dark.svg'
import sun_icon from './sun_icon.svg'
import moon_icon from './moon_icon.svg'
import loader_logo from './loader_logo.png'
import qubo_loader from './qubo loader.mp4'

export const company_logos = [
  microsoft_logo,
  zoom_logo,
  rakuten_logo,
  coinbase_logo,
  airbnb_logo,
  google_logo,
]

const assets = {
  logo,
  arrow_icon,
  group_profile,
  bgImage1,
  bgImage2,
  hero_img,
  ads_icon,
  content_icon,
  marketing_icon,
  social_icon,
  menu_icon,
  close_icon,
  work_mobile_app,
  work_fitness_app,
  work_fiberflow,
  work_fork_knife,
  work_ride_infinity,
  work_agrozy,
  email_icon,
  person_icon,
  facebook_icon,
  twitter_icon,
  instagram_icon,
  linkedin_icon,
  logo_dark,
  menu_icon_dark,
  sun_icon,
  moon_icon,
  loader_logo,
  qubo_loader
}

export default assets

export const teamData = [
  { name: 'Ajith Kumar', title: 'Founder & Dev', image: 'https://images.unsplash.com/photo-1750535135451-7c20e24b60c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580' },
  { name: 'Arun Krishna', title: 'Developer and admin', image: 'https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580' },
  { name: 'Mohamad Salman', title: 'Promotion and Socialize', image: 'https://plus.unsplash.com/premium_photo-1739786996060-2769f1ded135?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580' },
  { name: 'Raj Kumar', title: 'Business development', image: 'https://images.unsplash.com/photo-1740252117044-2af197eea287?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580' },
  { name: 'Karthik', title: 'Marketing', image: 'https://plus.unsplash.com/premium_photo-1739178656557-16b949fea186?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774' },
  { name: 'Mouli Vikas', title: 'React & Flutter Developer', image: 'https://plus.unsplash.com/premium_photo-1740097670001-28363fa53ee3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774' },
  { name: 'Ayyanar Raja', title: 'Performance manager', image: 'https://plus.unsplash.com/premium_photo-1739178656567-068b26a4b979?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774' },
  { name: 'Hemanth', title: 'Content writer', image: 'https://images.unsplash.com/photo-1740252117012-bb53ad05e370?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580' },
]

export const productsData = [
  {
    id: 1,
    name: 'Dell XPS 15 Laptop',
    category: 'Laptops',
    price: 125999,
    originalPrice: 145999,
    discount: 14,
    description: 'Intel Core i7, 16GB RAM, 512GB SSD, 15.6" FHD Display',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
    inStock: true
  },
  {
    id: 2,
    name: 'Gaming Desktop PC',
    category: 'Desktops',
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    description: 'AMD Ryzen 5, RTX 3060, 16GB RAM, 1TB SSD',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500',
    inStock: true
  },
  {
    id: 3,
    name: 'LG 27" 4K Monitor',
    category: 'Monitors',
    price: 32999,
    description: 'Ultra HD, IPS Panel, 60Hz, HDR Support',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    inStock: true
  },
  {
    id: 4,
    name: 'Logitech MX Master 3',
    category: 'Mouse',
    price: 8999,
    originalPrice: 10999,
    discount: 18,
    description: 'Wireless Mouse, Ergonomic Design, 7 Buttons',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    inStock: true
  },
  {
    id: 5,
    name: 'Mechanical Gaming Keyboard RGB',
    category: 'Keyboards',
    price: 5999,
    description: 'Cherry MX Switches, RGB Backlight, N-Key Rollover',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
    inStock: false
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Headphones',
    price: 29999,
    originalPrice: 34999,
    discount: 14,
    description: 'Noise Cancelling, Bluetooth, 30hr Battery',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
    inStock: true
  },
  {
    id: 7,
    name: 'Samsung 1TB SSD',
    category: 'Storage',
    price: 8499,
    description: 'NVMe M.2, 3500MB/s Read Speed',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
    inStock: true
  },
  {
    id: 8,
    name: 'NVIDIA RTX 4070 Graphics Card',
    category: 'Graphics Cards',
    price: 59999,
    originalPrice: 64999,
    discount: 8,
    description: '12GB GDDR6X, Ray Tracing, DLSS 3.0',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500',
    inStock: true
  },
  {
    id: 9,
    name: 'Intel Core i9-13900K Processor',
    category: 'Processors',
    price: 54999,
    description: '24 Cores, 32 Threads, 5.8GHz Boost',
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500',
    inStock: true
  },
  {
    id: 10,
    name: 'MacBook Pro 14"',
    category: 'Laptops',
    price: 189999,
    description: 'M3 Pro Chip, 18GB RAM, 512GB SSD',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    inStock: true
  },
  {
    id: 11,
    name: 'ASUS ROG Gaming Monitor 32"',
    category: 'Monitors',
    price: 45999,
    originalPrice: 52999,
    discount: 13,
    description: '1440p, 165Hz, G-Sync, Curved',
    image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=500',
    inStock: true
  },
  {
    id: 12,
    name: 'Razer DeathAdder V3 Pro',
    category: 'Mouse',
    price: 11999,
    description: 'Wireless Gaming Mouse, 30K DPI Sensor',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
    inStock: true
  }
]