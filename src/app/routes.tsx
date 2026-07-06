import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AdminLayout } from './components/layout/AdminLayout'
import { ROUTES } from './constants'

const HomeAtlas = lazy(() => import('./pages/HomeAtlas'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Enterprises = lazy(() => import('./pages/Enterprises'))
const Suppliers = lazy(() => import('./pages/Suppliers'))
const About = lazy(() => import('./pages/About'))
const News = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Cookies = lazy(() => import('./pages/Cookies'))
const ColdStorage = lazy(() => import('./pages/ColdStorage'))
const Brands = lazy(() => import('./pages/Brands'))
const AdminBrands               = lazy(() => import('./pages/admin/AdminBrands'))
const AdminNetworkCountries     = lazy(() => import('./pages/admin/AdminNetworkCountries'))
const AdminTestimonials         = lazy(() => import('./pages/admin/AdminTestimonials'))
const AdminProcessSteps         = lazy(() => import('./pages/admin/AdminProcessSteps'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))
const AdminPages = lazy(() => import('./pages/admin/AdminPages'))

export const router = createBrowserRouter([
  // Atlas home page — standalone layout (own nav + footer)
  { path: ROUTES.HOME, element: <HomeAtlas /> },
  {
    element: <Layout />,
    children: [
      { path: ROUTES.PRODUCTS, element: <Products /> },
      { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetail /> },
      { path: ROUTES.ENTERPRISES, element: <Enterprises /> },
      { path: ROUTES.SUPPLIERS, element: <Suppliers /> },
      { path: ROUTES.ABOUT, element: <About /> },
      { path: ROUTES.NEWS, element: <News /> },
      { path: ROUTES.NEWS_DETAIL, element: <NewsDetail /> },
      { path: ROUTES.CONTACT, element: <Contact /> },
      { path: ROUTES.COLD, element: <ColdStorage /> },
      { path: ROUTES.BRANDS, element: <Brands /> },
      { path: ROUTES.LEGAL, element: <Legal /> },
      { path: ROUTES.PRIVACY, element: <Privacy /> },
      { path: ROUTES.TERMS, element: <Terms /> },
      { path: ROUTES.COOKIES, element: <Cookies /> },
      { path: ROUTES.NOT_FOUND, element: <NotFound /> },
    ],
  },
  { path: ROUTES.ADMIN_LOGIN, element: <AdminLogin /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'produits', element: <AdminProducts /> },
      { path: 'messages', element: <AdminMessages /> },
      { path: 'utilisateurs', element: <AdminUsers /> },
      { path: 'pages', element: <AdminPages /> },
      { path: 'marques',    element: <AdminBrands /> },
      { path: 'reseau',     element: <AdminNetworkCountries /> },
      { path: 'temoignages', element: <AdminTestimonials /> },
      { path: 'processus',  element: <AdminProcessSteps /> },
    ],
  },
])
